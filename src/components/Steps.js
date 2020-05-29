import React from "react"
import step1 from "../img/step_1.png"
import step2 from "../img/step_2.png"
import step3 from "../img/step_3.png"

const Steps = () => {
  return (
    <div className="container">
      <h1
        style={{
          color: "#ffffff",
          width: "100%",
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "1rem",
        }}
      >
        How to Export Chat from Whatsapp?
      </h1>
      <img src={step1} />
      <img src={step2} />
      <img src={step3} />
    </div>
  )
}

export default Steps
