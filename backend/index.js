import express from 'express'
import cors from 'cors'

import pool from './db.js'

const port = 5000

const app = express()
app.use(cors())
app.use(express.json())


// User Authentication & Authorization


app.get('/', async (req, res) => {
    try {
      const data = await pool.query('SELECT * FROM movies ORDER BY id')
      const list = data.rows
      res.status(200).send(list)
    } catch(e) {
      res.status(500).send(e)
    }
})

// Movie Management - Admin

// Movies
app.post('/add_movie', async (req, res) => {
    const { title, description, poster_url, genre } = req.body

    try {
      await pool.query('INSERT INTO movies (title, description, poster_url, genre) VALUES ($1, $2, $3, $4)', [title, description, poster_url, genre])
      res.status(200).send({ messsage: 'added movie to database' })
    } catch(e) {
      res.status(500).send(e)
    }
})

app.put('/update_movie/:id', async (req, res) => {
  const id = req.params.id
  const key = Object.keys(req.body)[0]
  const value = req.body[key]

  const allowedKeys = ['title', 'description', 'poster_url', 'genre']

  try {

    if (!allowedKeys.includes(key)) {
      return res.status(400).send({ error: 'Invalid column name' })
    }
  
    const query = `UPDATE movies SET ${key} = $1 WHERE id = $2`
    await pool.query(query, [value, id])
    res.status(200).send({ messsage: 'updated movie in database' })
  } catch(e) {
    res.status(500).send(e)
  }
})

app.delete('/delete_movie/:id', async (req, res) => {
  const id = req.params.id

  try {
    await pool.query('DELETE FROM movies WHERE id=$1', [id])
    res.status(200).send({ messsage: 'deleted movie from database' })
  } catch(e) {
    res.status(500).send(e)
  }
})

// Showtimes
app.post('/add_showtime/:id', async (req, res) => {

  res.status(500).send("error")
})

// Reservation Management

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
