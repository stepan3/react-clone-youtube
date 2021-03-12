import { VideoCategoryResponse, VideoResponse } from '../types'

export const getVideos = (): Promise<VideoResponse> => {
  return getVideoByFilter()
}

export const getVideosByCategory = (
  categoryId: string
): Promise<VideoResponse> => {
  return getVideoByFilter(categoryId)
}

export const getVideoCategories = (): Promise<VideoCategoryResponse> => {
  return (gapi.client as any).youtube.videoCategories.list({
    part: ['snippet'],
    regionCode: 'RU'
  })
}

const getVideoByFilter = (
  categoryId: string = '1',
  maxSize: number = 14
): Promise<VideoResponse> => {
  return (gapi.client as any).youtube.videos.list({
    part: ['snippet', 'statistics', 'contentDetails'],
    chart: 'mostPopular',
    regionCode: 'RU',
    maxResults: maxSize,
    videoCategoryId: categoryId
  })
}
