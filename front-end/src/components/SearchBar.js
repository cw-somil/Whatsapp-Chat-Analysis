import React, { useState, Fragment } from "react"
import { useHistory } from "react-router-dom"

const SearchBar = ({ location }) => {
  const history = useHistory()
  const [state, setState] = useState({
    search_text: "",
    list: location.state.meta,
  })
  const handleChange = (e) => {
    if (e.target.value === "") {
      setState({ list: location.state.meta })
    } else {
      const text = e.target.value

      setState({ search_text: text })
      const list = location.state.meta.filter((item, index) => {
        return item.title.toLowerCase().includes(text.toLowerCase())
      })

      setState({ list: list })
    }
  }

  const back = () => {
    return history.goBack()
  }
  return (
    <Fragment>
      <div className="search-container">
        <h1 style={{ marginBottom: "1rem" }}>
          Search from {state.list.length} videos
        </h1>
        <input
          className="search-bar"
          type="text"
          value={state.search_text}
          onChange={(e) => handleChange(e)}
        ></input>
        <button className="btn" onClick={() => back()}>
          Back to Dashboard
        </button>
      </div>
      <div className="search-container">
        {state.list.map((item) => (
          <div key={item.title} className="yt-card">
            <img src={item.thumbnail.url} alt={item.title}></img>
            <h1>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h1>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default SearchBar
