const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express(); 
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json())

//crowdcube
//iwlU6tCLY3tG0Vqx




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.7i4ix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  // ghdfsghdsdgdg
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("crowdcube").collection("campaignList");
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");



    app.get('/campaigns', async(req,res) =>{
        const cursor = database.find();
        const result = await cursor.toArray(); 
        res.send(result)
    })


    app.post('/campaigns',async(req,res)=>{
        const newCampaign = req.body; 
        console.log("Successfully new campaign added", newCampaign); 
        const result = await database.insertOne(newCampaign);
        res.send(result)
    })

  }
  
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
  res.send("Crowd server is running !")
})

app.listen(port, ()=>{
  console.log(`Crowd server is running!: ${port} `)
})