import React, { useState, useEffect } from 'react'
import { InfiniteScroll } from '../../InfiniteScroll/InfiniteScroll.component'
import { VideoGrid } from '../Content/VideoGrid/VideoGrid.component'
import { IVideoState } from '../../../store/interfaces/IVideoState'
import {
  GetCategories,
  GetVideosByCategories,
  LoadPopularVideos,
  VideosLoading
} from '../../../store/action-creators/action-creator'
import { Video, VideoByCategory, VideoCategory } from '../../../store/types'
import { connect } from 'react-redux'

import './Content.css'

interface IContent {
  isYoutubeClientLoaded: boolean
  videos: Video[]
  videosByCategories: VideoByCategory
  categories: VideoCategory[]
  videosLoading: boolean
  LoadPopularVideos(): void
  LoadCategories(): void
  SetVideoLoading(): void
  LoadVideosByCategories(categories: VideoCategory[]): void
}

const Content = (props: IContent) => {
  const grid = (
    <VideoGrid videos={props.videos} title="Recommended" showDivider />
  )

  const categoriesName = Object.keys(props.videosByCategories)

  const gridByCategories = categoriesName.map((key: string, index: number) => {
    let showDivider: boolean = index !== categoriesName.length - 1

    return (
      <VideoGrid
        key={key}
        videos={props.videos}
        title={key}
        showDivider={showDivider}
      />
    )
  })

  const [categoryIndex, setCategoryIndex] = useState(0)

  if (categoryIndex == 0 && props.categories && props.categories.length > 0) {
    props.LoadVideosByCategories([props.categories[categoryIndex]])
    setCategoryIndex((currentIndex: number) => (currentIndex += 1))
  }

  const onCallBack = () => {
    let categoriesToFetch: VideoCategory[] = props.categories.slice(
      categoryIndex,
      categoryIndex + 2
    )
    props.LoadVideosByCategories(categoriesToFetch)
    setCategoryIndex((currentIndex: number) => (currentIndex += 2))
  }

  useEffect(() => {
    if (props.isYoutubeClientLoaded) {
      props.SetVideoLoading()
      props.LoadPopularVideos()
      props.LoadCategories()
    }
  }, [props.isYoutubeClientLoaded])

  return (
    <InfiniteScroll callBack={onCallBack} isLoading={props.videosLoading}>
      <div className="video_content">
        <div className="video_content_container">
          {grid}
          {gridByCategories}
        </div>
      </div>
    </InfiniteScroll>
  )
}

const mapStateToProps = (state: IVideoState) => {
  return {
    isYoutubeClientLoaded: state.isYoutubeClientLoaded,
    videos: state.videos,
    categories: state.categories,
    videosByCategories: state.videosByCategories,
    videosLoading: state.videosLoading
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    LoadPopularVideos: () => dispatch(LoadPopularVideos()),
    LoadCategories: () => dispatch(GetCategories()),
    LoadVideosByCategories: (categories: VideoCategory[]) =>
      dispatch(GetVideosByCategories(categories)),
    SetVideoLoading: () => dispatch(VideosLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
