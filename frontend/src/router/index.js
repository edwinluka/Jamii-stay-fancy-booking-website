import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListingsPage from "../views/ListingsPage.vue";
import BookingView from "../views/BookingView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddListingView from "../views/AddListingView.vue"; // host-only
import store from "../store"; // Vuex store

const routes = [
  { path: "/", component: HomeView }, // homepage
  { path: "/listings", component: ListingsPage },
  {
    path: "/booking/:id",
    component: BookingView,
    meta: { requiresAuth: true, role: "guest" }, // only guests
  },
  {
    path: "/add-listing",
    component: AddListingView,
    meta: { requiresAuth: true, role: "host" }, // only hosts
  },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🚨 Route Guard
router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuthenticated;
  const userRole = store.getters.userRole;

  if (to.meta.requiresAuth) {
    if (!isAuth) return next("/login");
    if (to.meta.role && to.meta.role !== userRole) return next("/listings"); // block unauthorized roles
  }

  next();
});

export default router;
