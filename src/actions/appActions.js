import shortid from 'shortid'
import { isEqual, pick } from 'lodash'

export const APP = {
  HIDE_LOADING: 'HIDE_LOADING',
  SHOW_LOADING: 'SHOW_LOADING',
  GET_CONFIG: 'GET_CONFIG',
  SET_MESSAGE: 'SET_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE'
}


export function hideLoading() {
  return (dispatch, state) => {
    if (state().app.isLoading) {
      dispatch({ type: APP.HIDE_LOADING, payload: false })
    }
  }
}

export function showLoading() {
  return (dispatch, state) => {
    if (!state().app.isLoading) {
      dispatch({ type: APP.SHOW_LOADING, payload: true })
    }
  }
}

export function getConfig() {
  return (dispatch) => {
    let response = {
      appDisabled: false,
      appLogo: '/favicon.png',
      appName: 'Reddit',
      language: 'en',
      locales: { en: {}, es: {} }
    }
    dispatch({ type: APP.GET_CONFIG, payload: response })
  }
}

export function setMessage(data) {
  return (dispatch, state) => {
    if (!isEqual(pick(state().app.messages[0], Object.keys(data)), data)){
      data.id = shortid.generate()
      dispatch({ type: APP.SET_MESSAGE, payload: [data] })
    }
  }
}

export function deleteMessage() {
  return (dispatch, state) => {
    if(state().app.messages.length>0){
      dispatch({ type: APP.DELETE_MESSAGE, payload: [] })
    }
  }
}
