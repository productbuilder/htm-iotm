import { TimemapContributor } from "./app.js";
import { WidgetModal } from "./components/modal.js";

if (!customElements.get("widget-modal")) {
	customElements.define("widget-modal", WidgetModal);
}

if (!customElements.get("timemap-contributor")) {
	customElements.define("timemap-contributor", TimemapContributor);
}
