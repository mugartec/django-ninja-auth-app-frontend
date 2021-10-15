<template>
  <div>
    <div class="grid justify-content-center align-items-center" style="height:90vh">
      <form @submit.prevent.await="resetPassword" class="main-form">
        <div class="card">
          <div class="field">
            <img src="/static/img/logo.png" class="border-round img_logo">
          </div>
          <div class="field">
            <InputText v-model="form.username"
                       class="w-full"
                       :class="{'p-invalid': validation.username.$invalid && validation.username.$dirty}"
                       placeholder="Username"/>
            <small class="p-error w-max" v-for="error in validation.username.$errors">
              {{ error.$message }}
            </small>
          </div>
          <div class="field">
            <Password v-model="form.new_password1"
                      class="w-full"
                      :class="{'p-invalid': validation.new_password1.$invalid && validation.new_password1.$dirty}"
                      placeholder="New password"
                      :toggleMask="true"
                      inputStyle="width:100%"
                      autocomplete="on"/>
            <small class="p-error w-max" v-for="error in validation.new_password1.$errors">
              {{ error.$message }}
            </small>
          </div>
          <div class="field">
            <Password v-model="form.new_password2"
                      class="w-full"
                      :class="{'p-invalid': validation.new_password2.$invalid && validation.new_password2.$dirty}"
                      placeholder="Repeat new passsword"
                      :feedback="false"
                      :toggleMask="true"
                      inputStyle="width:100%"
                      autocomplete="on"/>
              <small class="p-error w-max" v-for="error in validation.new_password2.$errors">
                {{ error.$message }}<br>
              </small>
          </div>
          <div class="field">
            <Button type="submit"
                    class="w-full"
                    label="Submit"/>
          </div>

        </div>
        <div class="flex justify-content-end">
          <RouterLink to="/">Back</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRef, defineProps } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { DjangoNinjaAuthService } from '@/lib/api/services/DjangoNinjaAuthService'
import { SetPasswordIn } from '@/lib/api/models/SetPasswordIn'

import Password from 'primevue/password'
import InputText from 'primevue/inputtext'

const toast = useToast()
const router = useRouter()

const { token } = defineProps({
  token: {
    type: String as () => string,
    required: true
  }
})

const form = reactive<SetPasswordIn>({
  token,
  new_password1: '',
  new_password2: '',
  username: ''
})

const rules = {
  username: { required },
  new_password1: { required },
  new_password2: {
    required,
    sameasRef: helpers.withMessage(
      'The passwords are different',
      sameAs(toRef(form, 'new_password1'))
    )
  }
}

const $externalResults = ref({})
const validation = useVuelidate(rules, form, { $externalResults })

const resetPassword = async () => {
  $externalResults.value = {}
  validation.value.$touch()

  if (!await validation.value.$validate()) return

  try {
    const response = await DjangoNinjaAuthService.resetPassword(form)
    toast.add({
      severity:'success',
      summary: 'Welcome back!',
      detail: 'Your password was changed successfully',
      life: 2000
    })
    router.replace('/')
  } catch (requestError) {
    if (requestError.status == 403) {
      console.log(requestError.body)
      $externalResults.value = requestError.body.errors
    } else if (requestError.status == 422) {
      toast.add({
        severity: 'error',
        summary: 'Invalid token',
        detail: 'Please request a new password reset email.',
        life: 2000
      })
    } else {
      throw requestError
    }
  }
}
</script>

<style type='text/css' media='screen'>
.img_logo {
  width:320px;
}
.main-form {
  max-width:320px;
}
</style>
