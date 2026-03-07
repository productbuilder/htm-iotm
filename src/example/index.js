import { customTranslations } from "./i18n.js";

await import("../app/index.js");

const consumerCopy = {
	en: {
		helperText:
			"This consumer page owns the outer dialog. The widget remains a normal embeddable component and still manages only its own internal modals.",
		sectionTitle: "Consumer-controlled dialog embedding",
		localeLabel: "Consumer locale",
		openDialog: "Open participation widget",
		closeDialog: "Close dialog",
		dialogTitle: "Participation widget dialog",
		dialogNote:
			"Outer dialog open/close behavior is controlled by the host page. The About and privacy dialogs inside the widget are controlled by the widget itself.",
	},
	nl: {
		helperText:
			"Deze consumentpagina beheert de buitenste dialoog. De widget blijft een normale insluitbare component en beheert alleen zijn eigen interne modalvensters.",
		sectionTitle: "Insluiting in een consumentgestuurde dialoog",
		localeLabel: "Consument-locale",
		openDialog: "Open participatiewidget",
		closeDialog: "Dialoog sluiten",
		dialogTitle: "Dialoog met participatiewidget",
		dialogNote:
			"Openen en sluiten van de buitenste dialoog wordt beheerd door de hostpagina. De Over- en privacydialogen binnen de widget worden door de widget zelf beheerd.",
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
	const dialogNote = document.querySelector("#consumer-dialog-note");

	if (helper) helper.textContent = copy.helperText;
	if (heading) heading.textContent = copy.sectionTitle;
	if (localeLabel) localeLabel.textContent = copy.localeLabel;
	if (openButton) openButton.textContent = copy.openDialog;
	if (closeButton) closeButton.textContent = copy.closeDialog;
	if (dialogTitle) dialogTitle.textContent = copy.dialogTitle;
	if (dialogNote) dialogNote.textContent = copy.dialogNote;

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
