import { customTranslations } from "./i18n.js";

window.IOTM_PARTICIPATION_WIDGET_CONFIG = {
	translations: {
		buttons: {
			readPrivacy: {
				en: "Review privacy details",
				nl: "Bekijk privacyinformatie",
			},
		},
	},
};

await import("../app/index.js");

const customWidget = document.querySelector("#custom-widget");
if (customWidget) {
	customWidget.translations = customTranslations;
}
