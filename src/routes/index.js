import { createWebHashHistory, createRouter } from "vue-router";

import HomePage from "../components/HomePage.vue";
import AboutMePage from "../components/AboutMePage.vue";
import BackgroundPage from "../components/BackgroundPage.vue";
import ProjectsPage from "../components/ProjectsPage.vue";
import ContactsPage from "../components/ContactsPage.vue";

const routes = [
    { path: "/", name: "HomePage", component: HomePage },
    { path: "/aboutme", name: "AboutMePage", component: AboutMePage },
    { path: "/background", name: "BackgroundPage", component: BackgroundPage },
    { path: "/projects", name: "ProjectsPage", component: ProjectsPage },
    { path: "/contacts", name: "ContactsPage", component: ContactsPage },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
