const express = require('express')
// const connection=require('./mongoose.con')
const connection=require('./mongodb.con')
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express()
const port=5000 ||  process.env.PORT 




app.use(express.json());
app.use(cors());


    
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
        console.log(response)    
     }catch(e){
       console.log(e)
        } ;
})


app.get('/fruitlist', async(req,res)=>{
    try{        
         
        const dbCon= await connection()
        const collection=await dbCon.collection('fruits')
        const response=await collection.find({}).toArray()
        console.log(response)
    
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





app.get('/fruitindemand',(req,res)=>{
    try{
          
     }catch(e){
       
        } ;
})






app.get('/',(req,res)=>{
    res.send(`<h3>Welcome to MongoDB VS MySQL ....</h3>`)
   })
   app.listen(5000,()=>console.log(`Server Ready from ${port}`))



   
// https://github.com/LinkedInLearning/Learning-MongoDB-2835008/blob/master/lessons/5.2/2-find_one.js