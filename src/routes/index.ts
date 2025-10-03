import { createRouter, createWebHistory } from "vue-router";
import {
  pageIframe,
  PATH_APP_PAGE_ADD,
  PATH_APP_PAGE_LIST,
} from "../utils/constant";

import PageIframe from "../views/PageIframe.vue";

const routes = [
  {
    path: PATH_APP_PAGE_LIST,
    alias: "/",
    name: pageIframe.LIST,
    component: PageIframe,
    props: { pageType: pageIframe.LIST },
  },
  {
    path: PATH_APP_PAGE_ADD,
    name: pageIframe.ADD,
    component: PageIframe,
    props: { pageType: pageIframe.ADD },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_IFRAME_URL),
  routes,
});

export default router;
