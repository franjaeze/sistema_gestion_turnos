<script>
import { IonPage, IonContent, IonTitle, IonItem, IonHeader, IonGrid, IonRow, IonCol } from '@ionic/vue'
import velas from '../assets/velas.jpg'
export default {
  components: { IonPage, IonContent, IonTitle, IonItem, IonHeader, IonGrid, IonRow, IonCol }

}

</script>

<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size-md="8"> <ion-header class="titulazo espacio">
              Un tratamiento para cada necesidad
            </ion-header>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
        <ion-col size-md="2"></ion-col>
        <ion-col size-md="4"> <img class="imagen" src="../assets/velas.jpg" alt="candles"></ion-col>
          <ion-col size-md="4"> 
          
              <h1>Siguiendo de cerca la tendencia mundial en Dermatología y Medicina Estética brindamos a nuestros pacientes
              la mejor y más personalizada atención.  </h1></ion-col>         
          <ion-col size-md="2"></ion-col>
        </ion-row>
 
      </ion-grid>


    </ion-content>
  </ion-page>
</template>
<style>
.titulazo {
  font-size: calc(50px + 0.22vw);
  font-weight: 600;
  color: #edeceb;
  text-shadow: 0px 0px 5px #777141, 0px 0px 10px #c1ab6ad9, 0px 0px 10px #c3a463,
    0px 0px 20px #a57229;
}

:root {
  --color-primary: hsl(32, 96%, 28%);
  --color-secondary: hsl(33, 94%, 7%);
  --background: hsl(230, 30%, 15%);
  --text: hsl(310, 100%, 95%);
}


body {
  display: flex;
  justify-content: center;
  align-items: center;


}



h1::before,
h1::after {
  content: attr(aria-label);
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-51%, -51%);
  text-shadow: 0.01em 0.01em 0.01em rgba(0, 0, 0, 0.3);
}

h1::before {
  animation: floatAbove 3.5s ease-in-out infinite;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);
  clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);
}

h1::after {
  opacity: 0.65;
  filter: blur(0.02em);
  transform: translate(-50%, -50%) rotateX(21deg);
  animation: floatBelow 3.5s ease-in-out infinite;
  -webkit-clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);
  clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%);
}

@keyframes floatAbove {
  50% {
    transform: translate(-50%, -50%);
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%);
    clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 0% 60%);
  }
}

@keyframes floatBelow {
  50% {
    transform: translate(-50%, -50%) rotateX(10deg);
    -webkit-clip-path: polygon(0% 60%, 100% 60%, 100% 100%, 0% 100%);
    clip-path: polygon(0% 60%, 100% 60%, 100% 100%, 0% 100%);
  }
}

h1 {
  position: relative;
  margin-left: 20px;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 70px;
  font-weight: 700;
  color: #f5f5f5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  perspective: 500px;
  text-shadow: 0px 0px 5px #504f4b, 0px 0px 10px #6d6345d9, 0px 0px 10px #9c8249,
    0px 0px 20px #a57229;
}

.imagen {
  max-width: 500px;
  opacity: 0.9;
}
</style>