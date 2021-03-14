import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { params, SearchListResponse, Video } from '../../store/types'
import { getParamValue } from '../../utils/uri'
import { IVideoState } from '../../store/interfaces/IVideoState'
import {
  ClearSearchResult,
  SearchVideos,
  VideosLoading
} from '../../store/action-creators/action-creator'
import { ResultList } from './ResultList/ResultList.component'
import { connect } from 'react-redux'

interface ISearch extends RouteComponentProps<params> {
  searchResults: SearchListResponse
  isLoading: boolean
  youTubeClientLoaded: boolean
  searchVideo(query: string, nextPageToken: string | null): void
  setVideoLoading(): void
  clearResults(): void
}

const Search = (props: ISearch) => {
  console.log(JSON.stringify(props.searchResults))

  const videos: Video[] =
    props.searchResults.items?.map(item => ({
      ...item,
      id: item.id?.videoId
    })) || []

  const userQuery: string | null = getParamValue(props.location, 'search_query')

  const callBack = () => {
    if (
      props.youTubeClientLoaded &&
      userQuery &&
      props.searchResults.nextPageToken
    ) {
      props.setVideoLoading()
      props.searchVideo(userQuery, props.searchResults.nextPageToken!)
    }
  }

  useEffect(() => {
    if (props.youTubeClientLoaded && userQuery) {
      props.clearResults()
      props.setVideoLoading()
      props.searchVideo(userQuery, null)
    }
  }, [props.youTubeClientLoaded, userQuery])

  return (
    <div>
      <ResultList
        callBack={callBack}
        isLoading={props.isLoading}
        videos={videos}
      />
    </div>
  )
}

const mapStateToProps = (state: IVideoState) => {
  return {
    searchResults: state.searchResults,
    youTubeClientLoaded: state.isYoutubeClientLoaded,
    isLoading: state.videosLoading
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    searchVideo: (query: string, nextPageToken: string | null) =>
      dispatch(SearchVideos(query, nextPageToken)),
    setVideoLoading: () => dispatch(VideosLoading()),
    clearResults: () => dispatch(ClearSearchResult())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
