import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Home } from './components/Home/Home.component'
import { TopNav } from './components/TopNav/TopNav.component'
import { connect } from 'react-redux'
import { YoutubeClientLoaded } from './store/action-creators/action-creator'

interface IApp {
  setYoutubeClientLoaded(): void
}

const App = (props: IApp) => {
  useEffect(() => {
    gapi.load('client', () => {
      gapi.client.setApiKey('AIzaSyAYqzsRLSb_-oAojhbbQ9TY0gnXB3Wxbu0')
      return gapi.client.load('youtube', 'v3', () => {
        props.setYoutubeClientLoaded()
      })
    })
  })

  return (
    <div className="App">
      <TopNav />
      <Switch>
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
