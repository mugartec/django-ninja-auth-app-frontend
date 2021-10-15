<template>
  <div class="grid justify-content-center align-items-center" style="height:90vh">
    <form @submit.prevent.await="submitForm()">
      <div class="card">
        <img src="/static/img/logo.png" class="border-round img_logo">
      </div>
      <small class="p-error" v-for="error in validation.username.$errors">
        {{ error.$message }}
      </small>
      <div class="field">
        <InputText v-model="credentials.username"
                   placeholder="Username"
                   class="w-full"
                   :class="{'p-invalid': validation.username.$invalid && validation.username.$dirty}"
                   />
      </div>

      <small class="p-error" v-for="error in validation.password.$errors">
        {{ error.$message }}
      </small>
      <div class="field mt-20">
        <Password v-model="credentials.password"
                  placeholder="Password"
                  :feedback="false"
                  :toggleMask="true"
                  class="w-full"
                  :class="{'p-invalid': validation.password.$invalid && validation.password.$dirty}"
                  inputStyle="width:100%"
                  />
      </div>

      <div class="field">
        <Button type="submit"
                class="w-full"
                label="Login"/>
      </div>
      <div class="flex justify-content-end">
        <RouterLink to="/request-password-reset">Forgot your password?</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { useAuth } from '@/store/auth'
import { LoginIn } from '@/lib/api/models/LoginIn'
import { useVuelidate } from '@vuelidate/core'
import { useToast } from 'primevue/usetoast'
import { required } from '@vuelidate/validators'

const toast = useToast()

import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'

const credentials = reactive<LoginIn>({
  username: '',
  password: '',
})
const rules = {
  username: { required },
  password: { required }
}
const validation = useVuelidate(rules, credentials)

const auth = useAuth()

const submitForm = async () => {
  validation.value.$touch()
  if (validation.value.$invalid) return
  try{
    await auth.logIn(credentials)
  } catch (requestError) {
    if (requestError.status == 403){
      toast.add({
        severity: 'warn',
        detail: 'Invalid credentials',
        life: 2000
      })
    } else {
      throw requestError
    }
  }
}

</script>

<style scoped>
.img_logo {
  width: 320px;
}
</style>
