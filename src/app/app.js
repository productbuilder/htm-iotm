import { DEFAULT_CONFIG, ATTRIBUTE_MAP, STEP_DEFINITIONS } from "./config.js";
import { ApiClient } from "./js/api-client.js";
import { createTranslator } from "./js/i18n.js";
import { escapeHtml, formatFileSize, toBoolean, toNumber } from "./js/helpers.js";
import { validateStep } from "./js/validators.js";

const ACCEPT_BY_TYPE = {
	image: "image/*",
	video: "video/*",
	audio: "audio/*",
};

export class IotmParticipationWidget extends HTMLElement {
	static get observedAttributes() {
		return Object.keys(ATTRIBUTE_MAP);
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		this.state = {
			currentStep: 0,
			config: { ...DEFAULT_CONFIG },
			translations: {},
			apiStatus: "idle",
			apiError: "",
			globalError: "",
			stepErrors: {},
			loading: {
				upload: false,
				submit: false,
			},
			uploads: [],
			metadata: {
				title: "",
				description: "",
				metadata: "",
				timestamp: "",
			},
			consent: {
				rightsDeclaration: false,
				publicConsent: false,
			},
			contact: {
				name: "",
				email: "",
			},
			submissionStatus: "idle",
			submissionResponse: null,
			modalType: "",
		};

		this.api = new ApiClient("");
		const globalConfig = typeof window !== "undefined" ? window.IOTM_PARTICIPATION_WIDGET_CONFIG : null;
		if (globalConfig?.translations) {
			this.state.translations = globalConfig.translations;
		}
		this.translator = createTranslator({
			locale: this.state.config.locale,
			overrides: this.state.translations,
		});
		this.t = this.translator.t;

		this._boundOnChange = this.onChange.bind(this);
		this._boundOnClick = this.onClick.bind(this);
		this._boundOnSubmit = this.onSubmit.bind(this);
		this._boundOnDrop = this.onDrop.bind(this);
		this._boundOnDragOver = this.onDragOver.bind(this);
		this._boundOnKeydown = this.onKeydown.bind(this);
		this._boundOnModalClose = this.onModalClose.bind(this);
	}

	connectedCallback() {
		this.syncConfigFromAttributes();
		this.updateTranslator();
		this.render();
		this.shadowRoot.addEventListener("change", this._boundOnChange);
		this.shadowRoot.addEventListener("click", this._boundOnClick);
		this.shadowRoot.addEventListener("submit", this._boundOnSubmit);
		this.shadowRoot.addEventListener("drop", this._boundOnDrop);
		this.shadowRoot.addEventListener("dragover", this._boundOnDragOver);
		this.shadowRoot.addEventListener("keydown", this._boundOnKeydown);
		this.shadowRoot.addEventListener("widget-modal-close", this._boundOnModalClose);
		this.initializeApi();
	}

	disconnectedCallback() {
		this.shadowRoot.removeEventListener("change", this._boundOnChange);
		this.shadowRoot.removeEventListener("click", this._boundOnClick);
		this.shadowRoot.removeEventListener("submit", this._boundOnSubmit);
		this.shadowRoot.removeEventListener("drop", this._boundOnDrop);
		this.shadowRoot.removeEventListener("dragover", this._boundOnDragOver);
		this.shadowRoot.removeEventListener("keydown", this._boundOnKeydown);
		this.shadowRoot.removeEventListener("widget-modal-close", this._boundOnModalClose);
		for (const item of this.state.uploads) {
			if (item.previewUrl) {
				URL.revokeObjectURL(item.previewUrl);
			}
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue === newValue) return;
		const configKey = ATTRIBUTE_MAP[name];
		if (!configKey) return;
		this.state.config[configKey] = this.parseConfigValue(configKey, newValue);
		if (configKey === "apiBaseUrl") {
			this.api = new ApiClient(this.state.config.apiBaseUrl);
			this.initializeApi();
		}
		if (configKey === "locale") {
			this.updateTranslator();
		}
		this.render();
	}

	get apiBaseUrl() {
		return this.state.config.apiBaseUrl;
	}
	set apiBaseUrl(value) {
		this.setAttribute("api-base-url", value || "");
	}

	get projectId() {
		return this.state.config.projectId;
	}
	set projectId(value) {
		this.setAttribute("project-id", value || "");
	}

