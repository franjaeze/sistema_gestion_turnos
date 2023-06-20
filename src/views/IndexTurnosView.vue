<template>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col size-lg="3" size-xs="12">
        </ion-col>
        <ion-col size-lg="6" size-xs="12">

          <ion-button class="button-50" id="grande" v-if="!isAdmin" @click="misTurnos">Mis turnos</ion-button>
          <ion-button class="button-50" v-if="isAdmin" @click="listarTurnos">Listar turnos</ion-button>
          <ion-button v-if="isAdmin" class="button-50" @click="mostarForm">Agregar turno</ion-button>
          <ion-button v-show="!mostrar"  v-if="!isAdmin" class="button-50" @click="mostarForm">Sacar turno</ion-button>
          <ion-button v-show="mostrar" class="button-50" @click="mostrar = !mostrar">Cancelar</ion-button>
          <ion-button class='button-50' @click="irAHome">Ir a home</ion-button>


          <ion-list class="lista" v-show="mostrar">


            <ion-input class="margin3" v-model="turnoSeleccionado.dniUsuario" color="warning" fill="outline"
              label-placement="floating" label="DNI" required="true"> </ion-input>

            <ion-select class="margin3" v-model="turnoSeleccionado.idServicio" interface="popover" label="Servicio"
              placeholder="Servicio" color="warning" fill="outline" required="true">
               <ion-select-option v-for="e in servicios" :value="e.nombre"> {{ e.nombre }}</ion-select-option>
              <!--  <ion-select-option value="Pedicura">Pedicura</ion-select-option>
        <ion-select-option value="Masajes">Masajes</ion-select-option> -->
            </ion-select>

            <!-- <ion-input  v-model="turnoSeleccionado.dniProfesional" color ="warning" label-placement="floating"  fill="outline" label="Profesional" ></ion-input> -->

            <ion-select class="margin3" v-model="turnoSeleccionado.dniProfesional" interface="popover" label="Profesional"
              placeholder="Profesional" color="warning" fill="outline" required="true">
              <ion-select-option v-for="e in empleados" :value="e.nombre"> {{ e.nombre }} {{ e.apellido
              }}</ion-select-option>
              <!--     <ion-select-option value="Natalia Lobos">Natalia Lobos</ion-select-option>
              <ion-select-option value="Juana Di Arcquette">Juana Di Arcquett</ion-select-option> -->
            </ion-select>

            <section class="centrado"><ion-datetime class="datetime" v-model="turnoSeleccionado.fechaHora"
                presentation="date-time" :prefer-wheel="true" color="danger" label-placement="floating" fill="outline"
                type="datetime-local" label="Fecha y hora del turno" locale="es-ES" minute-values="0,15,30,45"
                day-values="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31"
                hour-values="9,10,11,12,13,14,15,16,17,18" required="true">
                <span slot="title">Eliga dia de la reserva</span></ion-datetime></section>
            <!-- <ion-input  v-model="turnoSeleccionado.fechaHora" color ="warning" label-placement="floating" fill="outline" type="datetime-local" label="Fecha y hora del turno" ></ion-input> -->
            <ion-input class="margin3" v-model="turnoSeleccionado.estado" color="warning" label-placement="floating"
              fill="outline" label="Estado del turno" placeholder="Disponible" value="Disponible" readonly></ion-input>
            <ion-button class="button-50" id="open-toast" @click="agregarALista">Agregar turno</ion-button>
            <ion-toast color="primary" trigger="open-toast" message="Genial! Turno reservado" :duration="3000"
              :icon="document"></ion-toast>

          </ion-list>

        </ion-col>
        <ion-col size-lg="2" size-xs="0"></ion-col>
      </ion-row>
    </ion-grid>


    <ion-grid>
         <ion-row>
        <ion-col size-lg="3" size-xs="12"> </ion-col>
        <ion-col size-lg="6" size-xs="12">
          <ion-item lines="full" v-for="e in turnos" :key="e.id">
         

              <ion-card class="carta" color="medium">
                <ion-card-header>
                  <ion-card-title class="fecha">Fecha  {{ e.fechaHora }}</ion-card-title>
                  <ion-card-subtitle>Dni <b>{{ e.dniUsuario }}</b></ion-card-subtitle>
                </ion-card-header> <span class="ident"></span> Servicio de <b>{{ e.idServicio }}</b> con <b>{{ e.dniProfesional }}</b>
              
                <ion-card-content>
                   Reserva <b>{{ e.id }} </b> Estado es <b>{{ e.estado }}</b>
                </ion-card-content>
                <ion-button   size="small" id="delete-toast" class="button-modificar" @click="eliminarTurno(e.id)">

                  <p v-if="devWidth > 576">Eliminar</p>

                  <ion-icon :icon="trash" :size="devWidth > 576 ? 'small' : 'large'" aria-label="Eliminar"
                    color="danger"></ion-icon>
         
                </ion-button>
                <ion-toast color="primary" trigger="delete-toast" message="Hasta la vista turno! Lo hemos eliminado"
                  :duration="3000" :icon="document"></ion-toast>


                <ion-button  size="small" class="button-modificar" @click="redireccionTurno(e.id)">

                  <p v-if="devWidth > 576">Modificar</p>
                  <ion-icon :icon="build" aria-label="Modificar" :size="devWidth > 576 ? 'small' : 'large'"
                    color="danger"></ion-icon>
                </ion-button>
          
              </ion-card>



         <!--      <p> {{ e.id }} </p>
              <p> {{ e.dniUsuario }} </p>
              {{ e.idServicio }}
              {{ e.dniProfesional }}
              <b> {{ e.fechaHora }}</b>
              {{ e.estado }}
              <ion-button size="small" id="present-alert" class="button-modificar" @click="confirmarEliminacion(e.id)">

                <p v-if="devWidth > 576">Eliminar</p>

                <ion-icon :icon="trash" :size="devWidth > 576 ? 'small' : 'large'" aria-label="Eliminar"
                  color="danger"></ion-icon>


              </ion-button>  


              <ion-alert ref="Alert" trigger="present-alert" header="Esta seguro que desea eliminar el turno?"
                :buttons="alertButtons" @didDismiss="setResult($event)"></ion-alert>

              <ion-toast color="primary" trigger="delete-toast" message="Hasta la vista turno! Lo hemos eliminado"
                :duration="3000" :icon="document"></ion-toast>


              <ion-button size="small" class="button-modificar" @click="redireccionTurno(e.id)">

                <p v-if="devWidth > 576">Modificar</p>
                <ion-icon :icon="build" aria-label="Modificar" :size="devWidth > 576 ? 'small' : 'large'"
                  color="danger"></ion-icon>
              </ion-button> -->

          </ion-item> </ion-col>

        <ion-col size-lg="2" size-xs="0"></ion-col>
      </ion-row>
    </ion-grid>






  </ion-content>
