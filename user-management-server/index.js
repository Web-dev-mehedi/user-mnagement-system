const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();


// middleWare
app.use(cors());
app.use(express.json());

// 

const uri = `mongodb+srv://${process.env.USERDB_NAME}:${process.env.USERDB_PASS}@cluster0.pm9ea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    //
   const userCollection = client.db("userDB").collection("users");

// for get the api
app.get('/users', async (req , res)=> {  
    const cursor = userCollection.find()
    const result = await cursor.toArray();
   res.send(result)
})
// for get single item
app.get( '/users/:id', async (req, res)=>{
   const id = req.params.id;
   const query = {_id : new ObjectId(id)};
   const result = await userCollection.findOne(query);
   res.send(result);
})

// for an item post
app.post("/users", async (req , res)=>{
   const userInfo = req.body;
   const result = await userCollection.insertOne(userInfo);
   res.send(result)
})



// for put/update
app.put('/users/:id' , async ( req , res) =>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const updateUserInfo = req.body;
    const options = { upsert: true };
    const updateUser = {
        $set : {
            name: updateUserInfo?.name , email: updateUserInfo?.email , gender: updateUserInfo?.gender , status :updateUserInfo?.status
        }
    }
   
    const result = await userCollection.updateOne(filter , updateUser , options)
    res.send(result)

})



// delete
app.delete('/users/:id' , async (req , res ) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result)
})







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);











//
app.get('/' , (req , res) => {
    res.send('user management system server')
})

app.listen( port , ()=>{
    console.log(`this site running on the port : ${port}`)
})

