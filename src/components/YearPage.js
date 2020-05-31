import React, { Fragment, useState } from "react"
import { useHistory } from "react-router-dom"
import HorizontalChart from "./HorizontalChart"
import axios from "axios"
import Loader from "react-loader-spinner"
import info from "../img/info.png"
import Dashboard from "./Dashboard"

const YearPage = ({ location }) => {
  const history = useHistory()
  const [state, setState] = useState({ loading: false })

  const redirectMonths = (year) => {
    return history.push({
      pathname: "/months",
      state: {
        data: location.state["data"][year],
        corpus: location.state["corpus"],
        err: "",
      },
    })
  }

  const genTopics = async (year) => {
    try {
      setState({ loading: true })

      const res = await axios.post(
        "http://165.22.208.188/gen_topics",
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
    } catch (err) {
      setState({ loading: false, err: err.message })
    }
  }
  return (
    <Fragment>
      <h1 style={{ color: "#ffffff" }}>{state.err}</h1>

      {state.loading ? (
        <div className="container">
          <Loader type="Bars" color="#ffffff" height={80} width={80} />
        </div>
      ) : (
        <Fragment>
          <Dashboard
            year={location.state["best_year"]}
            months={location.state["best_months"]}
          />
          <div className="container">
            <div className="tooltip-container">
              <div className="tooltip">
                <div className="info-icon">
                  <img src={info} alt="Info Icon" />
                </div>
                <h2>How to Use the this page?</h2>
                <p>
                  Use the <b>Top Red Button</b> to go further into the{" "}
                  <b>Months</b> of the <b>Year</b>
                </p>
                <p>
                  Use the <b>Bottom Red Button</b> to know the <b>Key Topics</b>{" "}
                  of the
                  <b>Year</b>
                </p>
              </div>
            </div>

            {Object.keys(location.state["data"])
              .sort()
              .map((year) => (
                <div key={year} className="card">
                  <button
                    className="btn-card top"
                    onClick={() => redirectMonths(year)}
                  >
                    {year}
                  </button>

                  <HorizontalChart
                    apiData={{
                      labels: [year],
                      data: [location.state["data"][year]["total_words"]],
                      maxval: location.state["maxval"],
                    }}
                  />

                  <button
                    className="btn-card bottom"
                    onClick={() => genTopics(year)}
                  >
                    Generate Topics
                  </button>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default YearPage
