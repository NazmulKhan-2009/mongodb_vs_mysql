require('dotenv').config();
const express = require('express')
// const connection=require('./mongoose.con')
const connection=require('./mongodb.con')
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express()
const port=process.env.PORT || 5000




app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

    
const dbStoreFruits=async(actType,data)=>{
    const dbCon= await connection()
    const fruits=await dbCon.collection('fruits')

switch (actType) {

    case 'insert':
       return await fruits.insertOne(data)
    break;
    case 'aggregate':

       return await fruits.aggregate( [
            {
              $group: {
                 _id: null,
                 count: { $count: { } }
              }
            }
          ] )   
    break;

    default:
        break;
}
}


app.post('/fruitsadd', async(req,res)=>{

    console.log(req.body)
    try{
       const response=await dbStoreFruits('insert',{...req.body,date:new Date() })
        res.status(200).send(response)    
            
     }catch(e){
       console.log(e)
        } ;
})


app.get('/fruitlist', async(req,res)=>{
    try{        
         
        const dbCon= await connection()
        const collection=await dbCon.collection('fruits')
        const response=await collection.find({}).toArray()
        res.status(200).send(response)
    
     }catch(e){
       console.log(e)
        } ;
   
})
// { $group : { _id : "$fruit" } } 
// count: { $count: { } }

app.get('/group',async(req,res)=>{
  

    const dbCon= await connection()
        const collection=await dbCon.collection('fruits')

        const response=await collection.aggregate([{$group:{_id:"$fruit",tSales:{$sum:{$multiply:["$price","$quantity"]}}}},
       

        {$match:{"tSales":{$gte:100}}}
  

      ]).toArray()
        

        res.status(200).send(response)
})











app.get('/',(req,res)=>{
    res.send('Welcome to MongoDB VS MySQL')
   })



app.listen(port,()=>console.log(`Server Ready from ${port}`))



   
