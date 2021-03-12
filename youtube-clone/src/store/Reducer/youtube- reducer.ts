import { ActionTypes, IAction } from '../interfaces/IAction'
import { IVideoState } from '../interfaces/IVideoState'

let initialState: IVideoState = {
  isYoutubeClientLoaded: false,
  videos: [],
  categories: [],
  videosByCategories: {},
  videosLoading: false
}

export const YoutubeReducer = (
  currentState: IVideoState = initialState,
  action: IAction
) => {
  if (action.type === ActionTypes.YoutubeClientLoaded) {
    let state = { ...currentState }
    state.isYoutubeClientLoaded = true
    return state
  } else if (action.type === ActionTypes.LoadPopularVideos) {
    let state = { ...currentState }
    state.videos = action.payload
    return state
  } else if (action.type === ActionTypes.LoadVideosByCategories) {
    let state = { ...currentState }
    state.videosByCategories = {
      ...state.videosByCategories,
      ...action.payload
    }
    state.videosLoading = false
    return state
  } else if (action.type === ActionTypes.LoadCategories) {
    let state = { ...currentState }
    state.categories = action.payload
    return state
  } else if (action.type === ActionTypes.VideosLoading) {
    let state = { ...currentState }
    state.videosLoading = true
    return state
  }
  return currentState
}
