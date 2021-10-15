<template>
  <AuthenticatedLayout>
    <div class="grid justify-content-center align-items-center" style="height:90vh">
      <Menu :model="items" />
      <!-- <Button label="Logout" -->
      <!--         class="p&#45;button&#45;outlined p&#45;button&#45;danger" -->
      <!--         @click.await="auth.logOut"/> -->
      <!-- <Button label="Change Password" -->
      <!--         class="p&#45;button&#45;outlined p&#45;button&#45;secondary" -->
      <!--         @click.await="auth.logOut"/> -->
    </div>
  </AuthenticatedLayout>
</template>

<script setup lang="ts">
import { useAuth } from '@/store/auth'
import Menu from 'primevue/menu';
const auth = useAuth()

const items = [
  {
    label: 'Change Password',
    icon: 'pi pi-user',
    to: '/change-password'
  },
  {
    label: 'Logout',
    icon: 'pi pi-lock',
    command: () => {
      auth.logOut()
    }
  }
]
</script>
