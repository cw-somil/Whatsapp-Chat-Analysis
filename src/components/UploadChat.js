import React, { useState, Fragment } from "react"
import axios from "axios"

import { Redirect } from "react-router-dom"

const UploadChat = () => {
  const [data, setData] = useState({
    selectedFile: null,
    completeData: null,
    loading: false,
  })

  const fileUpload = (e) => {
    e.preventDefault()
    setData({
      selectedFile: e.target.files[0],
    })
  }

  const submitChat = async (e) => {
    e.preventDefault()
    let postData = new FormData()
    postData.append("file", data.selectedFile)
    try {
      setData({ loading: true })
      const res = await axios.post("http://127.0.0.1:4555/upload", postData)
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
      {data.completeData ? (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: data.completeData,
          }}
        />
      ) : (
        <div className="alert">Please Upload Your Whatsapp Chat</div>
      )}
      {data.loading ? (
        <h1>Processing Your Data...</h1>
      ) : (
        <form onSubmit={(e) => submitChat(e)}>
          <input type="file" name="myfile" onChange={(e) => fileUpload(e)} />
          <input type="submit" name="submit" />
        </form>
      )}
    </Fragment>
  )
}

export default UploadChat
