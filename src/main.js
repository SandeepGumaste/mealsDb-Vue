import { createApp } from "vue";
import Notifications from "@kyvg/vue3-notification";

import router from "./router";
import store from "./store";
import "./style.css";
import App from "./App.vue";

createApp(App).use(router).use(store).use(Notifications).mount("#app");
