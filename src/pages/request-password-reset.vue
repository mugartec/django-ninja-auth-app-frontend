<template>
  <div>
    <Toast />
    <div class="grid justify-content-center align-items-center" style="height:90vh">
      <form @submit.prevent.await="requestPasswordReset">
        <div class="field">
          <img src="/static/img/logo.png" class="border-round img_logo">
        </div>
        <div class="field">
          <InputText v-model="validation.email.$model"
                     name="email"
                     class="w-full"
                  :class="{'p-invalid': validation.email.$invalid && validation.email.$dirty}"
                     placeholder="Email"/>
        </div>
        <div class="field">
          <Button type="submit"
                  class="w-full"
                  label="Submit"/>
        </div>
        <div class="flex justify-content-end">
          <RouterLink to="/">Back</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'
import InputText from 'primevue/inputtext'

import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import { DjangoNinjaAuthService } from '@/lib/api/services/DjangoNinjaAuthService'
import { RequestPasswordResetIn } from '@/lib/api/models/RequestPasswordResetIn'

const form = reactive<RequestPasswordResetIn>({
  email: ''
})
const toast = useToast()

const rules = {
  email: {required, email}
}

const validation = useVuelidate(rules, form)

const requestPasswordReset = async () => {
  validation.value.$touch()

  if (validation.value.$invalid) {
    toast.add({
      severity: 'warn',
      detail: 'Please insert a valid e-mail address',
      life: 2000
    })
    return
  };

  const response = await DjangoNinjaAuthService.requestPasswordReset(form)
  toast.add({
    severity:'success',
    summary: 'All good',
    detail: 'If the address exists we\'ll send a password-recovery email.',
    life: 2000
  })
}
</script>

<style type='text/css' media='screen'>
.img_logo {
  width:320px;
}
</style>
