<template>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col size-lg="3" size-xs="12">
        </ion-col>
        <ion-col size-lg="6" size-xs="12">

          <!--         TODOS LOS BOTONES DE ARRIBA -->

          <ion-button class="button-50" id="grande" v-if="!isAdmin" @click="misTurnos">Mis
            turnos</ion-button>
          <ion-button class="button-50" v-if="isAdmin" @click="listarTurnos">Listar turnos</ion-button>
          <ion-button v-if="isAdmin" class="button-50" @click="mostrarForm">Agregar turno</ion-button>
          <ion-button v-show="!mostrar" v-if="!isAdmin" class="button-50" @click="mostrarForm">Sacar turno</ion-button>
          <ion-button v-show="mostrar" class="button-50" @click="mostrar = !mostrar">Cancelar</ion-button>
          <ion-button class='button-50' @click="irAHome">Ir a home</ion-button>

          <ion-list class="lista" v-show="mostrar">

              <!--     COMPONENTE FORMULARIO TURNO  -->
            <FormularioTurno :turnoSeleccionado="turnoSeleccionado"
                             :empleados="empleados"
                             :servicios="servicios"
              @agregar-a-lista="agregarALista" />

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

                        <!--               LISTADO DE TURNOS  -->
            <ion-card class="carta" color="medium">
              <ion-row>
                <ion-col size="11">
                  <ion-card-header>
                    <ion-card-title class="fecha">Fecha: <p class="fecha" v-if="e.fechaHora != undefined">{{
                      presentarFecha(e.fechaHora) }}</p>
                    </ion-card-title>
                    <ion-card-subtitle>Dni <b>{{ e.dniUsuario }}</b></ion-card-subtitle>
                  </ion-card-header> <span class="ident"></span> Servicio de <b>{{ e.idServicio }}</b> con <b>{{
                    e.dniProfesional }}</b>

                  <ion-card-content>
                    Reserva <b>{{ e.id }} </b> Estado es <b>{{ e.estado }}</b>
                  </ion-card-content>
                </ion-col>
                <ion-col size="1" style="align-self: flex-end">            <!--   BOTONES DEL FORMULARIO -->
                    <div class="iconAlinment">
                  <span class="cursor" id="delete-toast" @click="eliminarTurno(e.id)"> <ion-icon :icon="trash"
                      :size="devWidth > 576 ? 'small' : 'large'" aria-label="Eliminar" color="danger"></ion-icon> </span>

                  <ion-toast color="primary" trigger="delete-toast" message="Hasta la vista turno! Lo hemos eliminado"
                    :duration="3000" :icon="document"></ion-toast>

                  <span class="cursor" @click="redireccionTurno(e.id)"><ion-icon :icon="build" aria-label="Modificar"
                      :size="devWidth > 576 ? 'small' : 'large'" color="danger"></ion-icon></span></div>
                </ion-col>
              </ion-row>
            </ion-card>
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
import FormularioTurno from "../components/FormularioTurno.vue";
import { trash, person, build } from 'ionicons/icons'
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from 'vue-router'


export default {
  components: { FormularioTurno, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonAlert, IonText, IonHeader, IonButton, IonContent, IonList, IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, IonGrid, IonCol, IonRow },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useLoginStore();
    const { isLogin, isAdmin, user } = storeToRefs(store);
    const documentIcon = document;
    let devWidth = ref(0);
    const personIcon = person;
    const trashIcon = trash;
    const buildIcon = build;
    const servicios = ref([]);
    const empleados = ref([]);
    const mostrar = ref(false);
    const turnos = ref([]);
    const turno = ref({});
    const disabled = ref(false);
    const turnoSeleccionado = ref({ estado: "Disponible" })

 
 
    onMounted(() => {
      listarServicios()
      listarEmpleados()
      devWidth = window.innerWidth;
      window.addEventListener('resize', handleResize);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    })

    const irAHome = () => {
       router.push("/")
    };

    const handleResize = () => {
      devWidth = window.innerWidth
    };


    

    const listarServicios = async () => {
      try {
        servicios.value = await serviciosService.listarServicios()

      } catch (e) {
        alert("Se produjo un error al listar servicios");
      }
    };


    const listarEmpleados = async () => {
      try {
        empleados.value = await empleadosService.listarEmpleados()

      } catch (e) {
        alert("Se produjo un error al listar empleados");
      }
    };

    const presentarFecha = (fechaCurda) => {
      const fecha = fechaCurda.replace(/T.*/, '').split('-').reverse().join('-')
      const hora = fechaCurda.split('T')[1].substring(0, 5)
      const fechahora = fecha + " " + hora
      return fechahora
    };

    const agregarALista = async (turnoNuevo) => {
 
      try {
        if (!isAdmin.value) {
          turnoNuevo.dniUsuario = user.value.dni
        }
        turnoNuevo.estado = "Asignado";
        await turnosService.agregarALista(turnoNuevo)
        turnoNuevo = {};
        await misTurnos()
        mostrar.value = !mostrar.value
      } catch (e) {
        alert(e);
      }
    };
   
    const listarTurnos = async () => {
      try {
        turnos.value = await turnosService.listarTurnos()
      } catch (e) {
        alert("Se produjo un error en listar turnos");
      }
    };

    const misTurnos = async () => {
      try {
        const todosTurnos = await turnosService.listarTurnos()
        turnos.value = todosTurnos.filter(elemento => elemento.dniUsuario == user.value.dni)
        console.log('pasa x linea 186')
   
    /*     warnDisabled(); */

      } catch (e) {
        alert("Se produjo un error en mis turnos");
      }
    };

    const eliminarTurno = async (id) => {
      try {
        await turnosService.eliminarTurno(id)
        if (isAdmin) {
          await listarTurnos();
        } else {
          await misTurnos();
        
        }
      } catch (e) {
        alert("Se produjo un error al eliminar turno");
      }
    };

     let redireccionTurno = (id) => {
      router.push({
        name: "ModificacionTurno",
        params: {
          id: id,
        }
      }
      )
    };
    const mostrarForm = () => {

      if (mostrar.value == true) {

        mostrar.value = false;
      } else {

        mostrar.value = true;
      }
    };

    const modificarTurno = async (id) => {
      try {
        const turno = { ...turno }
        await turnosService.modificarTurno(id, turno)
        await listarTurnos();
        turno = {}
      } catch (e) {
        alert("Se produjo un error al modificar turno");
      }
    };


    const warnDisabled = () => {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    }

   

    return {
      isLogin,
      isAdmin,
      user,
      document,
      devWidth,
      person, trash, build,
      presentarFecha,
      listarEmpleados,
      listarServicios,
      handleResize,
      irAHome,
      modificarTurno,
      mostrarForm,
      redireccionTurno,
      eliminarTurno,
      misTurnos,
      listarTurnos,
      agregarALista,
      warnDisabled,
      turnos,
      turno,
      mostrar,
      servicios,
      empleados,
      disabled,
      turnoSeleccionado,

    }
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



.fecha {
  text-shadow: #553a00;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}



.cursor {
  cursor: pointer;

}

.fecha {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-left: 8px;
  color: #f23514bb;
}
.iconAlinment {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}
</style>
