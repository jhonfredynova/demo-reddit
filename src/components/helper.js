import { get, isObject } from 'lodash'

//CONSTANTS
export const ACTION = {
  TEMP: 'ACTION_TEMP',
  DELETE: 'ACTION_DELETE',
  GET: 'ACTION_GET',
  SAVE: 'ACTION_SAVE',
  UPDATE: 'ACTION_UPDATE',
  UPLOAD: 'ACTION_UPLOAD'
}

//REQUESTS
export function handleError(e){
  throw new Error(e.message)
}

export function handleRequestQuery(data){
  let params = {}
  for(let key in data){
    if(key==='activePage') params.count = (data.activePage<=1 ? 0 : ((data.activePage-1)*data.pageSize))
    else if(key==='pageSize') params.limit = data.pageSize-1
    else params[key] = data[key]
  }
  let queryString = []
  let queryValue = null
  for(let param in params){
    queryValue = isObject(params[param]) ? JSON.stringify(params[param]) : params[param]
    queryString.push(`${param}=${queryValue}`)
  }
  return encodeURI(queryString.join('&'))
}

export function handleResponseAction(action, state, payload){
  switch(action){
    case ACTION.TEMP:
      state = payload
      break
    case ACTION.DELETE:
      state = {
        ...state,
        records: state.records.filter(item => item.data.id!==payload.data.id),
        recordsTotal: state.recordsTotal-1
      }
      break
    case ACTION.GET:
      state = {
        ...state,
        records: payload.records,
        recordsTotal: payload.recordsTotal
      }
      break
    case ACTION.SAVE:
      state = {
        ...state,
        records: state.records.concat(payload),
        recordsTotal: state.recordsTotal+1
      }
      break
    case ACTION.UPDATE:
      state = {
        ...state, 
        records: state.records.map(item => (item.data.id===payload.data.id) ? payload : item),
        recordsTotal: state.recordsTotal
      }
      break
    case ACTION.UPLOAD:
      state = {
        ...state,
        records: state.records.concat(payload),
        recordsTotal: state.recordsTotal+payload.length
      }
      break
    default:
      break
  }
  return state
}

export function handleResponseQuery(data){
  let response = { 
    records: get(data, 'data.data.children', []), 
    recordsTotal: get(data.data, 'data.data.dist', 0)
  }
  return response
}