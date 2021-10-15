<template>
  <div class="grid justify-content-center align-items-center" style="height:90vh">
    <form class="small-form" @submit.prevent.await="submitForm()">
      <div class="card">
        <img src="/static/img/logo.png" class="border-round img_logo">
      </div>

      <div class="field">
        <Password v-model="form.old_password"
                  :feedback="false"
                  placeholder="Current password"
                  class="w-full"
                  :toggleMask="true"
                  inputStyle="width:100%"
                  :class="{'p-invalid': !!validation.old_password.$invalid && validation.old_password.$dirty}"
                   />
        <ul>
          <li class="p-error text-lg font-medium p-text-wrap" v-for="error in validation.old_password.$errors">
          {{ error.$message }}
          </li>
        </ul>
      </div>

      <div class="field">
        <Password v-model="form.new_password1"
                  placeholder="New password"
                  class="w-full"
                  inputStyle="width:100%"
                  :class="{'p-invalid': !!validation.new_password1.$invalid && validation.new_password1.$dirty}"
                   />
        <ul>
          <li class="p-error text-lg font-medium p-text-wrap" v-for="error in validation.new_password1.$errors">
          {{ error.$message }}
          </li>
        </ul>
      </div>

      <div class="field">
        <Password v-model="form.new_password2"
                  placeholder="Repeat new password"
                  :feedback="false"
                  class="w-full"
                  inputStyle="width:100%"
                  :class="{'p-invalid': !!validation.new_password2.$invalid && validation.new_password2.$dirty}"
                   />
        <ul>
          <li class="p-error text-lg font-medium p-text-wrap" v-for="error in validation.new_password2.$errors">
          {{ error.$message }}
          </li>
        </ul>
      </div>

      <div class="field">
        <Button type="submit"
                class="w-full"
                label="Change password"/>
      </div>
      <div class="flex justify-content-end">
        <RouterLink to="/">Back</RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, toRef } from 'vue'
import { DjangoNinjaAuthService } from '@/lib/api/services/DjangoNinjaAuthService'
import { ChangePasswordIn } from '@/lib/models/ChangePasswordIn'
import { useRouter } from 'vue-router'
import { useUser } from '@/lib/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, helpers } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import Password from 'primevue/password'


const toast = useToast()
const router = useRouter()

const form = reactive<ChangePasswordIn>({
  old_password: '',
  new_password1: '',
  new_password2: ''
})

const rules = {
  old_password: { required },
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

const submitForm = async () => {
  validation.value.$touch()
  $externalResults.value = {}
  if (validation.value.$invalid) return
  try {
    await DjangoNinjaAuthService.changePassword(form)
    // useUser().value = null
    toast.add({
      severity: 'success',
      detail: 'Password successfully changed',
      life: 2000
    })
    router.replace('/')
  } catch (requestError) {
    console.log(requestError)
    $externalResults.value = requestError.body.errors
  }
}
</script>

<style scoped>
.img_logo {
  width: 320px;
}
.small-form {
  max-width: 320px;
}
</style>
