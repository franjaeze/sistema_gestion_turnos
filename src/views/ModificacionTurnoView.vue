<template>
  <ion-page>
    <ion-content>

      <ion-item>
        <ion-list>
          <ion-input v-model="turnoModificado.id" label="Id" color="warning" :value="turnoSeleccionado.id"
            readonly></ion-input>
          <ion-input v-model="turnoModificado.dniUsuario" color="warning" label="DNI" fill="outline"
            :value="turnoModificado.dniUsuario"></ion-input>
          <!-- <ion-input v-model="turnoModificado.dniEmpleadoRegistro" color="warning" label="Empleado registró" fill="outline" :value="turnoModificado.dniEmpleadoRegistro" readonly></ion-input> -->
          <ion-select v-model="turnoModificado.idServicio" interface="popover" label="Servicio" placeholder="Servicio"
            color="warning" fill="outline" :value="turnoModificado.idServicio">
            <ion-select-option v-for="e in servicios" :value="e.nombre"> {{ e.nombre }}</ion-select-option>
          </ion-select>
          <ion-select v-model="turnoModificado.dniProfesional" interface="popover" label="Profesional"
            placeholder="Profesional" color="warning" fill="outline">
            <ion-select-option v-for="e in empleados" :value="e.nombre"> {{ e.nombre }} {{ e.apellido
              }}</ion-select-option>
          </ion-select>
          <ion-input v-model="turnoModificado.fechaHora" color="warning" label="Fecha y hora del turno" fill="outline"
            type="datetime-local"></ion-input>
          <ion-input v-model="turnoModificado.estado" color="warning" label="Estado del turno" fill="outline"
            :value="turnoModificado.estado" placeholder="Disponible" readonly></ion-input>
        </ion-list>

      </ion-item>

      <ion-button class="button-50" id="modificar-toast" @click="modificarTurno(this.turnoModificado.id)">Modificar</ion-button>
      <ion-toast   color="primary" trigger="modificar-toast" message="Hemos tomado nota!" :duration="3000" :icon="document"></ion-toast>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonButton, IonContent, IonInput, IonSelect, IonList, IonItem, IonSelectOption,IonToast } from "@ionic/vue";
import axios from "axios";
import turnosService from "../services/turnosService";
import { document } from 'ionicons/icons';
import serviciosService from '../services/serviciosService'
import empleadosService from '../services/empleadosService'

export default {
  components: { IonPage, IonButton, IonContent, IonInput, IonSelect, IonList, IonItem, IonSelectOption,IonToast },
  
  setup() {
   return {
     document
   }
 },
  data() {
    return {
      statementIsTrue: true,
      idTurno: this.$route.params.id,
      servicios: [],
      empleados: [],  
      turnoSeleccionado: { dniUsuario: "", idServicio: "", dniProfesional: "", fechaHora: "", estado: "" },
      turnoModificado: { dniUsuario: "", idServicio: "", dniProfesional: "", fechaHora: "", estado: "" },
    };
  },


  async mounted() {
   this.listarServicios(),
    this.listarEmpleados(),
    (this.turnoSeleccionado.id = this.$route.params.id),
      await this.actualizarInfo(this.turnoSeleccionado.id);
      console.log(this.turnoSeleccionado)
  },

  methods: {
    async actualizarInfo(id) {
      const response = await axios.get("https://646beae07b42c06c3b2a949b.mockapi.io/turnos");
      this.turnoSeleccionado = response.data.filter(elemento => elemento.id === this.idTurno)[0];
      this.turnoModificado = { ...this.turnoSeleccionado }
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
    async modificarTurno(id) {
      try {
        console.log(id);
        console.log("Entra a modificar");
        console.log(this.turnoModificado);
        await turnosService.modificarTurno(id, this.turnoModificado);
        this.$router.push('/indexTurnos')
      } catch (e) {
        alert("Se produjo un error");
      }
    },
  },
};
</script>


<style></style>