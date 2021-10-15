<template>
  <Toast />
  <RouterView/>
</template>

<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

onErrorCaptured( (error) => {
  toast.add({
    severity: 'error',
    summary: 'Ocurrió un error',
    detail: 'Si el problema persiste contacte a soporte',
    life: 2000
  })
})

</script>

<style>
@import 'reset-css';
@import 'primeflex/primeflex.css';
@import 'primevue/resources/themes/nova-accent/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';
</style>
