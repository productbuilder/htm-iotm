// src/app/js/i18n.js


const translations = {
	en: {
		steps: {
			introduction: "Introduction",
			upload: "Upload media",
			metadata: "Description and metadata",
			consent: "Rights and consent",
			contact: "Contact details",
			review: "Review and confirmation",
		},
		buttons: {
			start: "Start",
			back: "Back",
			continue: "Continue",
			submit: "Submit submission",
			submitting: "Submitting...",
			close: "Close",
			remove: "Remove",
			readPrivacy: "Read privacy details",
		},
		common: {
			yes: "Yes",
			no: "No",
			none: "(none)",
			notAvailable: "n/a",
		},
		status: {
			checkingApi: "Checking API availability...",
			apiOnline: "API connection is available.",
			apiOffline: "API is currently unavailable. You can continue and try again later.",
			localMode: "Running in local mode. Set api-base-url to connect backend endpoints.",
			uploading: "Uploading files...",
			networkError: "Network error. Please check your connection and try again.",
			submissionError: "Unable to submit right now. Please try again.",
		},
		intro: {
			title: "Introduction",
			descriptionOne:
				"Use this widget to share photos, videos, or audio related to local history and heritage.",
			descriptionTwo:
				"You will add media, a short description, rights confirmation, and contact details. This takes a few minutes.",
		},
		upload: {
			title: "Upload media",
			instruction: "Add at least one media file. Maximum file size: {maxSize}.",
			chooseFiles: "Choose files",
			dropzone: "Drag and drop files here",
			dropzoneLabel: "Upload files by dragging and dropping",
			empty: "No files selected yet.",
			previewAlt: "Preview of {name}",
			sizeMaxSuffix: "max per file",
			mediaType: {
				image: "image",
				video: "video",
				audio: "audio",
				unknown: "unknown",
			},
		},
		metadata: {
			title: "Description and metadata",
			instruction: "Provide a title or description. Add optional metadata and timestamp.",
			titleLabel: "Title",
			descriptionLabel: "Description",
			extraLabel: "Metadata (keywords, location, date notes)",
			timestampLabel: "Timestamp",
		},
		consent: {
			title: "Rights and consent",
			instruction:
				"By submitting, you confirm that you own the rights to this material or have permission to share it.",
			rightsLabel: "I confirm that I own the rights or have permission to upload this material.",
			publicLabel: "I consent to public use of this submission for heritage storytelling.",
		},
		contact: {
			title: "Contact details",
			instruction: "We use contact details only to follow up on your submission when needed.",
			nameLabel: "Contributor name",
			emailLabel: "Email",
		},
		review: {
			title: "Review and confirmation",
			intro: "Review your submission before you send it.",
			mediaFiles: "Media files",
			description: "Description",
			metadata: "Metadata",
			rights: "Rights and consent",
			contact: "Contact details",
			titleLabel: "Title:",
			descriptionLabel: "Description:",
			metadataLabel: "Metadata:",
			rightsDeclarationLabel: "Rights declaration:",
			publicConsentLabel: "Public use consent:",
			nameLabel: "Name:",
			emailLabel: "Email:",
		},
		success: {
			title: "Submission completed",
			message: "Thank you. Your submission was sent successfully.",
			reference: "Reference:",
		},
		modal: {
			title: "Privacy and contact details",
			closeAriaLabel: "Close dialog",
			body:
				"We ask for your contact details so we can verify information, request context, or clarify rights when needed. We use your details only to handle submissions.",
		},
		aria: {
			submissionSteps: "Submission steps",
		},
		validation: {
			fileRequired: "Please add at least one file.",
			invalidEmail: "Please provide a valid email address.",
			metadataRequired: "Please provide at least a title or description.",
			rightsRequired: "Please confirm that you own the rights or have permission.",
			publicConsentRequired: "Please consent to public use for this submission.",
			nameRequired: "Contributor name is required.",
			invalidType: "This file type is not allowed.",
			fileSizeExceeded: "One or more files exceed the maximum file size.",
		},
	},
	nl: {
		steps: {
			introduction: "Introductie",
			upload: "Media uploaden",
			metadata: "Beschrijving en metadata",
			consent: "Rechten en toestemming",
			contact: "Contactgegevens",
			review: "Controleren en bevestigen",
		},
		buttons: {
			start: "Start",
			back: "Terug",
			continue: "Verder",
			submit: "Inzending versturen",
			submitting: "Versturen...",
			close: "Sluiten",
			remove: "Verwijderen",
			readPrivacy: "Lees privacyinformatie",
		},
		common: {
			yes: "Ja",
			no: "Nee",
			none: "(geen)",
			notAvailable: "n.v.t.",
		},
		status: {
			checkingApi: "API-beschikbaarheid controleren...",
			apiOnline: "API-verbinding is beschikbaar.",
			apiOffline: "API is momenteel niet beschikbaar. Je kunt doorgaan en later opnieuw proberen.",
			localMode: "Draait in lokale modus. Stel api-base-url in om backend-eindpunten te verbinden.",
			uploading: "Bestanden uploaden...",
			networkError: "Netwerkfout. Controleer je verbinding en probeer opnieuw.",
			submissionError: "Versturen is nu niet mogelijk. Probeer het opnieuw.",
		},
		intro: {
			title: "Introductie",
			descriptionOne:
				"Gebruik deze widget om foto's, video's of audio te delen over lokale geschiedenis en erfgoed.",
			descriptionTwo:
				"Je voegt media, een korte beschrijving, rechtenbevestiging en contactgegevens toe. Dit duurt een paar minuten.",
		},
		upload: {
			title: "Media uploaden",
			instruction: "Voeg minimaal een mediabestand toe. Maximale bestandsgrootte: {maxSize}.",
			chooseFiles: "Bestanden kiezen",
			dropzone: "Sleep bestanden hier naartoe",
			dropzoneLabel: "Upload bestanden door ze hierheen te slepen",
			empty: "Nog geen bestanden geselecteerd.",
			previewAlt: "Voorbeeld van {name}",
			sizeMaxSuffix: "max per bestand",
			mediaType: {
				image: "afbeelding",
				video: "video",
				audio: "audio",
				unknown: "onbekend",
			},
		},
		metadata: {
			title: "Beschrijving en metadata",
			instruction: "Geef een titel of beschrijving. Voeg optionele metadata en een tijdstip toe.",
			titleLabel: "Titel",
			descriptionLabel: "Beschrijving",
			extraLabel: "Metadata (trefwoorden, locatie, datumopmerkingen)",
			timestampLabel: "Tijdstip",
		},
		consent: {
			title: "Rechten en toestemming",
			instruction:
				"Door te versturen bevestig je dat je de rechten op dit materiaal hebt, of toestemming hebt om het te delen.",
			rightsLabel: "Ik bevestig dat ik de rechten heb, of toestemming, om dit materiaal te uploaden.",
			publicLabel: "Ik geef toestemming voor openbaar gebruik van deze inzending voor erfgoedverhalen.",
		},
		contact: {
			title: "Contactgegevens",
			instruction: "We gebruiken contactgegevens alleen om je inzending op te volgen wanneer dat nodig is.",
			nameLabel: "Naam van de bijdrager",
			emailLabel: "E-mail",
		},
		review: {
			title: "Controleren en bevestigen",
			intro: "Controleer je inzending voordat je deze verstuurt.",
			mediaFiles: "Mediabestanden",
			description: "Beschrijving",
			metadata: "Metadata",
			rights: "Rechten en toestemming",
			contact: "Contactgegevens",
			titleLabel: "Titel:",
			descriptionLabel: "Beschrijving:",
			metadataLabel: "Metadata:",
			rightsDeclarationLabel: "Rechtenverklaring:",
			publicConsentLabel: "Toestemming voor openbaar gebruik:",
			nameLabel: "Naam:",
			emailLabel: "E-mail:",
		},
		success: {
			title: "Inzending voltooid",
			message: "Bedankt. Je inzending is succesvol verstuurd.",
			reference: "Referentie:",
		},
		modal: {
			title: "Privacy en contactgegevens",
			closeAriaLabel: "Dialoog sluiten",
			body:
				"We vragen om je contactgegevens zodat we informatie kunnen verifieren, context kunnen opvragen, of rechten kunnen verduidelijken wanneer dat nodig is. We gebruiken je gegevens alleen voor de afhandeling van inzendingen.",
		},
		aria: {
			submissionSteps: "Stappen van de inzending",
		},
		validation: {
			fileRequired: "Voeg minimaal een bestand toe.",
			invalidEmail: "Vul een geldig e-mailadres in.",
			metadataRequired: "Geef minimaal een titel of beschrijving op.",
			rightsRequired: "Bevestig dat je de rechten hebt, of toestemming hebt.",
			publicConsentRequired: "Geef toestemming voor openbaar gebruik van deze inzending.",
			nameRequired: "Naam van de bijdrager is verplicht.",
			invalidType: "Dit bestandstype is niet toegestaan.",
			fileSizeExceeded: "Een of meer bestanden zijn groter dan de maximale bestandsgrootte.",
		},
	},
};

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

export function createTranslator(locale) {
	const language = resolveLanguageFromLocale(locale);
	return {
		language,
		t(key, params = {}) {
			const primary = translations[language] || translations.en;
			const fallback = translations.en;
			const value = getNestedValue(primary, key) ?? getNestedValue(fallback, key) ?? key;
			return interpolate(value, params);
		},
	};
}
