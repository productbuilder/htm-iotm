import { customTranslations } from "./i18n.js";

await import("../app/index.js");

const textWidget = document.querySelector("#text-widget");
if (textWidget) {
	textWidget.translations = customTranslations;
}

const combinedWidget = document.querySelector("#combined-widget");
if (combinedWidget) {
	combinedWidget.translations = {
		...customTranslations,
		buttons: {
			...customTranslations.buttons,
			readPrivacy: {
				en: "Check privacy terms",
				nl: "Bekijk privacyvoorwaarden",
			},
		},
		intro: {
			...customTranslations.intro,
			descriptionOne: {
				en: "Help preserve city memory with your own photos, videos, and audio.",
				nl: "Help het stadsgeheugen bewaren met je eigen foto's, video's en audio.",
			},
		},
	};
}