	get locale() {
		return this.state.config.locale;
	}
	set locale(value) {
		this.setAttribute("locale", value || "en");
	}

	get theme() {
		return this.state.config.theme;
	}
	set theme(value) {
		this.setAttribute("theme", value || "light");
	}

	get allowVideo() {
		return this.state.config.allowVideo;
	}
	set allowVideo(value) {
		this.setAttribute("allow-video", String(Boolean(value)));
	}

	get allowAudio() {
		return this.state.config.allowAudio;
	}
	set allowAudio(value) {
		this.setAttribute("allow-audio", String(Boolean(value)));
	}

	get allowImage() {
		return this.state.config.allowImage;
	}
	set allowImage(value) {
		this.setAttribute("allow-image", String(Boolean(value)));
	}

	get maxFileSize() {
		return this.state.config.maxFileSize;
	}
	set maxFileSize(value) {
		this.setAttribute("max-file-size", String(value));
	}

	get organizationName() {
		return this.state.config.organizationName;
	}
	set organizationName(value) {
		this.setAttribute("organization-name", value || "");
	}

	get headerTitle() {
		return this.state.config.headerTitle;
	}
	set headerTitle(value) {
		this.setAttribute("header-title", value || "");
	}

	get aboutTitle() {
		return this.state.config.aboutTitle;
	}
	set aboutTitle(value) {
		this.setAttribute("about-title", value || "");
	}

	get aboutSummary() {
		return this.state.config.aboutSummary;
	}
	set aboutSummary(value) {
		this.setAttribute("about-summary", value || "");
	}

	get aboutBody() {
		return this.state.config.aboutBody;
	}
	set aboutBody(value) {
		this.setAttribute("about-body", value || "");
	}

	get aboutContactNote() {
		return this.state.config.aboutContactNote;
	}
	set aboutContactNote(value) {
		this.setAttribute("about-contact-note", value || "");
	}

	get translations() {
		return this.state.translations;
	}
	set translations(value) {
		this.state.translations = value && typeof value === "object" ? value : {};
		this.updateTranslator();
		this.render();
	}

	updateTranslator() {
		this.translator = createTranslator({
			locale: this.state.config.locale,
			overrides: this.state.translations,
		});
		this.t = this.translator.t;
	}

	syncConfigFromAttributes() {
		const nextConfig = { ...DEFAULT_CONFIG };
		Object.entries(ATTRIBUTE_MAP).forEach(([attribute, configKey]) => {
			const value = this.getAttribute(attribute);
			nextConfig[configKey] = this.parseConfigValue(configKey, value);
		});
		this.state.config = nextConfig;
		this.api = new ApiClient(this.state.config.apiBaseUrl);
	}

	parseConfigValue(key, value) {
		switch (key) {
			case "allowVideo":
			case "allowAudio":
			case "allowImage":
				return toBoolean(value, DEFAULT_CONFIG[key]);
			case "maxFileSize":
				return toNumber(value, DEFAULT_CONFIG.maxFileSize);
			default:
				return value ?? DEFAULT_CONFIG[key];
		}
	}

	async initializeApi() {
		if (!this.api.isConfigured()) {
			this.state.apiStatus = "not-configured";
			this.state.apiError = "";
			this.render();
			return;
		}
		this.state.apiStatus = "checking";
		this.state.apiError = "";
		this.render();
		try {
			await this.api.health();
			this.state.apiStatus = "online";
			try {
				const remoteConfig = await this.api.getConfig();
				if (remoteConfig && typeof remoteConfig === "object") {
					this.state.config = { ...this.state.config, ...remoteConfig };
					this.updateTranslator();
				}
			} catch {
				// Remote config is optional in MVP.
			}
		} catch (error) {
			this.state.apiStatus = "offline";
			this.state.apiError = error?.code === "NETWORK_ERROR" ? this.t("status.networkError") : this.t("status.apiOffline");
		}
		this.render();
	}

	onDragOver(event) {
		const dropzone = event.target.closest?.("[data-dropzone='true']");
		if (!dropzone) return;
		event.preventDefault();
	}

	onDrop(event) {
		const dropzone = event.target.closest?.("[data-dropzone='true']");
		if (!dropzone) return;
		event.preventDefault();
		const files = Array.from(event.dataTransfer?.files || []);
		this.addFiles(files);
	}

