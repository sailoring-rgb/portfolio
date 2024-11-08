import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App);
app.use(router);

app.mount("#app");
