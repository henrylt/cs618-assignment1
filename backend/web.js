import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017/'
const dbName = 'assignment1db'
const client = new MongoClient(url)

try {
  await client.connect()
  console.log('Successfully connected to the database!')
} catch (err) {
  console.error('Error connecting to the database: ', err)
}

const server = createServer(async (req, res) => {
  const db = client.db(dbName)

  const courses = db.collection('courses')
  const coursesList = await courses.find().toArray()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(coursesList))
})

const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})
