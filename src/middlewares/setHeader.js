import axios from 'axios'
import localStorage from 'localStorage'

const setHeader = store => next => action => {
  const appPreferences = store.getState().app.config.preferences || localStorage
  const authorization = store.getState().app.token
  if(authorization) axios.defaults.headers.common['Authorization'] = `${authorization.provider} ${authorization.token}`
  if(appPreferences.currency) axios.defaults.headers.common['Accept-Currency'] = appPreferences.currency
  if(appPreferences.language) axios.defaults.headers.common['Accept-Language'] = appPreferences.language
  next(action)
}

export default setHeader