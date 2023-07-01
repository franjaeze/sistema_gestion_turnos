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
            <ion-button class="button-50" v-if="isAdmin && !mostrar" @click="mostrarForm">Agregar Servicio
            </ion-button>


            <!--     FORM PARA AGREGAR SERVICIO  ----->

            <ion-list class="lista" v-show="this.mostrar">
              <h1> Agregar Servicio</h1>
              <ion-input class="margin3" v-model="servicioNuevo.nombre" color="warning" fill="outline"
                label-placement="floating" label="nombre" required="true"> </ion-input>
              <ion-select class="margin3" v-model="servicioNuevo.duracion" color="warning" fill="outline"
                label-placement="floating" label="duracion" required="true">
                <ion-select-option value="30">30 min</ion-select-option>
                <ion-select-option value="45">45 min</ion-select-option>
                <ion-select-option value="60">60 min</ion-select-option>
              </ion-select>
              <ion-input class="margin3" v-model="servicioNuevo.valor" color="warning" fill="outline"
                label-placement="floating" label="valor" required="true"> </ion-input>
              <ion-input class="margin3" v-model="servicioNuevo.detalle" color="warning" fill="outline"
                label-placement="floating" label="detalle" required="true"> </ion-input>

              <ion-select class="margin3" v-model="servicioNuevo.tipoServicio" interface="popover" label="Servicio"
                placeholder="Servicio" color="warning" fill="outline" required="true">
                <ion-select-option value="masaje">Masaje</ion-select-option>
                <ion-select-option value="tratamiento">Tratamiento</ion-select-option>
                <ion-select-option value="manicura">Manicura</ion-select-option>
              </ion-select>

              <ion-button class="button-50" @click="agregarALista">Agregar Servicio</ion-button>
              <ion-button class="button-50" @click="mostrarForm">Cancelar</ion-button>

            </ion-list>


            <!--  LISTAR SERVICIOS -->
            <div v-if="loading" class="center"> <h1> Cargando Servicios</h1>
            <ion-item  >
              <ion-spinner   name="lines-sharp"></ion-spinner>                  
            </ion-item></div>

            <div v-else>
            <ion-card  v-for="e in servicios" :key="e.tipoServicio" >
              <ion-card-content><ion-card-title> {{ e.nombre }} </ion-card-title>

                {{ e.detalle }}
                <ion-card-subtitle color="danger"> Valor: <b>{{ e.valor }}</b> Duracion: <b>{{ e.duracion }}</b>
                  <div class="alinearIconos" v-if="isAdmin">
                    <span class="cursor" @click="eliminarServicio(e.id)">
                      <ion-icon size="large" :icon="trash" aria-label="Eliminar" color="danger"></ion-icon>
                    </span>

                    <span class="cursor" @click="redireccionTurno(e.id)">
                      <ion-icon size="large" :icon="build" aria-label="Modificar" color="danger"></ion-icon>
                    </span>

                  </div>

                </ion-card-subtitle>
              </ion-card-content>

            </ion-card>
          </div>

          </ion-col>
          <ion-col size-lg="2" size-sm="0"></ion-col>
        </ion-row>
      </ion-grid>
    </ion-content></ion-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";
import { trash, build } from 'ionicons/icons';
import serviciosService from '../services/serviciosService'
import { IonPage,IonSpinner, IonIcon, IonContent, IonSelect, IonSelectOption, IonInput, IonGrid, IonCol, IonRow, IonButton, IonCard, IonList, IonItem, IonThumbnail, IonLabel, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'
export default {
  components: { IonPage,IonSpinner, IonIcon, IonButton, IonSelect, IonSelectOption, IonInput, IonContent, IonGrid, IonCol, IonRow, IonList, IonCard, IonThumbnail, IonLabel, IonItem, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle }
  , setup() {
    const store = useLoginStore();
    const { isLogin, isAdmin, user } = storeToRefs(store);

    return {
      isLogin,
      isAdmin,
      user,
      trash, build,
     

    };
  },

  data() {
    return {
      masajes: [],
      servicios: [],
      mostrar: false,
      servicioNuevo: { nombre: "", duracion: "", valor: "", detalle: "", tipoServicio: "" },
      page: 1,
      loading:false,

    }
  }, mounted() {
    this.listarServicios()
  },
  methods:
  {
    async listarServicios() {
      this.loading=true
      console.log(this.loading)
      try {
        this.servicios = await serviciosService.listarServicios()
        console.log(this.loading)
      } catch (e) {
        alert("Se produjo un error");
      } finally{
        this.loading=false;
        console.log(this.loading)
      }
    },
    agregarServicio() {
      this.mostrar = false;
      console.log(this.mostrar)
    },

    async eliminarServicio(id) {
      try {
        console.log(id)
        await serviciosService.eliminarServicio(id)
        await this.listarServicios()

      } catch (e) {
        alert("Se produjo un error");
      }

    },
    async agregarALista() {

      try {

        await serviciosService.agregarAListaServicio(this.servicioNuevo)
        this.listarServicios()
        this.mostrarForm(); // ver porque no me funcionaba poniendo el metodo ocultar() aqui

      } catch (e) {
        alert(e);
      }
    },
    mostrarForm() {

      this.mostrar = !this.mostrar;
      console.log(this.mostrar)
    },
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
  transition: all 600ms;
  background-size: cover;
  --background: var(--ion-color-medium)
}



ion-card:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e7e2d6 0 -3px 0 inset;
}

ion-card:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #a28d60 0 -3px 0 inset;
  transform: scale(1.05);


}

ion-card:active {
  box-shadow: #3f3313 0 3px 7px inset;
  transform: translateY(2px);
}

ion-card-title {
  --color: var(--ion-color-warning);
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
 
}
ion-spinner{
  height: 100px;
  width: 100px;
}
.alinearIconos {
  display: flex;



  justify-content: flex-
  
  end;
}
</style>