import { POST } from 'actions/postActions'
import { ACTION, handleResponseAction } from 'components/helper'

export default function reducer(
  state={
    posts: { records: [], recordsTotal: 0 },
    temp: null
  }, 
  action={}) 
{
  switch (action.type) {

    default:
      return state

    case POST.GET:
      return { 
        ...state, 
        posts: handleResponseAction(ACTION.GET, state.posts, action.payload.find || state.posts),
        temp: handleResponseAction(ACTION.TEMP, state.temp, action.payload.findOne)
      }

    case POST.SAVE:
      return { 
        ...state, 
        posts: handleResponseAction(ACTION.SAVE, state.posts, action.payload) 
      }

    case POST.UPDATE:
      return { 
        ...state, 
        posts: handleResponseAction(ACTION.UPDATE, state.posts, action.payload) 
      }

    case POST.DELETE:
      return { 
        ...state, 
        posts: handleResponseAction(ACTION.DELETE, state.posts, action.payload) 
      }
      
  }
}