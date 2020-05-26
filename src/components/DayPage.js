import React, { Fragment } from "react"
import VerticalChart from "./VerticalChart"

const DayPage = ({ location }) => {
  console.log(location.state)
  return (
    <Fragment>
      <div className="card" style={{ border: "none", padding: "5rem" }}>
        <h1 style={{ color: "#ffffff" }}>Days</h1>
        <div style={{ width: "80vw", height: "80vh" }}>
          <VerticalChart
            apiData={{
              labels: Object.keys(location.state["days"]).sort(),
              data: Object.keys(location.state["days"])
                .sort()
                .map((day) => location.state["days"][day]["total_words"]),
            }}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default DayPage
