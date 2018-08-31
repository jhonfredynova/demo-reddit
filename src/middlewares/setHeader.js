import axios from 'axios'

const setHeader = store => next => action => {
  const authorization = store.getState().app.authorization
  if(authorization) axios.defaults.headers.common['Authorization'] = authorization
  next(action)
}

export default setHeader