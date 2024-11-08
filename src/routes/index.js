import { createMemoryHistory, createRouter } from "vue-router";

import HomePage from "../components/HomePage.vue";
import AboutMePage from "../components/AboutMePage.vue";

const routes = [
    { path: "/", name: "HomePage", component: HomePage },
    { path: "/aboutme", name: "AboutMePage", component: AboutMePage },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
