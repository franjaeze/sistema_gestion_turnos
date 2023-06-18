<template>
  <ion-page>
    <ion-content class="">
      
      <h2 class="tituloGeneral">Login</h2><ion-item class="displayblock">
         <ion-label>
      <ion-input class="input" v-model="usuario.dni" placeholder="Ingrese su dni" label="Dni: " type="int"></ion-input>
      <ion-input class="input" v-model="usuario.password" label="Password: " placeholder="Ingrese su password" type="password"></ion-input>
    <ion-button id="margen" class="button-50 " @click="loguear">Login</ion-button>
   </ion-label> </ion-item>   
  </ion-content>  
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonContent, IonInput,IonItem,IonList, IonLabel } from "@ionic/vue";
import { useLoginStore } from "../stores/login";
import axios from 'axios';

export default {
  components: { IonPage, IonButton, IonContent, IonInput,IonItem,IonList,IonLabel},
  setup() {
    const store = useLoginStore();
    const { login } = store;
    return { login };
  },
  data() {
    return {
      usuario: {dni:'',password:''}
    }
  },
  methods: {
    async loguear() {
                                        
        const response = await axios.get("https://646beae07b42c06c3b2a949b.mockapi.io/usuarios");
        let resultado = response.data.filter(elemento =>  elemento.dni == this.usuario.dni &&  elemento.password == this.usuario.password)
        console.log(resultado);
        console.log(resultado != null);

        if (resultado.length != 0){
          this.login( { nombre: resultado[0].nombre, id:resultado[0].id,dni:resultado[0].dni, permissions: [] } )
          this.$router.push('/')
        } else {
          alert('Credenciales incorrectas')
        }   
    
    
    }
  }
};
</script>

<style>
 
</style>