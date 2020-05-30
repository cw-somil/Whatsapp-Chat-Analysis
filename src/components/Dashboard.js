import React, { Fragment } from "react"

const Dashboard = ({ year, months }) => {
  return (
    <Fragment>
      <div
        className="dashboard"
        style={{
          fontSize: "2.5rem",
          color: "white",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Your Whatsapp Rewind
      </div>
      <div className="dashboard">
        <div className="dash-items" style={{ width: "20rem" }}>
          <div
            className="heading"
            style={{ backgroundColor: "#8bff5d", width: "20rem" }}
          >
            <h1>Most Popular Year</h1>
          </div>
          <div
            className="title"
            style={{ backgroundColor: "#b6fb9a", width: "20rem" }}
          >
            <h2>{year.year}</h2>
          </div>
          <div
            className="value"
            style={{ backgroundColor: "#d9ffca", width: "20rem" }}
          >
            <h2>{year.value}</h2>
            <h3>No of Words Chatted</h3>
          </div>
        </div>
      </div>
      <div className="dashboard">
        {months.map((obj) => (
          <div className="dash-items">
            <div className="heading">
              <h1>Best Month of {obj.year}</h1>
            </div>
            <div className="title">
              <h2>{obj.month}</h2>
            </div>
            <div className="value">
              <h2>{obj.value}</h2>
              <h3>No of Words Chatted</h3>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default Dashboard
