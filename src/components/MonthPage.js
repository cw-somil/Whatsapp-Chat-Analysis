import React, { Fragment, useState } from "react"
import Loader from "react-loader-spinner"
import { useHistory } from "react-router-dom"
import HorizontalChart from "./HorizontalChart"
import axios from "axios"

const MonthPage = ({ location }) => {
  const [state, setState] = useState({ loading: false })
  const history = useHistory()
  const redirectDays = (month) => {
    return history.push({
      pathname: "/days",
      state: location.state["data"]["months"][month],
    })
  }

  const genTopics = async (month) => {
    setState({ loading: true })
    const res = await axios.post(
      "http://127.0.0.1:4555/gen_topics",
      {
        data: location.state["data"]["months"][month]["all_words"],
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
        <Loader type="Bars" color="#ffffff" height={80} width={80} />
      ) : (
        Object.keys(location.state["data"]["months"]).map((month) => (
          <div className="card">
            <button
              className="btn-card top"
              onClick={() => redirectDays(month)}
            >
              {month}
            </button>

            <HorizontalChart
              apiData={{
                labels: [month],
                data: [location.state["data"]["months"][month]["total_words"]],
                maxval: location.state["data"]["maxval"],
              }}
            />
            <button
              className="btn-card bottom"
              onClick={() => genTopics(month)}
            >
              Generate Topics
            </button>
          </div>
        ))
      )}
    </Fragment>
  )
}

export default MonthPage
