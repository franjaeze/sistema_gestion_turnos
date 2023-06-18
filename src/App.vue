<script>
import { RouterLink, RouterView } from "vue-router";
import { IonApp, IonHeader,IonToolbar, IonIcon,IonContent,IonChip,IonMenuButton,IonMenu,IonTitle,IonPage,IonButtons,IonItem,IonList} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "./stores/login.js";
import { home,apps, exit,alert, key,list,clipboard,person } from 'ionicons/icons'

export default {
  components: { IonApp, IonHeader,IonToolbar,IonIcon,IonContent,IonChip,IonMenuButton,IonMenu,IonTitle,IonPage,IonButtons,IonItem,IonList
  },
  setup() {
    const store = useLoginStore();
    const { isLogin,isAdmin, user } = storeToRefs(store);
    const { hasPermissions } = store; 
    return { 
      isLogin,
      isAdmin,
       user, 
       hasPermissions,
       home, apps, exit,alert, key,list, clipboard,person};
  }, data() {
    return {
      devWidth: 0
    };
  },
  mounted() {
    this.devWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.devWidth = window.innerWidth;
    }
  }
};
</script>

<template>
  <ion-app>
    <ion-menu v-if="devWidth < 576" contentId="main-content">
    <ion-header >
      <ion-toolbar>
        <ion-title class="tituloMenu">Beauty Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list >
        <p v-if="isLogin" class="bienvenido">Bienvenido !!! </p>
        <ion-chip  v-if="isLogin" class="chip"> <ion-icon :icon="person" color="primary"></ion-icon><p></p> {{ user.nombre }} </ion-chip>
     <ion-chip   v-if="isAdmin" class="admin" > Usted esta en rol  {{ user.rol }} </ion-chip>

           <RouterLink class="menuGeneral " to="/">Home 
         <ion-icon :icon ="home"></ion-icon> </RouterLink>
      <RouterLink class="menuGeneral" v-if="isLogin" to="/indexTurnos">Turnos 
        <ion-icon :icon ="list"></ion-icon>      </RouterLink>
      <RouterLink class="menuGeneral" v-if="isLogin && hasPermissions('config')" to="/config">Config |</RouterLink>
      <RouterLink class="menuGeneral"  v-if="!isLogin" to="/signup">Sign Up 
        <ion-icon :icon ="alert"></ion-icon>      </RouterLink>
      <RouterLink class="menuGeneral"  v-if="!isLogin" to="/login">Login 
        <ion-icon :icon ="key"></ion-icon>        </RouterLink>
        <RouterLink class="menuGeneral" to="/servicios">Servicios 
        <ion-icon :icon ="clipboard"></ion-icon>     </RouterLink>
      <RouterLink class="menuGeneral" v-if="isLogin" to="/logout">Usuario
        <ion-icon :icon ="exit"></ion-icon>   </RouterLink>
        <RouterLink class="menuGeneral" v-if="isAdmin" to="/admin">Admin
        <ion-icon :icon ="exit"></ion-icon>   </RouterLink>
        <RouterLink class="menuGeneral" to="/about">About 
        <ion-icon :icon ="apps"></ion-icon> </RouterLink>
     
      </ion-list>
    </ion-content>
  </ion-menu>

  <ion-content id="main-content" >
    <ion-header>
      <ion-toolbar>
        <ion-buttons  v-if="devWidth < 576" slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title > <p class="tituloMenu">Beuaty spa</p><span v-if="devWidth > 576">
          <RouterLink class="button-56 " to="/">Home 
         <ion-icon class="iconos" :icon ="home"></ion-icon> </RouterLink>
      <RouterLink class="button-56" v-if="isLogin" to="/indexTurnos">Turnos 
        <ion-icon class="iconos" :icon ="list"></ion-icon>      </RouterLink>
      <RouterLink class="button-56" v-if="isLogin && hasPermissions('config')" to="/config">Config |</RouterLink>
      <RouterLink class="button-56"  v-if="!isLogin" to="/signup">Sign Up 
        <ion-icon class="iconos" :icon ="alert"></ion-icon>      </RouterLink>
      <RouterLink class="button-56"  v-if="!isLogin" to="/login">Login 
        <ion-icon class="iconos" :icon ="key"></ion-icon>        </RouterLink>
        <RouterLink class="button-56" to="/servicios">Servicios 
        <ion-icon class="iconos" :icon ="clipboard"></ion-icon>     </RouterLink>
      <RouterLink class="button-56" v-if="isLogin" to="/logout">Usuario
        <ion-icon class="iconos" :icon ="exit"></ion-icon>   </RouterLink>
        <RouterLink class="button-56" v-if="isAdmin" to="/admin">Admin
        <ion-icon class="iconos" :icon ="exit"></ion-icon>   </RouterLink>
        <RouterLink class="button-56" to="/about">About 
        <ion-icon class="iconos" :icon ="apps"></ion-icon> </RouterLink>
        </span>
        </ion-title>   
        
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"> 
      
      <RouterView />
      
    </ion-content>
  </ion-content>




 
   
  </ion-app>
</template>

<style>

.chip {
  background-color: rgb(101, 84, 63);
  color: rgb(255, 255, 255);
  font-family:  Geneva, Verdana, sans-serif;
  font-size: 16px;
}
.bienvenido {
   
  color: rgb(38, 28, 1);
  font-family:  Geneva, Verdana, sans-serif;
  font-size: 16px;
  font-weight: 600;
}
.admin{
  background-color: rgba(137, 8, 3, 0.669);
  color: rgb(255, 255, 255);
  font-family:  Geneva, Verdana, sans-serif;
  font-size: 16px;
}

</style>
