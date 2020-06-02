import React from "react"
import info from "../img/info.png"

const Tooltip = () => {
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="info-icon">
          <img src={info} alt="Info Icon" />
        </div>
        <h2>How to Use the this page?</h2>
        <p>
          Use the <b>Top Red Button</b> to go further into the <b>Months</b> of
          the <b>Year</b>
        </p>
        <p>
          Use the <b>Bottom Red Button</b> to know the <b>Key Topics</b> of the
          <b>Year</b>
        </p>
      </div>
    </div>
  )
}

export default Tooltip
