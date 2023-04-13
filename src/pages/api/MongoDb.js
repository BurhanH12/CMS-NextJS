// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let clientPromise = null

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local')
// }

// export default function database(req, res, next) {
//   if (!clientPromise) {
//     const client = new MongoClient(uri, options)
//     clientPromise = client.connect()
//     console.log('MongoDB client connected.')
//   }
  
//   clientPromise
//     .then((dbClient) => {
//       req.dbClient = dbClient
//     })
//     .catch((err) => {
//     })
// }
