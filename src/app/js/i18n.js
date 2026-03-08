export const defaultMessages = {
	steps: {
		introduction: { en: "Introduction", nl: "Introductie" },
		upload: { en: "Upload media", nl: "Media uploaden" },
		metadata: { en: "Description and metadata", nl: "Beschrijving en metadata" },
		consent: { en: "Rights and consent", nl: "Rechten en toestemming" },
		contact: { en: "Contact details", nl: "Contactgegevens" },
		review: { en: "Review and confirmation", nl: "Controleren en bevestigen" },
	},
	buttons: {
		start: { en: "Start", nl: "Start" },
		back: { en: "Back", nl: "Terug" },
		continue: { en: "Continue", nl: "Verder" },
		submit: { en: "Submit submission", nl: "Inzending versturen" },
		submitting: { en: "Submitting...", nl: "Versturen..." },
		close: { en: "Close", nl: "Sluiten" },
		remove: { en: "Remove", nl: "Verwijderen" },
		readPrivacy: { en: "Read privacy details", nl: "Lees privacyinformatie" },
		about: { en: "About", nl: "Info" },
	},
	common: {
		yes: { en: "Yes", nl: "Ja" },
		no: { en: "No", nl: "Nee" },
		none: { en: "(none)", nl: "(geen)" },
		notAvailable: { en: "n/a", nl: "n.v.t." },
	},
	status: {
		checkingApi: { en: "Checking API availability...", nl: "API-beschikbaarheid controleren..." },
		apiOnline: { en: "API connection is available.", nl: "API-verbinding is beschikbaar." },
		apiOffline: {
			en: "API is currently unavailable. You can continue and try again later.",
			nl: "API is momenteel niet beschikbaar. Je kunt doorgaan en later opnieuw proberen.",
		},
		localMode: {
			en: "Running in local mode. Set api-base-url to connect backend endpoints.",
			nl: "Draait in lokale modus. Stel api-base-url in om backend-eindpunten te verbinden.",
		},
		uploading: { en: "Uploading files...", nl: "Bestanden uploaden..." },
		networkError: { en: "Network error. Please check your connection and try again.", nl: "Netwerkfout. Controleer je verbinding en probeer opnieuw." },
		submissionError: { en: "Unable to submit right now. Please try again.", nl: "Versturen is nu niet mogelijk. Probeer het opnieuw." },
	},
	intro: {
		title: { en: "Introduction", nl: "Introductie" },
		descriptionOne: {
			en: "Use this widget to share photos, videos, or audio related to local history and heritage.",
			nl: "Gebruik deze widget om foto's, video's of audio te delen over lokale geschiedenis en erfgoed.",
		},
		descriptionTwo: {
			en: "You will add media, a short description, rights confirmation, and contact details. This takes a few minutes.",
			nl: "Je voegt media, een korte beschrijving, rechtenbevestiging en contactgegevens toe. Dit duurt een paar minuten.",
		},
	},
	upload: {
		title: { en: "Upload media", nl: "Media uploaden" },
		instruction: { en: "Add at least one media file. Maximum file size: {maxSize}.", nl: "Voeg minimaal een mediabestand toe. Maximale bestandsgrootte: {maxSize}." },
		chooseFiles: { en: "Choose files", nl: "Bestanden kiezen" },
		dropzone: { en: "Drag and drop files here", nl: "Sleep bestanden hier naartoe" },
		dropzoneLabel: { en: "Upload files by dragging and dropping", nl: "Upload bestanden door ze hierheen te slepen" },
		empty: { en: "No files selected yet.", nl: "Nog geen bestanden geselecteerd." },
		previewAlt: { en: "Preview of {name}", nl: "Voorbeeld van {name}" },
		sizeMaxSuffix: { en: "max per file", nl: "max per bestand" },
		mediaType: {
			image: { en: "image", nl: "afbeelding" },
			video: { en: "video", nl: "video" },
			audio: { en: "audio", nl: "audio" },
			unknown: { en: "unknown", nl: "onbekend" },
		},
	},
	metadata: {
		title: { en: "Description and metadata", nl: "Beschrijving en metadata" },
		instruction: { en: "Provide a title or description. Add optional metadata and timestamp.", nl: "Geef een titel of beschrijving. Voeg optionele metadata en een tijdstip toe." },
		titleLabel: { en: "Title", nl: "Titel" },
		descriptionLabel: { en: "Description", nl: "Beschrijving" },
		extraLabel: { en: "Metadata (keywords, location, date notes)", nl: "Metadata (trefwoorden, locatie, datumopmerkingen)" },
		timestampLabel: { en: "Timestamp", nl: "Tijdstip" },
	},
	consent: {
		title: { en: "Rights and consent", nl: "Rechten en toestemming" },
		instruction: {
			en: "By submitting, you confirm that you own the rights to this material or have permission to share it.",
			nl: "Door te versturen bevestig je dat je de rechten op dit materiaal hebt, of toestemming hebt om het te delen.",
		},
		rightsLabel: {
			en: "I confirm that I own the rights or have permission to upload this material.",
			nl: "Ik bevestig dat ik de rechten heb, of toestemming, om dit materiaal te uploaden.",
		},
		publicLabel: {
			en: "I consent to public use of this submission for heritage storytelling.",
			nl: "Ik geef toestemming voor openbaar gebruik van deze inzending voor erfgoedverhalen.",
		},
	},
	contact: {
		title: { en: "Contact details", nl: "Contactgegevens" },
		instruction: {
			en: "We use contact details only to follow up on your submission when needed.",
			nl: "We gebruiken contactgegevens alleen om je inzending op te volgen wanneer dat nodig is.",
		},
		nameLabel: { en: "Contributor name", nl: "Naam van de bijdrager" },
		emailLabel: { en: "Email", nl: "E-mail" },
	},
	review: {
		title: { en: "Review and confirmation", nl: "Controleren en bevestigen" },
		intro: { en: "Review your submission before you send it.", nl: "Controleer je inzending voordat je deze verstuurt." },
		mediaFiles: { en: "Media files", nl: "Mediabestanden" },
		description: { en: "Description", nl: "Beschrijving" },
		metadata: { en: "Metadata", nl: "Metadata" },
		rights: { en: "Rights and consent", nl: "Rechten en toestemming" },
		contact: { en: "Contact details", nl: "Contactgegevens" },
		titleLabel: { en: "Title:", nl: "Titel:" },
		descriptionLabel: { en: "Description:", nl: "Beschrijving:" },
		metadataLabel: { en: "Metadata:", nl: "Metadata:" },
		rightsDeclarationLabel: { en: "Rights declaration:", nl: "Rechtenverklaring:" },
		publicConsentLabel: { en: "Public use consent:", nl: "Toestemming voor openbaar gebruik:" },
		nameLabel: { en: "Name:", nl: "Naam:" },
		emailLabel: { en: "Email:", nl: "E-mail:" },
	},
	success: {
		title: { en: "Submission completed", nl: "Inzending voltooid" },
		message: { en: "Thank you. Your submission was sent successfully.", nl: "Bedankt. Je inzending is succesvol verstuurd." },
		reference: { en: "Reference:", nl: "Referentie:" },
	},
	modal: {
		title: { en: "Privacy and contact details", nl: "Privacy en contactgegevens" },
		closeAriaLabel: { en: "Close dialog", nl: "Dialoog sluiten" },
		body: {
			en: "We ask for your contact details so we can verify information, request context, or clarify rights when needed. We use your details only to handle submissions.",
			nl: "We vragen om je contactgegevens zodat we informatie kunnen verifieren, context kunnen opvragen, of rechten kunnen verduidelijken wanneer dat nodig is. We gebruiken je gegevens alleen voor de afhandeling van inzendingen.",
		},
	},
	about: {
		title: { en: "About Timemap Contributor", nl: "Over Timemap Contributor" },
		summary: {
			en: "This widget helps {organization} collect local heritage stories and media from the community.",
			nl: "Deze widget helpt {organization} om lokale erfgoedverhalen en media uit de gemeenschap te verzamelen.",
		},
		body: {
			en: "You can submit photos, videos, audio, and context details. After submission, the project team can review your contribution and follow up when needed.",
			nl: "Je kunt foto's, video's, audio en contextinformatie insturen. Na inzending kan het projectteam je bijdrage beoordelen en indien nodig contact opnemen.",
		},
		contactNote: {
			en: "Contact details are requested so we can verify information, confirm rights, and provide updates about your submission.",
			nl: "Contactgegevens worden gevraagd zodat we informatie kunnen verifiëren, rechten kunnen bevestigen en updates over je inzending kunnen geven.",
		},
	},
	aria: {
		submissionSteps: { en: "Submission steps", nl: "Stappen van de inzending" },
		aboutButton: { en: "Open about information", nl: "Open informatie over deze widget" },
	},
	validation: {
		fileRequired: { en: "Please add at least one file.", nl: "Voeg minimaal een bestand toe." },
		invalidEmail: { en: "Please provide a valid email address.", nl: "Vul een geldig e-mailadres in." },
		metadataRequired: { en: "Please provide at least a title or description.", nl: "Geef minimaal een titel of beschrijving op." },
		rightsRequired: { en: "Please confirm that you own the rights or have permission.", nl: "Bevestig dat je de rechten hebt, of toestemming hebt." },
		publicConsentRequired: { en: "Please consent to public use for this submission.", nl: "Geef toestemming voor openbaar gebruik van deze inzending." },
		nameRequired: { en: "Contributor name is required.", nl: "Naam van de bijdrager is verplicht." },
		invalidType: { en: "This file type is not allowed.", nl: "Dit bestandstype is niet toegestaan." },
		fileSizeExceeded: { en: "One or more files exceed the maximum file size.", nl: "Een of meer bestanden zijn groter dan de maximale bestandsgrootte." },
	},
};