	onChange(event) {
		const target = event.target;
		if (!(target instanceof HTMLElement)) return;
		if (target.matches("[data-file-input='true']")) {
			const files = Array.from(target.files || []);
			this.addFiles(files);
			target.value = "";
			return;
		}
		const field = target.getAttribute("data-field");
		if (!field) return;
		const checked = "checked" in target ? target.checked : undefined;
		const value = checked !== undefined && target.getAttribute("type") === "checkbox" ? checked : target.value;
		this.updateStateField(field, value);
	}

	onClick(event) {
		const target = event.target;
		if (!(target instanceof HTMLElement)) return;
		const action = target.getAttribute("data-action");
		if (!action) return;
		if (action === "next") return this.goToStep(this.state.currentStep + 1);
		if (action === "prev") return this.goToStep(this.state.currentStep - 1);
		if (action === "goto") {
			const step = Number(target.getAttribute("data-step"));
			if (Number.isFinite(step)) this.goToStep(step, true);
			return;
		}
		if (action === "open-modal") {
			this.state.modalType = "privacy";
			this.render();
			return;
		}
		if (action === "open-about") {
			this.state.modalType = "about";
			this.render();
			return;
		}
		if (action === "close-modal") {
			this.state.modalType = "";
			this.render();
			return;
		}
		if (action === "remove-upload") {
			const index = Number(target.getAttribute("data-index"));
			if (Number.isFinite(index)) {
				const removed = this.state.uploads.splice(index, 1);
				if (removed[0]?.previewUrl) URL.revokeObjectURL(removed[0].previewUrl);
				this.render();
			}
		}
	}

	onKeydown(event) {
		if (event.key === "Escape" && this.state.modalType) {
			this.state.modalType = "";
			this.render();
		}
	}

	onModalClose() {
		this.state.modalType = "";
		this.render();
	}

	onSubmit(event) {
		event.preventDefault();
		if (this.state.currentStep === STEP_DEFINITIONS.length - 1) this.submitAll();
	}

	updateStateField(field, value) {
		const [section, key] = field.split(".");
		if (!section || !key || !this.state[section]) return;
		this.state[section] = { ...this.state[section], [key]: value };
		this.state.stepErrors = { ...this.state.stepErrors, [key]: "" };
		this.render();
	}

	addFiles(files) {
		if (!files.length) return;
		this.state.globalError = "";
		const acceptedTypes = this.getAcceptedFileTypes();
		const maxSize = this.state.config.maxFileSize;
		const accepted = [];
		for (const file of files) {
			const mediaType = this.getMediaType(file.type);
			if (!acceptedTypes.includes(ACCEPT_BY_TYPE[mediaType])) {
				this.state.globalError = this.t("validation.invalidType");
				continue;
			}
			if (file.size > maxSize) {
				this.state.globalError = `${this.t("validation.fileSizeExceeded")} (${formatFileSize(maxSize)} ${this.t("upload.sizeMaxSuffix")})`;
				continue;
			}
			accepted.push({
				file,
				name: file.name,
				size: file.size,
				type: file.type,
				mediaType,
				previewUrl: mediaType === "image" ? URL.createObjectURL(file) : "",
				uploadRef: "",
			});
		}
		this.state.uploads = [...this.state.uploads, ...accepted];
		this.state.stepErrors = { ...this.state.stepErrors, uploads: "" };
		this.render();
	}

	getMediaType(mimeType) {
		if (String(mimeType).startsWith("image/")) return "image";
		if (String(mimeType).startsWith("video/")) return "video";
		if (String(mimeType).startsWith("audio/")) return "audio";
		return "unknown";
	}

	getLocalizedMediaType(mediaType) {
		return this.t(`upload.mediaType.${mediaType}`);
	}

	getAcceptedFileTypes() {
		const accepted = [];
		if (this.state.config.allowImage) accepted.push(ACCEPT_BY_TYPE.image);
		if (this.state.config.allowVideo) accepted.push(ACCEPT_BY_TYPE.video);
		if (this.state.config.allowAudio) accepted.push(ACCEPT_BY_TYPE.audio);
		return accepted;
	}

