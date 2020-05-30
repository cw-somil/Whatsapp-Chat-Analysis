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

        const res = await axios.post("http://165.22.208.188/upload", postData, {
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
          ) : (
            <div className="alert">
              {data.err}
              <br />
              {data.filename}
            </div>
          )}
          {data.loading ? (
            <Loader type="Bars" color="#ffffff" height={80} width={80} />
          ) : (
            <Fragment>
              <form onSubmit={(e) => submitChat(e)}>
                <input
                  type="file"
                  className="custom-file-upload"
                  name="myfile"
                  onChange={(e) => fileUpload(e)}
                />
                <input type="submit" name="submit" />
              </form>
              <h3 className="note" style={{ textAlign: "center" }}>
                NO PERSONAL DATA IS STORED ON THE SERVERS. FILE SIZE LIMIT:
                2.5Mb
                <br /> Note: The processing usually takes 10-20 seconds due to
                heavy NLP computations.
              </h3>
            </Fragment>
          )}
        </div>
        <Steps />
      </section>
    </Fragment>
  )
}

export default UploadChat
