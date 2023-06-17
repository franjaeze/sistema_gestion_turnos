<template>
    <ion-page>
      <ion-content >
        sadasdasd   
     <ion-grid class="espacio">
      <ion-row>
        <ion-col size-lg="3" size-sm="12">
        </ion-col>
        <ion-col size-lg="6" size-sm="12">

          <ion-button class="button-50" v-show="!admin" @click="misTurnos">Agregar </ion-button>
          <ion-button class="button-50" v-show="!admin" @click="listarTurnos">Listar turnos</ion-button>
          <ion-button v-show="!mostrar" class="button-50" @click="mostarForm">Agregar turno</ion-button>
          <ion-button v-show="mostrar" class="button-50" @click="mostrar = !mostrar">Cancelar</ion-button>
          <ion-button class='button-50' @click="irAHome">Ir a home</ion-button>

        </ion-col>
        <ion-col size-lg="2" size-sm="0"></ion-col>
      </ion-row></ion-grid>

    </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonButton, IonContent,IonList,IonItem,IonCol,IonGrid,IonRow } from "@ionic/vue";
  import { useLoginStore } from "../stores/login";
  import { storeToRefs } from "pinia";
  import usuariosService from '../services/usuariosService'
  
  export default {
    components: { IonPage, IonButton, IonContent,IonList,IonItem,IonCol,IonGrid,IonRow },
    setup() {
      const store = useLoginStore();
      const { user } = storeToRefs(store);
      const { logout } = store;
      return { logout, user };
    },data(){
    return{
       
      }
  },
  methods:{ 
  }
  
    }
  ;
  </script>
  
  <style>
  </style>
  