	goToStep(nextStep, skipValidation = false) {
		const bounded = Math.max(0, Math.min(STEP_DEFINITIONS.length - 1, nextStep));
		if (!skipValidation) {
			const errors = validateStep(this.state, this.state.currentStep, this.t);
			this.state.stepErrors = errors;
			if (Object.keys(errors).length > 0) {
				this.render();
				return;
			}
		}
		this.state.globalError = "";
		this.state.currentStep = bounded;
		this.render();
		this.focusMainHeading();
	}

	async submitAll() {
		const errors = this.validateAllSteps();
		this.state.stepErrors = errors;
		if (Object.keys(errors).length > 0) {
			if (errors.uploads) this.state.currentStep = 1;
			else if (errors.metadata) this.state.currentStep = 2;
			else if (errors.rightsDeclaration || errors.publicConsent) this.state.currentStep = 3;
			else if (errors.name || errors.email) this.state.currentStep = 4;
			this.render();
			this.focusMainHeading();
			return;
		}

		this.state.loading.submit = true;
		this.state.globalError = "";
		this.render();

		try {
			const uploads = await this.uploadAllFiles();
			const payload = {
				projectId: this.state.config.projectId || undefined,
				uploads,
				mediaType: [...new Set(this.state.uploads.map((x) => x.mediaType))],
				title: this.state.metadata.title,
				description: this.state.metadata.description,
				metadata: this.state.metadata.metadata,
				contributorName: this.state.contact.name,
				email: this.state.contact.email,
				rightsDeclaration: this.state.consent.rightsDeclaration,
				publicConsent: this.state.consent.publicConsent,
				timestamp: this.state.metadata.timestamp || new Date().toISOString(),
			};

			let responseData = {
				id: `local-${Date.now()}`,
				mode: "local-fallback",
			};
			if (this.api.isConfigured() && this.state.apiStatus === "online") {
				responseData = await this.api.submitSubmission(payload);
			}

			this.state.submissionStatus = "success";
			this.state.submissionResponse = responseData;
			this.state.currentStep = STEP_DEFINITIONS.length;
		} catch (error) {
			this.state.submissionStatus = "error";
			this.state.globalError = error?.code === "NETWORK_ERROR" ? this.t("status.networkError") : this.t("status.submissionError");
		} finally {
			this.state.loading.submit = false;
			this.render();
			this.focusMainHeading();
		}
	}

	validateAllSteps() {
		const allErrors = {};
		for (const stepIndex of [1, 2, 3, 4]) {
			Object.assign(allErrors, validateStep(this.state, stepIndex, this.t));
		}
		return allErrors;
	}

	async uploadAllFiles() {
		if (!this.state.uploads.length) return [];
		if (!this.api.isConfigured() || this.state.apiStatus !== "online") {
			return this.state.uploads.map((item, index) => ({
				localRef: `local-upload-${index + 1}`,
				name: item.name,
				mediaType: item.mediaType,
			}));
		}

		this.state.loading.upload = true;
		this.render();
		try {
			const results = [];
			for (const item of this.state.uploads) {
				const result = await this.api.uploadFile(item.file, {
					projectId: this.state.config.projectId,
					mediaType: item.mediaType,
				});
				results.push(result);
			}
			return results;
		} finally {
			this.state.loading.upload = false;
			this.render();
		}
	}

	focusMainHeading() {
		requestAnimationFrame(() => {
			const heading = this.shadowRoot.querySelector("[data-main-heading='true']");
			if (heading instanceof HTMLElement) heading.focus();
		});
	}

	renderApiStatus() {
		if (this.state.apiStatus === "checking") {
			return `<p class="status info" role="status">${escapeHtml(this.t("status.checkingApi"))}</p>`;
		}
		if (this.state.apiStatus === "online") {
			return `<p class="status success" role="status">${escapeHtml(this.t("status.apiOnline"))}</p>`;
		}
		if (this.state.apiStatus === "offline") {
			return `<p class="status warning" role="status">${escapeHtml(this.t("status.apiOffline"))}</p>`;
		}
		return `<p class="status info" role="status">${escapeHtml(this.t("status.localMode"))}</p>`;
	}

	renderCurrentStep() {
		const step = this.state.currentStep;
		if (step === 0) return this.renderStepIntroduction();
		if (step === 1) return this.renderStepUpload();
		if (step === 2) return this.renderStepMetadata();
		if (step === 3) return this.renderStepConsent();
		if (step === 4) return this.renderStepContact();
		if (step === 5) return this.renderStepReview();
		return this.renderStepSuccess();
	}

