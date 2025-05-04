import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [message, setMessage] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => {
        console.log(res.data)
        setMessage(res.data)
      }).catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <>
      <div>
        <h2>List of movies</h2>
        <ul>
          {message.map((movie, index) => (
            <li key={index}>
              <h4>{movie.title}</h4>
              <img src={movie.poster_url} height="100px" width="75px"/>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
