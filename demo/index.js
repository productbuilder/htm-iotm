import { customTranslations } from "./i18n.js";

await import("../src/app/index.js");

const consumerCopy = {
	en: {
		helperText:
			"Host page controls the dialog container. Timemap Contributor stays embeddable and handles only its own internal flow.",
		sectionTitle: "Consumer-controlled dialog embedding",
		localeLabel: "Consumer locale",
		openDialog: "Open Timemap Contributor",
		closeDialog: "Close dialog",
		dialogTitle: "Timemap Contributor",
	},
	nl: {
		helperText:
			"De hostpagina beheert de dialoogcontainer. Timemap Contributor blijft insluitbaar en beheert alleen zijn eigen interne flow.",
		sectionTitle: "Insluiting in een consumentgestuurde dialoog",
		localeLabel: "Consument-locale",
		openDialog: "Open Timemap Contributor",
		closeDialog: "Dialoog sluiten",
		dialogTitle: "Dialoog met Timemap Contributor",
	},
};

const localeSelect = document.querySelector("#consumer-locale");
const openButton = document.querySelector("#open-widget-dialog");
const closeButton = document.querySelector("#close-widget-dialog");
const dialog = document.querySelector("#consumer-widget-dialog");
const dialogWidget = document.querySelector("#dialog-widget");

function getConsumerLocale() {
	return localeSelect?.value === "nl" ? "nl" : "en";
}

function applyConsumerCopy() {
	const locale = getConsumerLocale();
	const copy = consumerCopy[locale];
	const localeSuffix = locale === "nl" ? "nl-NL" : "en-US";

	const helper = document.querySelector("#consumer-helper-text");
	const heading = document.querySelector("#consumer-dialog-heading");
	const localeLabel = document.querySelector("#consumer-locale-label");
	const dialogTitle = document.querySelector("#consumer-dialog-title");

	if (helper) helper.textContent = copy.helperText;
	if (heading) heading.textContent = copy.sectionTitle;
	if (localeLabel) localeLabel.textContent = copy.localeLabel;
	if (openButton) openButton.textContent = copy.openDialog;
	if (closeButton) closeButton.textContent = copy.closeDialog;
	if (dialogTitle) dialogTitle.textContent = copy.dialogTitle;

	if (dialogWidget) {
		dialogWidget.locale = localeSuffix;
		dialogWidget.translations = customTranslations;
	}
}

function openDialog() {
	if (dialog && typeof dialog.showModal === "function") {
		dialog.showModal();
	}
}

function closeDialog() {
	dialog?.close();
}

openButton?.addEventListener("click", openDialog);
closeButton?.addEventListener("click", closeDialog);
localeSelect?.addEventListener("change", applyConsumerCopy);

dialog?.addEventListener("click", (event) => {
	const rect = dialog.getBoundingClientRect();
	const isOutside =
		event.clientX < rect.left ||
		event.clientX > rect.right ||
		event.clientY < rect.top ||
		event.clientY > rect.bottom;
	if (isOutside) {
		closeDialog();
	}
});

applyConsumerCopy();
