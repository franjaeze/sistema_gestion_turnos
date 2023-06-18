<template>
  <ion-page>
    <ion-content>

      <ion-grid>
        <ion-row>
          <ion-col size-lg="2" size-xs="12"></ion-col>
          <ion-col size-lg="8" size-xs="12">
            <h1 id="servicioTitulo" class="">Dejate seducir por nuestros increibles servicios </h1>
          </ion-col>
          <ion-col size-lg="2" size-xs="12"></ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-row>
          <ion-col size-lg="2" size-xs="12">
          </ion-col>
          <ion-col size-lg="8" size-xs="12">
            <ion-button class="button-50" v-if="isAdmin" v-show="!mostrar" @click="mostrarForm()">Agregar Servicio
            </ion-button>
            <ion-button class="button-50" v-if="isAdmin" @click="listarTurnos"></ion-button>
            <ion-item v-show="mostrar"> <ion-list class="lista">
                <ion-input class="margin3" v-model="nuevoServicio.nombre" color="warning" fill="outline"
                  label-placement="floating" label="nombre" :required="true"> </ion-input>
                <ion-input class="margin3" v-model="nuevoServicio.duracion" interface="popover" label="duracion"
                  color="warning" fill="outline" :required="true"></ion-input>
                <ion-input class="margin3" v-model="nuevoServicio.valor" interface="popover" label="valor" color="warning"
                  fill="outline" :required="true"> </ion-input>
                <ion-input class="margin3" v-model="nuevoServicio.detalle" color="warning" label-placement="floating"
                  fill="outline" label="detalle"></ion-input>
                <ion-input class="margin3" v-model="nuevoServicio.tipoServicio" color="warning" label-placement="floating"
                  fill="outline" label="tipoServicio"></ion-input>
                <ion-button class="button-50" id="open-toast" @click="agregarServicio()">Agregar servicio</ion-button>
                <ion-col size-lg="2" size-xs="12"></ion-col>
              </ion-list>
            </ion-item>

            <ion-card v-for="e in servicios" :key="e.tipoServicio">
              <ion-card-content><ion-card-title> {{ e.nombre }} </ion-card-title>

                detalle: {{ e.detalle }}
                <ion-card-subtitle color="danger"> Valor: {{ e.valor }} Duracion: {{ e.duracion }}
                  <ion-button class="button-modificar" v-if="isAdmin" @click="listarTurnos">Modificar</ion-button>
                  <ion-button class="button-modificar" v-if="isAdmin" @click="listarTurnos">Eliminar</ion-button>
                </ion-card-subtitle>
              </ion-card-content>

            </ion-card>


          </ion-col>
          <ion-col size-lg="2" size-sm="0"></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content></ion-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";
import serviciosService from '../services/serviciosService'
import { IonPage, IonContent, IonInput, IonGrid, IonCol, IonRow, IonButton, IonCard, IonList, IonItem, IonThumbnail, IonLabel, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
export default {
  components: { IonPage, IonButton, IonInput, IonContent, IonGrid, IonCol, IonRow, IonList, IonCard, IonThumbnail, IonLabel, IonItem, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle }
  , setup() {
    const store = useLoginStore();
    const { isLogin, isAdmin, user } = storeToRefs(store);

    return {
      isLogin,
      isAdmin,
      user,
      mostrar: false
    };
  },

  data() {
    return {
      masajes: [],
      servicios: [],
      nuevoServicio: { nombre: "", duracion: "", valor: "", detalle: "", tipoServicio: "" },
      page: 1
    }
  }, mounted() {
    this.listarServicios()
  },
  methods:
  {
    async listarServicios() {
      try {
        this.servicios = await serviciosService.listarServicios()

      } catch (e) {
        alert("Se produjo un error");
      }
    },
    mostrarForm() {
      this.mostrar = true;
      console.log(this.mostrar)
    },
    agregarServicio() {
      this.mostrar = false;
      console.log(this.mostrar)
    }
  }

}




</script>

<style>
#servicioTitulo {
  color: #fff;
  font-family: 'freight-big-pro';
  font-size: 50px;
  font-weight: normal;
  letter-spacing: -4px;
  overflow-wrap: break-world;
}

ion-card {
  margin: 20px, 40px, 40px, 40px;
  --background: var(--ion-color-medium)
}

ion-card:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e7e2d6 0 -3px 0 inset;
}

ion-card:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #a28d60 0 -3px 0 inset;
  transform: translateY(-2px);
}

ion-card:active {
  box-shadow: #3f3313 0 3px 7px inset;
  transform: translateY(2px);
}

ion-card-title {
  --color: var(--ion-color-warning);
}
</style>