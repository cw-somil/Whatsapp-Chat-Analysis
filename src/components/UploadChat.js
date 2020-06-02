import React, { useState, Fragment } from "react"
import axios from "axios"
import Loader from "react-loader-spinner"
import { Redirect } from "react-router-dom"
import Steps from "./Steps"

const UploadChat = () => {
  const [data, setData] = useState({
    selectedFile: null,
    completeData: null,
    loading: false,
    filename: "Upload Your Chat File",
    err: null,
    filesize: null,
  })

  const fileUpload = (e) => {
    e.preventDefault()
    setData({
      selectedFile: e.target.files[0],
      filename: e.target.files[0].name,
      filesize: e.target.files[0].size,
    })
  }

  const submitChat = async (e) => {
    e.preventDefault()
    let postData = new FormData()
    console.log(data.filesize)
    if (
      data.filename.split(".").pop().toLowerCase() === "txt" &&
      data.filesize < 2600000
    ) {
      postData.append("file", data.selectedFile)
      try {
        setData({ loading: true })

        const res = await axios.post("http://localhost:5000/upload", postData, {
          timeout: 150000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        setData({ loading: false })
        if (res.data) {
          setData({ completeData: res.data })
        }
      } catch (err) {
        console.log(err)
        setData({ err: "Server Error", loading: false })
      }
    } else {
      setData({
        err:
          "Please upload a valid txt file or Upload a Text File which is less than 2.5Mb",
      })
    }
  }

  return (
    <Fragment>
      <section id="upload">
        <div className="container">
          {data.completeData ? (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: data.completeData,
              }}
            />
          ) : null}
          {data.loading ? (
            <Loader type="Bars" color="#ffffff" height={80} width={80} />
          ) : (
            <Fragment>
              {data.err ? (
                <div className="alert">
                  <h2>{data.err}</h2>
                </div>
              ) : null}
              <div className="alert">
                <h2>{data.filename}</h2>
              </div>

              <form onSubmit={(e) => submitChat(e)}>
                <input
                  type="file"
                  className="custom-file-upload"
                  name="myfile"
                  onChange={(e) => fileUpload(e)}
                />
                <input type="submit" name="submit" />
              </form>
              <div className="faq">
                <h1>FAQs (Frequently Asked Questions)</h1>
                <div>
                  <h2>Q.) Do you store my data?</h2>
                  <p>
                    <span>ANS: </span>NO PERSONAL DATA IS STORED ON THE
                    SERVERS.All the Computation is done on the go!
                  </p>
                </div>
                <div>
                  <h2>Q.) What Formats are Accepted?</h2>
                  <p>
                    <span>ANS: </span>Only Whatsapp Exported "txt" file is
                    accepted.
                  </p>
                </div>
                <div>
                  <h2>Q.) How much time the Processing take?</h2>
                  <p>
                    <span>ANS: </span>For a Text File of size 1MB, the
                    processing takes around <span>10-15 seconds</span>,
                    sometimes lesser.
                  </p>
                </div>
                <div>
                  <h2>Q.) How do I export the Whatsapp Chat?</h2>
                  <p>
                    <span>ANS: </span>Scroll down for detailed instructions on
                    how to export your chat.
                  </p>
                </div>
              </div>
            </Fragment>
          )}
        </div>
        <Steps />
      </section>
    </Fragment>
  )
}

export default UploadChat
