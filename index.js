const express = require("express");
const { ObjectId } = require('mongodb');
const {connectToDb , getDB} = require('./db');
const app = express();
app.use(express.json())
let db ;
connectToDb((err) => {
    if(!err)
    {
        console.log("Connected to Database successfully")
        app.listen(3000 , () => {
            console.log("server is running on port 3000");
        })
    }
    db =getDB() ;
})

app.get('/api' , (req , res) => {
    const collections = db.collection('api') ;
    collections.find({}).toArray(function(err , result)
    {
        res.json(result);
        //res.send({msg : 'Successfully able to fetch Data'})
    })
    
    
})
app.get('/api/:id' , function(req , res) {
    if(ObjectId.isValid(req.params.id))
    {
        const collections = db.collection('api');
        collections.findOne({
            _id : ObjectId(req.params.id)} , function(err , result)
        {
            if(!err)
            {
                res.json(result);
            }
            else{
                console.log(err);
            }
               
        })
    }
})
app.post('/api' , (req , res) => {
    const name = req.body ;
    const collections = db.collection('api');
    collections.insertOne(name, function(err , result)
    {
        if(!err)
        {
            res.json(result)
        }
        else{
            console.log(err);
        }
    })
    //res.json({msg : 'Successfully able to post data'})
    
})

app.delete('/api/:id' , function(req , res) {
    if(ObjectId.isValid(req.params.id))
    {
        const collections = db.collection('api');
        collections.deleteOne({_id : ObjectId(req.params.id)} , function(err , result)
        {
            if(!err)
            {
                res.json(result);
            }
        })

    }
})