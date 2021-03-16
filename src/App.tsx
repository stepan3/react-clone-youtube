import React, { useEffect } from 'react'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom'
import { Home } from './components/Home/Home.component'
import Search from './components/Search/Search.component'
import TopNav from './components/TopNav/TopNav.component'
import Trending from './components/Trending/Trending.component'
import { SideBar } from './components/SideBar/SideBar.component'
import { connect } from 'react-redux'
import { YoutubeClientLoaded } from './store/action-creators/action-creator'
import WatchVideo from './components/WatchVideo/WatchVideo.component'
import { params } from './store/types'

interface IApp extends RouteComponentProps<params> {
  setYoutubeClientLoaded(): void
}

const App = (props: IApp) => {
  useEffect(() => {
    gapi.load('client', () => {
      gapi.client.setApiKey('AIzaSyDPMyqjoKR6nH0ykVmWTAG13g-LZfGFq5Y')
      return gapi.client.load('youtube', 'v3', () => {
        props.setYoutubeClientLoaded()
      })
    })
  })

  const showSideBar = () => {
    return props.location.pathname !== '/watch'
  }

  return (
    <div className="App">
      <TopNav />
      {showSideBar() ? <SideBar /> : null}
      <Switch>
        <Route path="/feed/trending" component={Trending} />
        <Route path="/result" component={Search} />
        <Route path="/watch" component={WatchVideo} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setYoutubeClientLoaded: () => {
      dispatch(YoutubeClientLoaded())
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
