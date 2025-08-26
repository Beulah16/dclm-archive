import express from 'express'
import { config } from 'dotenv'
import AppDataSource from './data-source'

config()

const app = express()

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized.');
    app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))
  })
  .catch((error) => console.error('Error during Data Source initialization:', error));


