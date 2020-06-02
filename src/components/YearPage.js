import React, { Fragment, useState } from "react"
import { useHistory } from "react-router-dom"
import HorizontalChart from "./HorizontalChart"
import axios from "axios"
import Loader from "react-loader-spinner"
import Dashboard from "./Dashboard"
import Tooltip from "./Tooltip"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ExportDoc from "./ExportDoc"

const YearPage = ({ location }) => {
  const history = useHistory()
  const [state, setState] = useState({ loading: false, btnloading: false })

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

  const redirectSearch = () => {
    console.log(location.state["yt_meta"])
    return history.push({
      pathname: "/search",
      state: {
        meta: location.state["yt_meta"],
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
          <div className="container">
            <button className="btn-outline" onClick={() => redirectSearch()}>
              Search in Links
            </button>
          </div>
          <Dashboard
            year={location.state["best_year"]}
            months={location.state["best_months"]}
          />

          <div className="container">
            <Tooltip />

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <button className="btn" style={{ padding: "0.4rem 0.8rem" }}>
              <PDFDownloadLink
                document={
                  <ExportDoc
                    year={location.state["best_year"]}
                    months={location.state["best_months"]}
                  />
                }
                fileName="WhatsappReport.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading Document.." : "Download Report"
                }
              </PDFDownloadLink>
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default YearPage
