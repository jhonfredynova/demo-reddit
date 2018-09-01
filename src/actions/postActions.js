import axios from 'axios'
import { handleError, handleRequestQuery, handleResponseQuery } from 'components/helper'

export const POST = {
  GET: 'GET_POST',
  SAVE: 'SAVE_POST',
  UPDATE: 'UPDATE_POST',
  DELETE: 'DELETE_POST'
}

export function getPost(parameters) {
  return dispatch  => {
    return axios.get(`${process.env.REACT_APP_LOCAL_API_URL}?${handleRequestQuery(parameters)}`)
    .then(response => dispatch({type: POST.GET, payload: handleResponseQuery(response)}) )
    .catch(err => handleError(err) )
  }
}

export function savePost(data) {
  return dispatch => {
    //return axios.post(`${process.env.REACT_APP_LOCAL_API_URL}/post`, data)
    return new Promise(resolve => resolve({ data: data }))
    .then(response => dispatch({type: POST.SAVE, payload: response.data}) )
    .catch(err => handleError(err) )
  }
}

export function updatePost(data) {
  return dispatch => {
    //return axios.patch(`${process.env.REACT_APP_LOCAL_API_URL}/post/${data.id}`, data)
    return new Promise(resolve => resolve({ data: data }))
    .then(response => dispatch({type: POST.UPDATE, payload: response.data}) )
    .catch(err => handleError(err) )
  }
}

export function deletePost(data) {
  return dispatch => {
    //return axios.delete(`${process.env.REACT_APP_LOCAL_API_URL}/post/${data.id}`)
    return new Promise(resolve => resolve({ data: data }))
    .then(response => dispatch({type: POST.DELETE, payload: response.data}) )
    .catch(err => handleError(err) )
  }
}