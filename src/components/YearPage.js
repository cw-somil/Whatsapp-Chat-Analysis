import React, { Fragment, useState } from "react"

import { useHistory } from "react-router-dom"
import HorizontalChart from "./HorizontalChart"
import axios from "axios"

const YearPage = ({ location }) => {
  const history = useHistory()
  const [state, setState] = useState({ loading: false })

  const redirectMonths = (year) => {
    return history.push({
      pathname: "/months",
      state: {
        data: location.state["data"][year],
        corpus: location.state["corpus"],
      },
    })
  }

  const genTopics = async (year) => {
    setState({ loading: true })
    const res = await axios.post(
      "http://127.0.0.1:4555/gen_topics",
      {
        data: location.state["data"][year]["all_words"],
        corpus: location.state["corpus"],
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
    setState({ loading: false })
    return history.push({
      pathname: "/topics",
      state: res.data["data"],
    })
  }
  return (
    <Fragment>
      {state.loading ? (
        <h1>Processing Data...</h1>
      ) : (
        Object.keys(location.state["data"])
          .sort()
          .map((year) => (
            <div className="card">
              <button onClick={() => redirectMonths(year)}>{year}</button>

              <HorizontalChart
                apiData={{
                  labels: [year],
                  data: [location.state["data"][year]["total_words"]],
                  maxval: 30000,
                }}
              />

              <button onClick={() => genTopics(year)}>Generate Topics</button>
            </div>
          ))
      )}
    </Fragment>
  )
}

export default YearPage
