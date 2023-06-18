<template>
  <ion-page>
    <ion-content class="margenes">
      <h2 class="tituloGeneral">Sign Up</h2>
      <ion-item class="displayblock">
         <ion-label>
      <ion-input v-model="usuario.email" label="Email: " type="email"></ion-input>
      <ion-input v-model="usuario.nombre" label="Nombre: " type="nombre"></ion-input>
      <ion-input v-model="usuario.apellido" label="Apellido: " type="apellido"></ion-input>
      <ion-input
        v-model="usuario.password"
        label="Password: "
        type="password"
      ></ion-input>
      <ion-input v-model="usuario.dni" label="Dni: " type="int"></ion-input>
      <ion-input
        v-model="usuario.telefono"
        label="Telefono: "
        type="int"
      ></ion-input>
      <ion-input
        v-model="usuario.fechaNacimiento"
        label="Fecha de nacimiento:"
        type="date"
      ></ion-input>

      <ion-button class = "button-50" @click="signUp">Registrar</ion-button>
         </ion-label>
        </ion-item> 
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonContent, IonInput, IonItem,IonLabel} from "@ionic/vue";
import { useLoginStore } from "../stores/login";
import  usuarioService  from "../services/usuariosService"

export default {
  components: { IonPage, IonButton, IonContent, IonInput ,IonItem,IonLabel},
  setup() {
    const store = useLoginStore();
    const { login } = store;
    return { login };
  },
  data() {
    return {
      usuario: {  },
    };
  },
  methods: {
    async signUp() {
      
      try {
        const usuario = { ...this.usuario };
        await usuarioService.agregar(this.usuario)
        this.login( { nombre: this.usuario.nombre, id: this.usuario.id, dni: this.usuario.dni, permissions: [] } )   
        this.$router.push('/')
        this.usuario = {}
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style>
</style>
