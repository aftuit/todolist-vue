// import VueFontawesome
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
const app = createApp(App);

app.use(createPinia());
app.mount("#app");
