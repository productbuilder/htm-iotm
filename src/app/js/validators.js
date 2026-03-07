export function isValidEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function validateStep(state, stepIndex, t) {
	const errors = {};
	if (stepIndex === 1 && state.uploads.length === 0) {
		errors.uploads = t("validation.fileRequired");
	}
	if (stepIndex === 2) {
		const hasTitle = Boolean((state.metadata.title || "").trim());
		const hasDescription = Boolean((state.metadata.description || "").trim());
		if (!hasTitle && !hasDescription) {
			errors.metadata = t("validation.metadataRequired");
		}
	}
	if (stepIndex === 3) {
		if (!state.consent.rightsDeclaration) {
			errors.rightsDeclaration = t("validation.rightsRequired");
		}
		if (!state.consent.publicConsent) {
			errors.publicConsent = t("validation.publicConsentRequired");
		}
	}
	if (stepIndex === 4) {
		if (!String(state.contact.name || "").trim()) {
			errors.name = t("validation.nameRequired");
		}
		if (!isValidEmail(state.contact.email)) {
			errors.email = t("validation.invalidEmail");
		}
	}
	return errors;
}
