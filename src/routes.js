import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Pages/Home'
import NewCategory from './Pages/NewCategory'
import NewVideo from './Pages/NewVideo'
import Play from './Pages/Play'


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/newvideo' component={NewVideo}/>
        <Route path='/newcategory' component={NewCategory}/>
        <Route path='/play/:videoId' component={Play}/>
      </Switch>
    </BrowserRouter>
  )
}
