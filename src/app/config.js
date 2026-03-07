export const DEFAULT_CONFIG = {
	apiBaseUrl: "",
	projectId: "",
	locale: "en",
	theme: "light",
	allowVideo: true,
	allowAudio: true,
	allowImage: true,
	maxFileSize: 10 * 1024 * 1024,
	organizationName: "",
	headerTitle: "",
};

export const ATTRIBUTE_MAP = {
	"api-base-url": "apiBaseUrl",
	"project-id": "projectId",
	locale: "locale",
	theme: "theme",
	"allow-video": "allowVideo",
	"allow-audio": "allowAudio",
	"allow-image": "allowImage",
	"max-file-size": "maxFileSize",
	"organization-name": "organizationName",
	"header-title": "headerTitle",
};

export const STEP_DEFINITIONS = [
	{ id: 0, key: "introduction" },
	{ id: 1, key: "upload" },
	{ id: 2, key: "metadata" },
	{ id: 3, key: "consent" },
	{ id: 4, key: "contact" },
	{ id: 5, key: "review" },
];
