<template>
  <div class="flex full-page justify-content-center align-items-center">
    <ProgressSpinner stroke-width="4"
                     animation-duration="1s"/>
  </div>
</template>
<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
</script>

<style scoped>
.full-page {
  height: 90vh;
}
</style>