	renderStepIntroduction() {
		return `
			<section part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("intro.title"))}</h2>
				<p>${escapeHtml(this.t("intro.descriptionOne"))}</p>
				<p>${escapeHtml(this.t("intro.descriptionTwo"))}</p>
				${this.renderApiStatus()}
				<div class="actions">
					<button part="button" data-action="next" type="button">${escapeHtml(this.t("buttons.start"))}</button>
				</div>
			</section>
		`;
	}

	renderStepUpload() {
		const accepted = this.getAcceptedFileTypes().join(",");
		const error = this.state.stepErrors.uploads || this.state.globalError;
		return `
			<section part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("upload.title"))}</h2>
				<p>${escapeHtml(this.t("upload.instruction", { maxSize: formatFileSize(this.state.config.maxFileSize) }))}</p>
				<label for="file-input">${escapeHtml(this.t("upload.chooseFiles"))}</label>
				<input part="input" id="file-input" type="file" multiple accept="${accepted}" data-file-input="true" />
				<div class="dropzone" part="upload-dropzone" data-dropzone="true" tabindex="0" role="button" aria-label="${escapeHtml(this.t("upload.dropzoneLabel"))}">
					${escapeHtml(this.t("upload.dropzone"))}
				</div>
				${error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : ""}
				${this.renderUploadList()}
				<div class="actions">
					<button part="button" data-action="prev" type="button">${escapeHtml(this.t("buttons.back"))}</button>
					<button part="button" data-action="next" type="button">${escapeHtml(this.t("buttons.continue"))}</button>
				</div>
			</section>
		`;
	}

	renderUploadList() {
		if (!this.state.uploads.length) {
			return `<p>${escapeHtml(this.t("upload.empty"))}</p>`;
		}
		return `
			<ul class="upload-list">
				${this.state.uploads
					.map(
						(item, index) => `
						<li>
							<div>
								<strong>${escapeHtml(item.name)}</strong>
								<small>${escapeHtml(this.getLocalizedMediaType(item.mediaType))} - ${formatFileSize(item.size)}</small>
							</div>
							${item.previewUrl ? `<img src="${item.previewUrl}" alt="${escapeHtml(this.t("upload.previewAlt", { name: item.name }))}" />` : ""}
							<button part="button" data-action="remove-upload" data-index="${index}" type="button">${escapeHtml(this.t("buttons.remove"))}</button>
						</li>
					`,
					)
					.join("")}
			</ul>
		`;
	}

	renderStepMetadata() {
		const error = this.state.stepErrors.metadata;
		return `
			<section part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("metadata.title"))}</h2>
				<p>${escapeHtml(this.t("metadata.instruction"))}</p>
				<label for="meta-title">${escapeHtml(this.t("metadata.titleLabel"))}</label>
				<input part="input" id="meta-title" data-field="metadata.title" value="${escapeHtml(this.state.metadata.title)}" />
				<label for="meta-description">${escapeHtml(this.t("metadata.descriptionLabel"))}</label>
				<textarea part="input" id="meta-description" data-field="metadata.description">${escapeHtml(this.state.metadata.description)}</textarea>
				<label for="meta-extra">${escapeHtml(this.t("metadata.extraLabel"))}</label>
				<textarea part="input" id="meta-extra" data-field="metadata.metadata">${escapeHtml(this.state.metadata.metadata)}</textarea>
				<label for="meta-time">${escapeHtml(this.t("metadata.timestampLabel"))}</label>
				<input part="input" id="meta-time" type="datetime-local" data-field="metadata.timestamp" value="${escapeHtml(this.state.metadata.timestamp)}" />
				${error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : ""}
				<div class="actions">
					<button part="button" data-action="prev" type="button">${escapeHtml(this.t("buttons.back"))}</button>
					<button part="button" data-action="next" type="button">${escapeHtml(this.t("buttons.continue"))}</button>
				</div>
			</section>
		`;
	}

