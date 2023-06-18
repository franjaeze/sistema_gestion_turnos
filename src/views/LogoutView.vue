<template>
  <ion-page>
    <ion-content>


    
    <h2 class="tituloMenu">Usuario  {{ this.usuarioActual.nombre  }}   {{ this.usuarioActual.apellido }}  </h2>
<ion-list v-if="mostrar">
  <ion-item><b> Nombre   </b> <br> <br>   {{usuarioActual.nombre  }}  </ion-item>
  <ion-item><b>  Apellido </b> <br> <br> {{usuarioActual.apellido  }}</ion-item>
  <ion-item> <b> Telefono </b> <br> <br> {{usuarioActual.telefono  }}</ion-item>
  <ion-item> <b> Email </b> <br> <br> {{usuarioActual.email  }}</ion-item>
  <ion-item> <b> Fecha de nacimiento </b> <br> <br> {{usuarioActual.fechaNacimiento  }}</ion-item>
</ion-list>
  <ion-button class="button-50" @click="unlogear">Logout</ion-button>
  <ion-button class="button-50" @click="modificar()"  v-if="mostrar">Modificar</ion-button>


  <ion-item v-if="!mostrar">
        <ion-list>
          <ion-input v-model="usuarioActual.nombre" label="Nombre" color="warning"></ion-input>
          <ion-input v-model="usuarioActual.apellido" color="warning" label="Apellido" fill="outline"></ion-input>
          <ion-input v-model="usuarioActual.telefono" interface="popover" label="Telefono" color="warning" fill="outline"  ></ion-input>
          <ion-input v-model="usuarioActual.email" interface="popover" label="Email" placeholder="Profesional" color="warning" fill="outline"></ion-input>
       
          <ion-input v-model="usuarioActual.fechaNacimiento" color="warning" label="Fecha de nacimiento" fill="outline" type="datetime-local">     </ion-input>
          <ion-input v-model="usuarioActual.dni" color="warning" label="DNI" fill="outline" readonly></ion-input>
          <ion-button class="button-50" @click="cambiar()">Modificar</ion-button>
        </ion-list>

      </ion-item>














  </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonContent,IonList,IonItem,IonInput} from "@ionic/vue";
import { useLoginStore } from "../stores/login";
import { storeToRefs } from "pinia";
import usuariosService from '../services/usuariosService'

export default {
  components: { IonPage, IonButton, IonContent,IonList,IonItem,IonInput },
  setup() {
    const store = useLoginStore();
    const { user } = storeToRefs(store);
    const { logout } = store;
    return { logout, user };
  },data(){
  return{
      usuarioActual:{dni: "",nombre: "",apellido: "",telefono:"",fechaNacimiento: "",email: "", id:""},
      mostrar:true
    }
},mounted(){
  this.listarUsuarios()
  console.log(this.usuarioActual)
},
methods:{  
   unlogear() {
        this.logout()
        this.$router.push('/login')
      },      
async listarUsuarios() { 
   try {
      let todosUsuarios =  await usuariosService.listarUsuarios()
      console.log(todosUsuarios)
      console.log(this.user.dni)
      this.usuarioActual =todosUsuarios.filter(e => e.dni == parseInt(this.user.dni))[0]
      console.log(this.usuarioActual)
     
    }   catch (e) {
        alert("Se produjo un error");
      }},


      modificar(){
        this.mostrar=false;

      },

     async cambiar(){
       try {
         this.mostrar = true;
        await usuariosService.modificar(this.usuarioActual.id, this.usuarioActual);
         
      } catch (e) {
        alert("Se produjo un error");
      }
      }
}

  }
;
</script>

<style>
</style>
