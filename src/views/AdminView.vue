<template>
  <ion-page>
    <ion-content>

      <ion-grid class="">
        <ion-row>
          <ion-col size-lg="3" size-xs="12">
          </ion-col>
          <ion-col size-lg="6" size-xs="12">

            <ion-button class="button-50" v-show="!admin" @click="mostrarForm">Agregar Empleado </ion-button>
            <ion-button class="button-50" v-show="!admin" @click="mostrarEmpleados">Listar Empleados</ion-button>
            <ion-button v-show="mostrar" class="button-50" @click="mostrar = !mostrar">Cancelar</ion-button>

            <ion-button class='button-50' @click="irAHome">Ir a home</ion-button>

            <!--     FORM PARA AGREGAR EMPLEADOS  ----->

            <ion-list class="lista" v-show="this.mostrar">
              <ion-input class="margin3" v-model="empleadoNuevo.nombre" color="warning" fill="outline"
                label-placement="floating" label="nombre" required="true"> </ion-input>
              <ion-input class="margin3" v-model="empleadoNuevo.apellido" color="warning" fill="outline"
                label-placement="floating" label="apellido" required="true"> </ion-input>
              <ion-input class="margin3" v-model="empleadoNuevo.dni" color="warning" fill="outline"
                label-placement="floating" label="DNI" required="true"> </ion-input>
              <ion-input class="margin3" v-model="empleadoNuevo.telefono" color="warning" fill="outline"
                label-placement="floating" label="telefono" required="true"> </ion-input>


              <section class="centrado">
                <ion-datetime class="datetime" v-model="empleadoNuevo.fechaNacimiento"
                  presentation="day-month-year" :prefer-wheel="true" color="danger" label-placement="floating"
                  fill="outline" type="datetime" label="Fecha de nacimiento"  required="true">
                  <span slot="title">Fecha de Nacimiento</span>
                </ion-datetime></section>

              <ion-input class="margin3" v-model="empleadoNuevo.email" color="warning" fill="outline"
                label-placement="floating" label="email" required="true"> </ion-input>

              <ion-select class="margin3" v-model="empleadoNuevo.tipoServicio" interface="popover" label="Servicio"
                placeholder="Servicio" color="warning" fill="outline" required="true" :multiple="true">
                <ion-select-option v-for="e in servicios" :value="e.nombre"> {{ e.nombre }}
                </ion-select-option>
              </ion-select>

              <ion-button class="button-50" @click="agregarALista">Agregar Empleado</ion-button>
              <ion-button class="button-50" @click="mostrarForm">Cancelar</ion-button>
            </ion-list>

            <!--     LISTAR EMPLEADOS ----->

            <ion-item lines="full" v-for="e in empleados" :key="e.dni">
              <ion-card class="carta" color="medium">
                <ion-card-header>
                  <ion-card-title> {{ e.nombre }} {{ e.apellido }}</ion-card-title>
                  <ion-card-subtitle> <b>Dni</b> {{ e.dni }} <b>email: </b>{{ e.email }} </ion-card-subtitle>
                </ion-card-header><span class="ident"></span><b>Ingreso </b>{{ e.fechaIngreso }}
                <b>Fecha de nacimento</b> {{ e.fechaNacimiento }}

                <ion-card-content><b>Servicios que realiza:</b>
                  <ion-text v-for="t in e.tipoServicio" :key="e.tipoServicio"> - {{ t }}<p>. </p> </ion-text>
                </ion-card-content>
                <ion-button size="small" id="present-alert" class="button-modificar" @click="eliminarEmpleado(e.id)">
                  Eliminar
                </ion-button>
                <ion-button size="small" class="button-modificar" @click="">
                  Modificar

                </ion-button>

              </ion-card>

            </ion-item>



          </ion-col>
          <ion-col size-lg="2" size-xs="0"></ion-col>
        </ion-row></ion-grid>

    </ion-content>
  </ion-page>
</template>
  
<script>
import { IonPage, IonCard, IonText, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSelect, IonSelectOption, IonInput, IonDatetime, IonButton, IonContent, IonList, IonItem, IonCol, IonGrid, IonRow } from "@ionic/vue";
import { useLoginStore } from "../stores/login";
import { storeToRefs } from "pinia";
import usuariosService from '../services/usuariosService'
import serviciosService from '../services/serviciosService'
import empleadosService from '../services/empleadosService'

export default {
  components: { IonPage, IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonContent, IonList, IonItem, IonCol, IonGrid, IonRow, IonSelect, IonSelectOption, IonInput, IonDatetime, },
  setup() {
    const store = useLoginStore();
    const { user } = storeToRefs(store);
    const { logout } = store;
    return { logout, user };
  }, data() {
    return {

    }
  },
  mounted() {
    this.listarServicios()
    this.listarEmpleados()
  },
  methods: {
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

        await empleadosService.agregarAListaEmpleados(this.empleadoNuevo)

        this.empleadoNuevo = { estado: "Activo", fechaIngreso: new Date().toLocaleDateString('en-US') }
        console.log(this.empleadoNuevo)
        this.mostrarForm(); // ver porque no me funcionaba poniendo el metodo ocultar() aqui
      } catch (e) {
        alert(e);
      }
    },
    mostrarForm() {

      this.mostrar = !this.mostrar;
    },
    mostrarEmpleados() {

      this.mostrarLista = !this.mostrarLista;
    }, 
      async eliminarEmpleado(id) {
      try {
        console.log(id)
        await empleadosService.eliminarEmpleado(id)
        this.listarEmpleados();
       
      } catch (e) {
        alert("Se produjo un error");
      }

    }
  },
  data() {
    return {
      mostrarEmpleados: false,
      ocultar: false,
      admin: false,
      mostrar: false,
      mostrarLista: false,
      servicios: [],
      empleados: [],
      empleadoNuevo: { estado: "Activo", fechaIngreso: new Date().toLocaleDateString('en-US') },
    };
  }

}
  ;
</script>
  
<style>
.ident{
  margin-left: 15px;
}

</style>
  