import React, { useState, Fragment } from "react"
import axios from "axios"
import Loader from "react-loader-spinner"
import { Redirect } from "react-router-dom"

const UploadChat = () => {
  const [data, setData] = useState({
    selectedFile: null,
    completeData: null,
    loading: false,
    filename: "Upload Your Chat File",
  })

  const fileUpload = (e) => {
    e.preventDefault()
    setData({
      selectedFile: e.target.files[0],
      filename: e.target.files[0].name + " Uploaded!",
    })
  }

  const submitChat = async (e) => {
    e.preventDefault()
    let postData = new FormData()
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
          <div className="alert">{data.filename}</div>
        )}
        {data.loading ? (
          <Loader type="Bars" color="#ffffff" height={80} width={80} />
        ) : (
          <div>
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
      </section>
    </Fragment>
  )
}

export default UploadChat
