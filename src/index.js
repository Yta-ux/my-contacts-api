const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json())
app.use(routes)

app.use((error, request, response) => {
  if (error) {
    console.log(error)
    return response.status(500).json({ error: 'Internal server error' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server running on port 3000');
})
