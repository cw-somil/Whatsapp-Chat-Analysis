import React from "react"
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share"

const Footer = () => {
  return (
    <div className="footer">
      <div
        className="footer-item"
        style={{
          width: "100%",
          textAlign: "center",
          color: "#ffffff",
          fontSize: "1.5rem",
          fontWeight: "700",
        }}
      >
        Share With Your Friends
      </div>
      <div className="footer-item">
        <WhatsappShareButton
          url={
            "Look at this site. It shows you insights on your Whatsapp Chats. Also, it's completely free. http://watanalysis.herokuapp.com"
          }
          style={{ marginRight: "1rem" }}
        >
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
        <FacebookShareButton
          url={"http://watanalysis.herokuapp.com"}
          quote={
            "Look at this site. It shows you insights on your Whatsapp Chats. Also, it's completely free."
          }
        >
          <FacebookIcon size={50} round />
        </FacebookShareButton>
      </div>
      <div
        className="footer-item"
        style={{ width: "100%", textAlign: "center" }}
      >
        <h3 style={{ color: "darkgray" }}>
          Developed By{" "}
          <span>
            <a
              style={{ color: "#ffffff" }}
              href="https://www.linkedin.com/in/somil-shah-9761a9138/"
            >
              Somil Shah
            </a>
          </span>
        </h3>
      </div>
    </div>
  )
}

export default Footer
