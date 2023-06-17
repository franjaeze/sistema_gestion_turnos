import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import SignUpView from '../views/SignUpView.vue'
import LogoutView from '../views/LogoutView.vue'
import LoginView from '../views/LoginView.vue'
import IndexTurnosView from '../views/IndexTurnosView.vue'
import ModificacionTurnoView from '../views/ModificacionTurnoView.vue'
import ServiciosView from '../views/ServiciosView.vue'
import AdminView from '../views/AdminView.vue'
import { useLoginStore } from '../stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'sign up',
      component: SignUpView
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: ServiciosView
    },
    {
      path: '/turnos/editar/:id',
      name: 'ModificacionTurno',
      component: ModificacionTurnoView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
 
    {
      path: '/:pathMatch(.*)*',
      name: "NotFound",
      component: NotFoundView
    },
    {
      path: '/indexTurnos',
      name: "Turnos",
      component: IndexTurnosView
    },{
      path: '/admin',
      name: "Admin",
      component: AdminView
    },
    
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useLoginStore();
  if (to.matched.some(r => r.meta.RequireAuth) && !store.isLogin) {
    next('/')  // ir a una ruta que indique error 401
  } else {
    next()
  }
})


export default router
