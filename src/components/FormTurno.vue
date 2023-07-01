<template>
 

        <div v-if="isAdmin">
            <ion-input class="margin3" v-model="turnoSeleccionado.dniUsuario" color="warning" fill="outline"
                label-placement="floating" label="DNI" required="true"> </ion-input>
        </div>

        <ion-select class="margin3" v-model="turnoSeleccionado.idServicio" interface="popover" label="Servicio"
            placeholder="Servicio" color="warning" fill="outline" required="true">
            <ion-select-option v-for="e in servicios" :value="e.nombre"> {{ e.nombre }}</ion-select-option>
        </ion-select>

        <ion-select class="margin3" v-model="turnoSeleccionado.dniProfesional" interface="popover" label="Profesional"
            placeholder="Profesional" color="warning" fill="outline" required="true">
            <ion-select-option v-for="e in empleados" :value="e.nombre">
             {{ e.nombre }} {{ e.apellido}}
        </ion-select-option>
        </ion-select>

        <section class="centrado">
            <ion-datetime class="datetime" v-model="turnoSeleccionado.fechaHora"
                presentation="date-time" :prefer-wheel="true" color="danger" label-placement="floating" fill="outline"
                type="datetime-local" label="Fecha y hora del turno" locale="es-ES" minute-values="0,15,30,45"
                day-values="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31"
                hour-values="9,10,11,12,13,14,15,16,17,18" required="true">
                <span slot="title">Eliga dia de la reserva</span>
            </ion-datetime>
            </section>
       
            <ion-input class="margin3" v-model="turnoSeleccionado.estado" color="warning" label-placement="floating"
            fill="outline" label="Estado del turno" placeholder="Disponible" value="Disponible" readonly>
            </ion-input>
      
            <ion-button class="button-50" id="open-toast" @click="agregarALista">Agregar turno
            </ion-button>
            <ion-button class="button-50" @click="prueba">a ver si llega
            </ion-button>
            <ion-toast color="primary" trigger="open-toast" message="Genial! Turno reservado" :duration="3000"
            :icon="document">
            </ion-toast>
 
</template>

<script>
import {  IonButton, IonContent,  IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, } from "@ionic/vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";    
export default {
    name: "FormTurno",
    props: {
        turnoSeleccionado: Object, empleados: Array, servicios:Array
 
      
    },
    components: {  IonButton, IonContent,  IonInput, IonItem, IonSelect, IonSelectOption, IonDatetime, IonToast, },
    setup() {

        const store = useLoginStore();
        const { isLogin, isAdmin, user } = storeToRefs(store);


        return {
            isLogin,
            isAdmin,
            user,
            document,
             
    
        }
    },methods:{
        prueba(){
            console.log(this.empleados)
        },
        agregarALista(){
            
            if(this.turnoSeleccionado.fechaHora == null || undefined){
                alert("Se debe seleccionar fecha y hora!")
            } else {
            const turnoNuevo = this.turnoSeleccionado
          
            this.$emit('agregar-a-lista', turnoNuevo)
            }
         //   this.turnoSeleccionado= {}
        }
    },
        data() {
        return {
            turnos: [],
            turno: {},
            mostrarTurnos: false,
            ocultar: false,
            admin: false,
            mostrar: false,
            disabled: false,
          
        };
    },

};

</script>