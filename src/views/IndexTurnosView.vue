<template>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col size-lg="3" size-sm="12">
        </ion-col>
        <ion-col size-lg="6" size-sm="12">

          <ion-button class="button-50" v-if="!isAdmin" @click="misTurnos">Mis turnos</ion-button>
          <ion-button class="button-50" v-if="isAdmin" @click="listarTurnos">Listar turnos</ion-button>
          <ion-button v-if="isAdmin" class="button-50" @click="mostarForm">Agregar turno</ion-button>
          <ion-button v-show="!mostrar" class="button-50" @click="mostarForm">Sacar turno</ion-button>
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
        <ion-col size-lg="2" size-sm="0"></ion-col>
      </ion-row>
    </ion-grid>


    <ion-grid>
      <ion-row v-if="this.mostrarTurnos">
        <ion-col size-lg="3" size-sm="12"> </ion-col>
        <ion-col size-lg="2" size-sm="12"><ion-text color="tertiary"><i>ID: DNI: Servicio: Profesional:</i></ion-text>
        </ion-col>
        <ion-col size-lg="1" size-sm="12"><ion-text color="tertiary"> Fecha y hora: </ion-text></ion-col>
        <ion-col size-lg="2" size-sm="12">Estado:</ion-col>
        <ion-col size-lg="3" size-sm="12"></ion-col>
      </ion-row>
      <ion-row>
        <ion-col size-lg="3" size-sm="12"> </ion-col>
        <ion-col size-lg="6" size-sm="12">
          <ion-list lines="full" v-for="e in turnos" :key="e.id">
            <ion-item color="medium">
              {{ e.id }} {{ e.dniUsuario }} {{ e.idServicio }} {{ e.dniProfesional }} {{ e.fechaHora }} {{ e.estado }}
              <ion-button size="small" id="present-alert" class="button-modificar"
                @click="confirmarEliminacion(e.id)">Eliminar</ion-button> <!-- //id="delete-toast" -->


              <ion-alert ref="Alert" trigger="present-alert" header="Esta seguro que desea eliminar el turno?" :buttons="alertButtons"
                @didDismiss="setResult($event)" ></ion-alert>

              <ion-toast color="primary" trigger="delete-toast" message="Hasta la vista turno! Lo hemos eliminado"
                :duration="3000" :icon="document"></ion-toast>
              <ion-button size="small" class="button-modificar" @click="redireccionTurno(e.id)">Modificar</ion-button>

            </ion-item></ion-list> </ion-col>

        <ion-col size-lg="2" size-sm="0"></ion-col>
      </ion-row>
    </ion-grid>






  </ion-content>
</template>

<script>
import { IonPage, IonAlert, IonText, IonHeader, IonButton, IonContent, IonList, IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, IonGrid, IonCol, IonRow } from "@ionic/vue";
import turnosService from '../services/turnosService'
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";
import { document } from 'ionicons/icons';
import serviciosService from '../services/serviciosService'
import empleadosService from '../services/empleadosService'
import { ref } from 'vue';



export default {
  components: { IonPage, IonAlert, IonText, IonHeader, IonButton, IonContent, IonList, IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, IonGrid, IonCol, IonRow },
  setup() {
    const handlerMessage = ref('');
    const roleMessage = ref('');
    const store = useLoginStore();
    const { isLogin, isAdmin, user } = storeToRefs(store);

    const alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          handlerMessage.value = 'Alert canceled';
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          handlerMessage.value = 'Alert confirmed';
        },
      },
    ];

    const setResult = (ev) => {
      roleMessage.value = `Dismissed with role: ${ev.detail.role}`;
    };
    return {
      isLogin,
      isAdmin,
      user,
      document,
      handlerMessage,
      roleMessage,
      alertButtons,
      setResult,
    }
  }, mounted() {
    this.listarServicios()
    this.listarEmpleados()
  },
  methods: {
    irAHome() {
      this.$router.push("/");

    }, async listarServicios() {
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
    confirmarEliminacion(idTurno) {
      this.turnoSeleccionado = idTurno;
      console.log(this.turnoSeleccionado)
      this.$refs.alert.present();
    },
    setResult(ev) {
      if (ev.detail.role === 'confirm') {
        this.eliminarTurno(this.turnoSeleccionado);
        console.log(this.turnoSeleccionado)
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
    //ordenarLista() {
    //this.lista.sort((a, b) => a.id - b.id);
    // },

    ///servicios/:id delete
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
        this.turnos = todosTurnos.filter(elemento => elemento.dniUsuario == this.user.dni)
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
        console.log("seteo en false")
        this.mostar = false;
      } else {
        console.log("seteo en true")
        this.mostrar = true;
      }


    },
    ocultar() {
      console.log('estoy intentando ocultar')
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
</style>
