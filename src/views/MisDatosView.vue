<template>
    <ion-page>
    <h2>Mis datos</h2>
    <ion-list v-for="usuario in usuarios" :key="usuario.dni">
        DNI:{{ usuario.dni }} Nombre:{{ usuario.nombre }} Apellido:{{ usuario.apellido }} Telefono:{{ usuario.telefono }} Email:{{ usuario.email }} 
      </ion-list>  
  </ion-page>
</template>

<script>

import {IonPage} from '@ionic/vue'
export default {
components: {IonPage}
}
</script>

<style>

</style>