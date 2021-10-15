import { defineStore } from 'pinia'
import { DjangoNinjaAuthService } from '../lib/api/services/DjangoNinjaAuthService'
import { LoginIn } from '../lib/api/models/LoginIn'
import { UserOut } from '../lib/api/models/UserOut'
import { ref } from 'vue'


export const useAuth = defineStore({
  id: "auth",
  state: () => ({
    user: ref<UserOut|null>(null)
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    async logIn (credentials: LoginIn): Promise<void> {
      try{
        const response = await DjangoNinjaAuthService.login(credentials)
        this.user = response
      } catch (error) {
        this.user = null
        throw error
      }
    },
    async logOut (): Promise<void> {
      try {
        const response = DjangoNinjaAuthService.logout()
      } finally {
        this.user = null
      }
    },
    async whoAmI (): Promise<void> {
      try {
        const response = await DjangoNinjaAuthService.me()
        this.user = response
      } catch (error) {
        this.user = null
      }
    },
  }
})

