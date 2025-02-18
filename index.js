const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express(); 
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json())






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
    // await client.connect();
    
    app.get('/campaigns/:id', async(req,res) =>{
      const id = req.params.id; 
      const query = {_id: new ObjectId(id)};
      const result = await database.findOne(query); 
      res.send(result)
    })


    // campaign card show
    app.get('/campaigns', async(req,res) =>{
        const cursor = database.find();
        const result = await cursor.toArray(); 
        res.send(result)
    })

   

    
  
    app.get('/homecampaign', async(req,res) =>{
        const cursor = database.find().limit(6);
        const result = await cursor.toArray(); 
        res.send(result)
    })

    app.get('/mycampaign', async(req,res)=>{
      const userEmail = req.query.email; 
      console.log(userEmail)
      const query = {userEmail: userEmail} ; 
      const result = await database.find(query).toArray()
      console.log(result)
      res.send(result)
    })

    app.get('/mycampaign/:email', async(req,res)=>{
      const userEmail = req?.params.email ; 
      const query = {userEmail: userEmail} ; 
      const result = await database2.find(query).toArray()
      res.send(result)
    })


    app.put('/mycampaign/:id', async(req,res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updatedUser = req.body;
      const User = {
        $set:{
          imageURL:updatedUser.imageURL,
          campaignTitle:updatedUser.campaignTitle,
          campaignType:updatedUser.campaignType,
          description:updatedUser.description,
          minDonation:updatedUser.minDonation,
          deadline:updatedUser.deadline,
          userEmail:updatedUser.userEmail,
          userName:updatedUser.userName
        }
      }
      const result = await database.updateOne(filter,User,options);
      res.send(result)
    })


    app.delete("/mycampaign/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }; 
      const result = await database.deleteOne(query);
      res.send(result);
    });
    

    app.post('/campaigns',async(req,res)=>{ 
       
        const newCampaign = req.body; 
        console.log("Successfully new campaign added", newCampaign); 
        const result = await database.insertOne(newCampaign);
        res.send(result)
    })


    //donate button details
    app.post('/donatedetails',async(req,res)=>{
        const newCampaign = req.body; 
        console.log("Successfully new campaign & user added", newCampaign); 
        const result = await database2.insertOne(newCampaign);
        res.send(result)
    })

    const database = client.db("crowdcube").collection("campaignList");
    const database2 = client.db("crowdcube").collection("donationdetails");
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");




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