	renderStepConsent() {
		return `
			<section part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("consent.title"))}</h2>
				<p>${escapeHtml(this.t("consent.instruction"))}</p>
				<div class="check-row">
					<input part="input" id="rightsDeclaration" type="checkbox" data-field="consent.rightsDeclaration" ${this.state.consent.rightsDeclaration ? "checked" : ""} />
					<label for="rightsDeclaration">${escapeHtml(this.t("consent.rightsLabel"))}</label>
				</div>
				${this.state.stepErrors.rightsDeclaration ? `<p class="error" role="alert">${escapeHtml(this.state.stepErrors.rightsDeclaration)}</p>` : ""}
				<div class="check-row">
					<input part="input" id="publicConsent" type="checkbox" data-field="consent.publicConsent" ${this.state.consent.publicConsent ? "checked" : ""} />
					<label for="publicConsent">${escapeHtml(this.t("consent.publicLabel"))}</label>
				</div>
				${this.state.stepErrors.publicConsent ? `<p class="error" role="alert">${escapeHtml(this.state.stepErrors.publicConsent)}</p>` : ""}
				<p><button part="button" type="button" data-action="open-modal">${escapeHtml(this.t("buttons.readPrivacy"))}</button></p>
				<div class="actions">
					<button part="button" data-action="prev" type="button">${escapeHtml(this.t("buttons.back"))}</button>
					<button part="button" data-action="next" type="button">${escapeHtml(this.t("buttons.continue"))}</button>
				</div>
			</section>
		`;
	}

	renderStepContact() {
		return `
			<section part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("contact.title"))}</h2>
				<p>${escapeHtml(this.t("contact.instruction"))}</p>
				<label for="contact-name">${escapeHtml(this.t("contact.nameLabel"))}</label>
				<input part="input" id="contact-name" data-field="contact.name" value="${escapeHtml(this.state.contact.name)}" />
				${this.state.stepErrors.name ? `<p class="error" role="alert">${escapeHtml(this.state.stepErrors.name)}</p>` : ""}
				<label for="contact-email">${escapeHtml(this.t("contact.emailLabel"))}</label>
				<input part="input" id="contact-email" type="email" data-field="contact.email" value="${escapeHtml(this.state.contact.email)}" />
				${this.state.stepErrors.email ? `<p class="error" role="alert">${escapeHtml(this.state.stepErrors.email)}</p>` : ""}
				<div class="actions">
					<button part="button" data-action="prev" type="button">${escapeHtml(this.t("buttons.back"))}</button>
					<button part="button" data-action="next" type="button">${escapeHtml(this.t("buttons.continue"))}</button>
				</div>
			</section>
		`;
	}

	renderStepReview() {
		const summaryUploads = this.state.uploads
			.map((item) => `<li>${escapeHtml(item.name)} (${escapeHtml(this.getLocalizedMediaType(item.mediaType))})</li>`)
			.join("");
		return `
			<form part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("review.title"))}</h2>
				<p>${escapeHtml(this.t("review.intro"))}</p>
				<h3>${escapeHtml(this.t("review.mediaFiles"))}</h3>
				<ul>${summaryUploads || `<li>${escapeHtml(this.t("upload.empty"))}</li>`}</ul>
				<h3>${escapeHtml(this.t("review.description"))}</h3>
				<p><strong>${escapeHtml(this.t("review.titleLabel"))}</strong> ${escapeHtml(this.state.metadata.title || this.t("common.none"))}</p>
				<p><strong>${escapeHtml(this.t("review.descriptionLabel"))}</strong> ${escapeHtml(this.state.metadata.description || this.t("common.none"))}</p>
				<p><strong>${escapeHtml(this.t("review.metadataLabel"))}</strong> ${escapeHtml(this.state.metadata.metadata || this.t("common.none"))}</p>
				<h3>${escapeHtml(this.t("review.rights"))}</h3>
				<p>${escapeHtml(this.t("review.rightsDeclarationLabel"))} ${this.state.consent.rightsDeclaration ? escapeHtml(this.t("common.yes")) : escapeHtml(this.t("common.no"))}</p>
				<p>${escapeHtml(this.t("review.publicConsentLabel"))} ${this.state.consent.publicConsent ? escapeHtml(this.t("common.yes")) : escapeHtml(this.t("common.no"))}</p>
				<h3>${escapeHtml(this.t("review.contact"))}</h3>
				<p><strong>${escapeHtml(this.t("review.nameLabel"))}</strong> ${escapeHtml(this.state.contact.name || this.t("common.none"))}</p>
				<p><strong>${escapeHtml(this.t("review.emailLabel"))}</strong> ${escapeHtml(this.state.contact.email || this.t("common.none"))}</p>
				${this.state.globalError ? `<p class="error" role="alert">${escapeHtml(this.state.globalError)}</p>` : ""}
				<div class="actions">
					<button part="button" data-action="prev" type="button">${escapeHtml(this.t("buttons.back"))}</button>
					<button part="button" type="submit" ${this.state.loading.submit ? "disabled" : ""}>
						${escapeHtml(this.state.loading.submit ? this.t("buttons.submitting") : this.t("buttons.submit"))}
					</button>
				</div>
			</form>
		`;
	}

