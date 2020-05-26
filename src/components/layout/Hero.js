import React from "react"
import hero from "../../img/hero.png"
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-item w-60">
        <h1>Analyze and Visualize Whatsapp Chats in a Click!</h1>
        <h2>
          With the help of NLP and Machine Learning, extract useful insights
          from your Whatsapp Chats.
        </h2>
        <button
          className="btn"
          style={{ marginTop: "1rem", fontSize: "1.5rem" }}
        >
          <a href="#upload">Let's Start!</a>
        </button>
      </div>
      <div className="hero-item w-40">
        <img src={hero} />
      </div>
    </div>
  )
}

export default Hero
