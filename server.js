const path = require('path')
const express = require('express')

// Path to index.html
const indexHtml = path.join(__dirname, 'app', 'index.html')

// Run static dev server
const server = express()
  .get('*', express.static('app'))
  .get('*', (req, res) => res.sendFile(indexHtml))
  .listen(8000, 'localhost', null, () => {
    const { address, port } = server.address()
    console.log(`Server listening on ${address}:${port}`)
  })