</template>

<script>
import { IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonAlert, IonText, IonHeader, IonButton, IonContent, IonList, IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, IonGrid, IonCol, IonRow } from "@ionic/vue";
import turnosService from '../services/turnosService'
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";
import { document } from 'ionicons/icons';
import serviciosService from '../services/serviciosService'
import empleadosService from '../services/empleadosService'
import { ref } from 'vue';
import { trash, person, build } from 'ionicons/icons'



export default {
  components: { IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonAlert, IonText, IonHeader, IonButton, IonContent, IonList, IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, IonGrid, IonCol, IonRow },
  setup() {

    const store = useLoginStore();
    const { isLogin, isAdmin, user } = storeToRefs(store);

   
    return {
      isLogin,
      isAdmin,
      user,
      document,
      devWidth: 0,
      person, trash, build
    }
  },
  mounted() {
    this.listarServicios()
    this.listarEmpleados()
    this.devWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    irAHome() {
      this.$router.push("/");

    }, handleResize() {
      this.devWidth = window.innerWidth;
    },
    async listarServicios() {
      try {
        this.servicios = await serviciosService.listarServicios()

      } catch (e) {
        alert("Se produjo un error");
      }
    }, async listarEmpleados() {
      try {
        this.empleados = await empleadosService.listarEmpleados()

      } catch (e) {
        alert("Se produjo un error");
      }
    },
       
    async agregarALista() {

      try {

        await turnosService.agregarALista(this.turnoSeleccionado)
        await this.misTurnos()
        this.turnoSeleccionado = { estado: "Disponible" }

        this.mostrar = false; // ver porque no me funcionaba poniendo el metodo ocultar() aqui
      } catch (e) {
        alert(e);
      }
    },
 
    async listarTurnos() {
      try {

        this.turnos = await turnosService.listarTurnos()

      } catch (e) {
        alert("Se produjo un error");
      }
    },
    async misTurnos() {

      try {


        const todosTurnos = await turnosService.listarTurnos()
        this.turnos =  todosTurnos.filter(elemento => elemento.dniUsuario == this.user.dni)
        this.mostrarTurnos = true;

      } catch (e) {
        alert("Se produjo un error");
      }
    },

    async eliminarTurno(id) {
      try {

        await turnosService.eliminarTurno(id)
        await this.misTurnos();
      } catch (e) {
        alert("Se produjo un error");
      }
    },

    redireccionTurno(id) {
      this.$router.push({
        name: "ModificacionTurno",
        params: {
          id: id,
        }
      }
      );
    },
    mostarForm() {
      if (this.mostrar == true) {
       
        this.mostar = false;
      } else {
       
        this.mostrar = true;
      }


    },
    ocultar() {
     
      this.mostrar = false;
    },

    async modificarTurno(id) {
      try {

        const turno = { ...this.turno }
        await turnosService.modificarTurno(id, turno)
        await this.listarTurnos();
        this.turno = {}
      } catch (e) {
        alert("Se produjo un error");
      }
    },

  },
  data() {
    return {
      turnos: [],
      turno: {},
      mostrarTurnos: false,
      ocultar: false,
      admin: false,
      mostrar: false,
      servicios: [],
      empleados: [],
      turnoSeleccionado: { estado: "Disponible" },
    };
  },

};

</script>

<style>
.centrado {
  display: flex;
  justify-content: center;
  align-items: center;

}

.margin3 {

  margin: 3px
}

.lista {
  background-color: var(--ion-color-light-tint);
  --background-rgb: 255, 241, 242;
  margin-bottom: 10px;
  border-radius: 16px;
  box-shadow: rgba(139, 139, 139, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #c3c3c4 0 -3px 0 inset;
  transition: box-shadow .15s, transform .15s;
  will-change: box-shadow, transform;
  touch-action: manipulation;
}

.datetime {
  --background: #fff1f2;
  --background-rgb: 255, 241, 242;
  margin-bottom: 10px;
  border-radius: 16px;
  box-shadow: rgba(139, 139, 139, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #c3c3c4 0 -3px 0 inset;
  transition: box-shadow .15s, transform .15s;
  will-change: box-shadow, transform;
  touch-action: manipulation;
}



.fecha{
  text-shadow: #553a00;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
