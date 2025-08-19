import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // ✅ import store

const app = createApp(App);

app.use(router);
app.use(store); // ✅ register Vuex store

app.mount("#app");
