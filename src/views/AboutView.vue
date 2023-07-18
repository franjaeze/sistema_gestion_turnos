<template>
  <ion-page>
    <ion-content> 
      <div class="about">
            <ion-text class="about-text">     
     2023-TP2-BE-21E- Sistema de Gestion de Turnos - "Beauty Spa"

Este es el sistema de gestion de turnos del centro de estética Beauty Spa del grupo 1. Cuenta con permisos especiales de Admin, para realizar alta, modificacion y eliminacion de Servicios y Empleados. 
  </ion-text> </div>    </ion-content></ion-page>
</template>

<script>
import {IonPage,IonContent,IonText} from '@ionic/vue'
export default {
  components: { IonPage, IonContent, IonText }
}
</script>
<style>
.about{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color:#9f9f9fab;
  margin-top: 1em;
  padding: 0.75em;
  border-radius: 5px;
  margin-left: 1em;
  margin-right: 1em;;
  
}
.about-text{
  display: flex;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 2rem;
  color:rgb(249, 234, 234);
  text-shadow: 0px 0px 5px #504f4b, 0px 0px 10px #6d6345d9, 0px 0px 10px #9c8249,
  0px 0px 20px #a57229;
}

</style>