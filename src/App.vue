<script>
import { RouterLink, RouterView } from "vue-router";
import { IonApp, IonHeader,IonToolbar, IonIcon,IonContent,IonChip} from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "./stores/login.js";
import { home,apps, exit,alert, key,list,clipboard,person } from 'ionicons/icons'

export default {
  components: { IonApp, IonHeader,IonToolbar,IonIcon,IonContent,IonChip},
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
  },
};
</script>

<template>
  <ion-app>

    <ion-header>
      <ion-toolbar>
       
      <RouterLink class="button-54" to="/">Home 
         <ion-icon :icon ="home"></ion-icon> </RouterLink>
      <RouterLink class="button-54" to="/about">About 
        <ion-icon :icon ="apps"></ion-icon> </RouterLink>
      <RouterLink class="button-54" to="/servicios">Servicios 
        <ion-icon :icon ="clipboard"></ion-icon>     </RouterLink>
      <RouterLink class="button-54" v-if="isLogin" to="/indexTurnos">Turnos 
        <ion-icon :icon ="list"></ion-icon>      </RouterLink>
      <RouterLink class="button-54" v-if="isLogin && hasPermissions('config')" to="/config">Config |</RouterLink>
      <RouterLink class="button-54"  v-if="!isLogin" to="/signup">Sign Up 
        <ion-icon :icon ="alert"></ion-icon>      </RouterLink>
      <RouterLink class="button-54"  v-if="!isLogin" to="/login">Login 
        <ion-icon :icon ="key"></ion-icon>        </RouterLink>
      <RouterLink class="button-54" v-if="isLogin" to="/logout">Usuario
        <ion-icon :icon ="exit"></ion-icon>   </RouterLink>
        <RouterLink class="button-54" v-if="isAdmin" to="/admin">Admin
        <ion-icon :icon ="exit"></ion-icon>   </RouterLink>
        <p v-if="isLogin" class="bienvenido">Bienvenido !!! </p>
        <ion-chip  v-if="isLogin" class="chip"> <ion-icon :icon="person" color="primary"></ion-icon><p></p> {{ user.nombre }} </ion-chip>
     <ion-chip   v-if="isAdmin" class="admin" > Usted esta en rol  {{ user.rol }} </ion-chip>
    </ion-toolbar>
  </ion-header>
   
    <RouterView />
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
