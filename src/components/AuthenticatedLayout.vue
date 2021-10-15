<template>
  <div>
    <slot v-if="auth.isLoggedIn && ready"/>
    <Login v-else-if="ready"/>
    <FullPageSpinner v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '../store/auth'
import ProgressSpinner from 'primevue/progressspinner';

const auth = useAuth()
const ready = ref(false)
onMounted (async () => {
  if (!auth.isLoggedIn) {
    await auth.whoAmI()
  }
  ready.value = true
})
</script>
