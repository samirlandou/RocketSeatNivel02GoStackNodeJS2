import express from 'express'
import routes from './routes'

const app = express()
app.use(express.json()) // importante usar isso

app.use(routes) // importante para usar as rotas.

/* app.use('/appointments', (request, response) => {
  return response.json({ message: 'Hello World!999!!' })
}) */

app.listen(3333, () => {
  console.log('Server started on port 3333...')
})
