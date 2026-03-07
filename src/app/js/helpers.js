export function toBoolean(value, fallback = false) {
	if (value === null || value === undefined || value === "") {
		return fallback;
	}
	if (typeof value === "boolean") {
		return value;
	}
	return String(value).toLowerCase() === "true";
}

export function toNumber(value, fallback = 0) {
	const n = Number(value);
	return Number.isFinite(n) ? n : fallback;
}

export function formatFileSize(bytes) {
	if (!Number.isFinite(bytes) || bytes < 0) {
		return "0 B";
	}
	if (bytes < 1024) {
		return `${bytes} B`;
	}
	if (bytes < 1024 * 1024) {
		return `${(bytes / 1024).toFixed(1)} KB`;
	}
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function escapeHtml(value) {
	return String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}