	renderStepSuccess() {
		return `
			<section part="content">
				<h2 data-main-heading="true" tabindex="-1">${escapeHtml(this.t("success.title"))}</h2>
				<p>${escapeHtml(this.t("success.message"))}</p>
				<p>
					${escapeHtml(this.t("success.reference"))}
					<code>${escapeHtml(this.state.submissionResponse?.id || this.state.submissionResponse?.submissionId || this.t("common.notAvailable"))}</code>
				</p>
			</section>
		`;
	}

	renderModal() {
		if (!this.state.modalType) return "";
		const modalTitle = this.state.modalType === "about" ? this.getAboutContent().title : this.t("modal.title");
		const modalBody =
			this.state.modalType === "about"
				? this.renderAboutModalBody()
				: `<p>${escapeHtml(this.t("modal.body"))}</p>`;
		return `
			<widget-modal
				open
				title="${escapeHtml(modalTitle)}"
				close-label="${escapeHtml(this.t("buttons.close"))}"
				close-aria-label="${escapeHtml(this.t("modal.closeAriaLabel"))}"
				exportparts="modal,modal-backdrop"
			>
				${modalBody}
			</widget-modal>
		`;
	}

	getAboutContent() {
		const organization = this.state.config.organizationName || this.t("common.notAvailable");
		return {
			title: this.state.config.aboutTitle || this.t("about.title"),
			summary: this.state.config.aboutSummary || this.t("about.summary", { organization }),
			body: this.state.config.aboutBody || this.t("about.body"),
			contactNote: this.state.config.aboutContactNote || this.t("about.contactNote"),
		};
	}

	renderAboutModalBody() {
		const about = this.getAboutContent();
		return `
			<p>${escapeHtml(about.summary)}</p>
			<p>${escapeHtml(about.body)}</p>
			<p>${escapeHtml(about.contactNote)}</p>
		`;
	}