function isObject(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isLocalizedLeaf(value) {
	return isObject(value) && ("en" in value || "nl" in value);
}

function mergeMessages(base, override) {
	if (!isObject(override)) return base;
	const result = { ...base };
	for (const [key, overrideValue] of Object.entries(override)) {
		const baseValue = result[key];
		if (isLocalizedLeaf(overrideValue)) {
			result[key] = { ...(isObject(baseValue) ? baseValue : {}), ...overrideValue };
			continue;
		}
		if (isObject(overrideValue) && isObject(baseValue)) {
			result[key] = mergeMessages(baseValue, overrideValue);
			continue;
		}
		result[key] = overrideValue;
	}
	return result;
}

function getNestedValue(source, key) {
	return key.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), source);
}

function interpolate(template, params = {}) {
	return String(template).replace(/\{(\w+)\}/g, (_, token) => {
		return params[token] !== undefined ? String(params[token]) : `{${token}}`;
	});
}

export function resolveLanguageFromLocale(locale) {
	const normalized = String(locale || "en").toLowerCase();
	if (normalized.startsWith("nl")) return "nl";
	if (normalized.startsWith("en")) return "en";
	return "en";
}

function resolveMessageValue(messageEntry, language) {
	if (isLocalizedLeaf(messageEntry)) {
		return messageEntry[language] ?? messageEntry.en;
	}
	return messageEntry;
}

export function createTranslator({ locale, overrides } = {}) {
	const language = resolveLanguageFromLocale(locale);
	const mergedMessages = mergeMessages(defaultMessages, overrides || {});
	return {
		language,
		messages: mergedMessages,
		t(key, params = {}) {
			const entry = getNestedValue(mergedMessages, key);
			const value = resolveMessageValue(entry, language);
			if (value === undefined) {
				return key;
			}
			return interpolate(value, params);
		},
	};
}
