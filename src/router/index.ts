import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Index from "../views/Index.vue";
import Login from "../views/cliente/Login.vue";
import CadastroUsuario from "../views/cliente/CadastroUsuario.vue";
import UsuarioContas from "../views/cliente/UsuarioContas.vue";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      public: true // Allow access to even if not logged in
    }
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: CadastroUsuario,
    meta: {
      public: true // Allow access to even if not logged in
    }
  },
  {
    path: "/usuario",
    name: "usuario",
    component: UsuarioContas
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const loggedIn = store.state.store.token;
  console.log(to.name);
  if (loggedIn == "") {
    if (!isPublic) {
      return next({
        path: "/login"
      });
    }
  }
  next();
});
export default router;
