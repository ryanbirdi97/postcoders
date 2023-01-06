import { useEffect, useState } from 'react'
import { getAreaData } from './api'

import './App.css'

function App() {

  const [areas, setAreas] = useState([]);
  const [outcode, setOutcode] = useState("");
  const [subitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget)
    setSubmitted(true)
    getAreaData(outcode).then((res) => {
      setAreas(res);
      setError(false)
    }).catch((err)=>{
      if(err) setError(true)
    })
  };

  return (
    <div className="App">
      <h1>Postcoders</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setSubmitted(false)
              setAreas([])
              setOutcode(e.target.value);
            }}
          ></input>
          <button type="submit">Search Postcode</button>
        </form>
        {subitted && areas.length > 0 ? <h2>{`Areas for ${outcode.toUpperCase()}: ${areas.length}`}</h2> : <></>}
        {error ? <p>Invalid postcode</p> : <></>}
    </div>
  )
}

export default App
