import { IotmParticipationWidget } from "./app.js";
import { WidgetModal } from "./components/modal.js";

if (!customElements.get("widget-modal")) {
	customElements.define("widget-modal", WidgetModal);
}

if (!customElements.get("iotm-participation-widget")) {
	customElements.define("iotm-participation-widget", IotmParticipationWidget);
}
