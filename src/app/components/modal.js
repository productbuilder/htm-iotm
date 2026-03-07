export class WidgetModal extends HTMLElement {
	static get observedAttributes() {
		return ["open", "title", "close-label", "close-aria-label"];
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this._onBackdropClick = this._onBackdropClick.bind(this);
		this._onKeydown = this._onKeydown.bind(this);
	}

	connectedCallback() {
		this.render();
		this.shadowRoot.addEventListener("click", this._onBackdropClick);
		document.addEventListener("keydown", this._onKeydown);
	}

	disconnectedCallback() {
		this.shadowRoot.removeEventListener("click", this._onBackdropClick);
		document.removeEventListener("keydown", this._onKeydown);
	}

	attributeChangedCallback() {
		this.render();
	}

	get open() {
		return this.hasAttribute("open");
	}

	set open(value) {
		if (value) {
			this.setAttribute("open", "");
		} else {
			this.removeAttribute("open");
		}
	}

	close() {
		this.open = false;
		this.dispatchEvent(new CustomEvent("widget-modal-close", { bubbles: true, composed: true }));
	}

	_onBackdropClick(event) {
		if (event.target instanceof HTMLElement && event.target.dataset.backdrop === "true") {
			this.close();
		}
	}

	_onKeydown(event) {
		if (this.open && event.key === "Escape") {
			this.close();
		}
	}

	render() {
		const title = this.getAttribute("title") || "";
		const closeLabel = this.getAttribute("close-label") || "";
		const closeAriaLabel = this.getAttribute("close-aria-label") || closeLabel;
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: ${this.open ? "block" : "none"};
				}
				.backdrop {
					position: fixed;
					inset: 0;
					background: rgba(0, 0, 0, 0.45);
					display: grid;
					place-items: center;
					z-index: 999;
				}
				.modal {
					background: #fff;
					width: min(600px, 94vw);
					max-height: 90vh;
					overflow: auto;
					border-radius: var(--iotm-radius, 10px);
					border: 1px solid var(--iotm-border-color, #d4d4d8);
					padding: 1rem;
				}
				@media (max-width: 720px) {
					.modal {
						width: 96vw;
						height: 92vh;
						max-height: none;
					}
				}
				.header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 0.75rem;
				}
				button {
					border: 1px solid var(--iotm-border-color, #d4d4d8);
					background: #fff;
					padding: 0.45rem 0.75rem;
					cursor: pointer;
					border-radius: var(--iotm-radius, 10px);
				}
			</style>
			<div class="backdrop" part="modal-backdrop" data-backdrop="true" role="presentation">
				<section class="modal" part="modal" role="dialog" aria-modal="true" aria-label="${title}">
					<div class="header">
						<strong>${title}</strong>
						<button type="button" aria-label="${closeAriaLabel}" data-close="true">${closeLabel}</button>
					</div>
					<slot></slot>
				</section>
			</div>
		`;
		const closeButton = this.shadowRoot.querySelector("[data-close='true']");
		if (closeButton) {
			closeButton.addEventListener("click", () => this.close(), { once: true });
		}
	}
}
