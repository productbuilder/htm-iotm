async function request(url, options = {}) {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			const message = `${response.status} ${response.statusText}`;
			throw new Error(message);
		}
		const contentType = response.headers.get("content-type") || "";
		if (contentType.includes("application/json")) {
			return await response.json();
		}
		return await response.text();
	} catch (error) {
		const networkError = new Error(error.message || "NETWORK_ERROR");
		if (error instanceof TypeError) {
			networkError.code = "NETWORK_ERROR";
		}
		throw networkError;
	}
}

export class ApiClient {
	constructor(baseUrl) {
		this.baseUrl = String(baseUrl || "").replace(/\/+$/, "");
	}

	isConfigured() {
		return Boolean(this.baseUrl);
	}

	getConfig() {
		return request(`${this.baseUrl}/config`, { method: "GET" });
	}

	health() {
		return request(`${this.baseUrl}/health`, { method: "GET" });
	}

	uploadFile(file, extraData = {}) {
		const formData = new FormData();
		formData.append("file", file);
		Object.entries(extraData).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				formData.append(key, String(value));
			}
		});
		return request(`${this.baseUrl}/uploads`, {
			method: "POST",
			body: formData,
		});
	}

	submitSubmission(payload) {
		return request(`${this.baseUrl}/submissions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
	}
}
