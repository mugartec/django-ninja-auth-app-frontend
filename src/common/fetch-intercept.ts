import fetchIntercept from 'fetch-intercept'
import Cookies from 'js-cookie'
import { Service } from '../lib/api/services/Service'

const unregister = fetchIntercept.register({
  request: async function (url, config) {
    if ( ['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method || 'PUT') ) {
      if ( !Cookies.get('csrftoken') ) {
        await Service.setCsrfCookie()
      }
      const modifiedHeaders = new Headers(config.headers)
      modifiedHeaders.append('X-CSRFToken', Cookies.get('csrftoken') || '')
      config.headers = modifiedHeaders
    }
    return [url, config];
  }
})

export default unregister
