<template>
  <ion-page>
    <ion-content>
      <h2>Login</h2>
      <ion-input v-model="usuario.dni" placeholder="Ingrese su dni" label="Dni" type="int"></ion-input>
      <ion-input v-model="usuario.password" label="Password" placeholder="Ingrese su password" type="password"></ion-input>
      <ion-button class="button-50" @click="loguear">Login</ion-button>
    </ion-content>  
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonContent, IonInput } from "@ionic/vue";
import { useLoginStore } from "../stores/login";
import axios from 'axios';

export default {
  components: { IonPage, IonButton, IonContent, IonInput },
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
    
/* 
        if(usu.dni == this.usuario.dni &&  usu.password == this.usuario.password) {
            console.log('Encontrado')
        }
        else {
          console.log('Error: No encontrado')

        } */



        
       /*  if (this.usuario.dni=="987654321" && this.usuario.password=="123456") {
          this.login( { dni: this.usuario.dni, permissions: [] } )
          this.$router.push('home')
        } else if (this.usuario.dni=="123456789" && this.usuario.password=="123456") {
          this.login( { dni: this.usuario.dni, permissions: ['config'] } )
          this.$router.push('config') 
          } else {
          alert('Credenciales incorrectas')
        }    */
    }
  }
};
</script>

<style>
</style>