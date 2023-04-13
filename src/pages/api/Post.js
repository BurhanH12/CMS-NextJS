// import database from "./MongoDb";

// export async function handler(req, res) {
//   try {
//     const dbClient = req.dbClient;
//     const db = dbClient.db('Loaders');
//     const collection = db.collection('States');

//     switch (req.method) {
//       case "POST":
//         const bodyObject = req.body;
//         const myPost = await collection.insertOne(bodyObject);
//         res.status(201).json(myPost.ops[0]);
//         break;
//       case "GET":
//         const allPosts = await collection.find({}).toArray();
//         res.status(200).json({ data: allPosts });
//         break;
//       default:
//         res.status(405).json({ error: 'Method Not Allowed' });
//         break;
//     }
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: 'Something went wrong.' })
//   }
// }

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// export default database(handler);
