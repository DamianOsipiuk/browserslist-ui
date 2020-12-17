import { createApp } from "vue";
import App from "./App.vue";

// @ts-expect-error TODO
window.browserslistVersion = "4.14.7";
// @ts-expect-error TODO
window.caniuseVersion = "1.0.30001157";

createApp(App).mount("#app");
