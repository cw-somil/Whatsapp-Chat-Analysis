import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import UploadChat from "./components/UploadChat"

import YearPage from "./components/YearPage"
import MonthPage from "./components/MonthPage"
import DayPage from "./components/DayPage"
import "./css/main.css"
import TopicPage from "./components/TopicPage"
import Navbar from "./components/layout/Navbar"
import Hero from "./components/layout/Hero"
import ReactGa from "react-ga"
import Footer from "./components/layout/Footer"
import SearchBar from "./components/SearchBar"

ReactGa.initialize("UA-167965521-1")

function App() {
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search)
  }, [])
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Hero} />
      <Route exact path="/" component={UploadChat} />
      <Fragment>
        <Switch>
          <Route exact path="/dashboard" component={YearPage} />
          <Route exact path="/months" component={MonthPage} />
          <Route exact path="/days" component={DayPage} />
          <Route exact path="/topics" component={TopicPage} />
          <Route exact path="/search" component={SearchBar} />
        </Switch>
      </Fragment>
      <Footer />
    </Router>
  )
}

export default App