	render() {
		const currentStep = this.state.currentStep;
		const steps = STEP_DEFINITIONS.map((step) => {
			const status = currentStep > step.id ? "done" : currentStep === step.id ? "active" : "todo";
			return `<button
				type="button"
				part="button"
				data-action="goto"
				data-step="${step.id}"
				class="step ${status}"
				aria-current="${status === "active" ? "step" : "false"}"
			>${step.id + 1}. ${escapeHtml(this.t(`steps.${step.key}`))}</button>`;
		}).join("");

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					--iotm-color-bg: #f7f7f8;
					--iotm-color-surface: #ffffff;
					--iotm-color-text: #111827;
					--iotm-color-muted: #4b5563;
					--iotm-color-primary: #0f766e;
					--iotm-color-danger: #b91c1c;
					--iotm-spacing: 1rem;
					--iotm-font: "Segoe UI", Tahoma, sans-serif;
					--iotm-radius: 10px;
					--iotm-border: 1px solid #d4d4d8;
					--iotm-border-color: #d4d4d8;
					display: block;
					color: var(--iotm-color-text);
					font-family: var(--iotm-font);
				}
				* {
					box-sizing: border-box;
				}
				.shell {
					background: var(--iotm-color-bg);
					border: var(--iotm-border);
					border-radius: var(--iotm-radius);
					display: grid;
					grid-template-columns: 260px minmax(0, 1fr);
					grid-template-rows: auto 1fr;
					min-height: 640px;
				}
				.header {
					grid-column: 1 / -1;
					padding: var(--iotm-spacing);
					background: var(--iotm-color-surface);
					border-bottom: var(--iotm-border);
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
				}
				.header-actions {
					display: flex;
					align-items: center;
					gap: 0.6rem;
				}
				.sidebar {
					padding: var(--iotm-spacing);
					border-right: var(--iotm-border);
					background: var(--iotm-color-surface);
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}
				.viewport {
					padding: var(--iotm-spacing);
					background: var(--iotm-color-bg);
					overflow: auto;
				}
				.content {
					background: var(--iotm-color-surface);
					border: var(--iotm-border);
					border-radius: var(--iotm-radius);
					padding: var(--iotm-spacing);
				}
				.actions {
					margin-top: 1rem;
					display: flex;
					gap: 0.75rem;
				}
				label {
					display: block;
					margin: 0.75rem 0 0.3rem;
					font-weight: 600;
				}
				input, textarea {
					width: 100%;
					padding: 0.6rem 0.65rem;
					border-radius: 8px;
					border: var(--iotm-border);
					font: inherit;
				}
				textarea {
					min-height: 92px;
					resize: vertical;
				}
				button {
					border-radius: 8px;
					border: var(--iotm-border);
					background: #fff;
					padding: 0.5rem 0.8rem;
					font: inherit;
					cursor: pointer;
				}
				button:hover {
					background: #f2f2f3;
				}
				button:focus-visible,
				input:focus-visible,
				textarea:focus-visible {
					outline: 2px solid var(--iotm-color-primary);
					outline-offset: 2px;
				}
				.step {
					text-align: left;
					background: #fff;
				}
				.step.active {
					border-color: var(--iotm-color-primary);
					background: #e6fffb;
				}
				.step.done {
					opacity: 0.8;
				}
				.dropzone {
					margin-top: 0.75rem;
					padding: 1.2rem;
					border: 2px dashed #94a3b8;
					border-radius: 8px;
					background: #f8fafc;
				}
				.upload-list {
					display: grid;
					gap: 0.75rem;
					padding: 0;
					list-style: none;
					margin: 1rem 0 0;
				}
				.upload-list li {
					border: var(--iotm-border);
					border-radius: 8px;
					padding: 0.75rem;
					display: grid;
					grid-template-columns: 1fr auto auto;
					gap: 0.75rem;
					align-items: center;
				}
				.upload-list img {
					width: 72px;
					height: 72px;
					object-fit: cover;
					border-radius: 6px;
				}
				.check-row {
					display: grid;
					grid-template-columns: auto 1fr;
					align-items: start;
					gap: 0.55rem;
					margin-top: 0.75rem;
				}
				.check-row input {
					width: auto;
					margin-top: 0.2rem;
				}
				.error {
					color: var(--iotm-color-danger);
					font-weight: 600;
				}
				.status {
					border-radius: 8px;
					padding: 0.6rem 0.8rem;
				}
				.status.info {
					background: #eef2ff;
				}
				.status.success {
					background: #ecfdf5;
				}
				.status.warning {
					background: #fff7ed;
				}
				@media (max-width: 820px) {
					.shell {
						grid-template-columns: 1fr;
						grid-template-rows: auto auto 1fr;
					}
					.sidebar {
						border-right: 0;
						border-bottom: var(--iotm-border);
						display: grid;
						grid-template-columns: repeat(3, minmax(0, 1fr));
						gap: 0.4rem;
					}
					.step {
						font-size: 0.9rem;
					}
				}
			</style>
			<div class="shell" part="shell" data-theme="${escapeHtml(this.state.config.theme)}" lang="${escapeHtml(this.translator.language)}">
				<header class="header" part="header">
					<div>
						<strong>${escapeHtml(this.state.config.headerTitle)}</strong>
						<div>${escapeHtml(this.state.config.organizationName)}</div>
					</div>
					<div class="header-actions">
						<button
							part="button"
							type="button"
							data-action="open-about"
							aria-label="${escapeHtml(this.t("aria.aboutButton"))}"
						>${escapeHtml(this.t("buttons.about"))}</button>
						<div>${Math.min(currentStep + 1, STEP_DEFINITIONS.length)} / ${STEP_DEFINITIONS.length}</div>
					</div>
				</header>
				<nav class="sidebar" part="sidebar" aria-label="${escapeHtml(this.t("aria.submissionSteps"))}">
					${steps}
				</nav>
				<main class="viewport" part="viewport">
					${this.state.loading.upload ? `<p class="status info" role="status">${escapeHtml(this.t("status.uploading"))}</p>` : ""}
					<div class="content" part="content">
						${this.renderCurrentStep()}
					</div>
				</main>
				${this.renderModal()}
			</div>
		`;
	}
}
