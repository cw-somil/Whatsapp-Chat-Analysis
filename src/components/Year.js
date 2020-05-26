import React, { Fragment, useState } from "react"
import Months from "./Months"

const Year = ({ data, year }) => {
  const [state, setState] = useState(false)

  const makeActive = () => {
    try {
      setState(!state)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Fragment>
      <button onClick={makeActive()}>{year}</button>
    </Fragment>
  )
}

export default Year
