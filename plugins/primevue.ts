import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import DialogService from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";
//import Button from 'primevue/button';

export default defineNuxtPlugin((nuxtApp) => {
  //  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.use(DialogService); // Service pour DynamicDialog
  nuxtApp.vueApp.component("DynamicDialog", DynamicDialog);
  //   nuxtApp.vueApp.component('Button', Button);
});
