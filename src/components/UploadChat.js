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
    err: "",
  })

  const fileUpload = (e) => {
    e.preventDefault()
    setData({
      selectedFile: e.target.files[0],
      filename: e.target.files[0].name,
    })
  }

  const submitChat = async (e) => {
    e.preventDefault()
    let postData = new FormData()
    if (data.filename.split(".").pop().toLowerCase() === "txt") {
      postData.append("file", data.selectedFile)
      try {
        setData({ loading: true })

        const res = await axios.post("http://165.22.208.188/upload", postData)

        setData({ loading: false })
        if (res.data) {
          setData({ completeData: res.data })
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      setData({ err: "Please upload a valid txt file." })
    }
  }

  return (
    <Fragment>
      <section id="upload">
        {data.completeData ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: data.completeData,
            }}
          />
        ) : (
          <div className="alert">
            {data.err}
            <br />
            {data.filename}
          </div>
        )}
        {data.loading ? (
          <div className="container">
            <Loader type="Bars" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          <div className="container">
            <form onSubmit={(e) => submitChat(e)}>
              <input
                type="file"
                className="custom-file-upload"
                name="myfile"
                onChange={(e) => fileUpload(e)}
              />
              <input type="submit" name="submit" />
            </form>
            <h3 className="note">
              Note: The processing usually takes 10-20 seconds due to heavy NLP
              computations
            </h3>
          </div>
        )}
        <Steps />
      </section>
    </Fragment>
  )
}

export default UploadChat
