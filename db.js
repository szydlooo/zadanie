const { MongoClient } = require('mongodb');
const url = "mongodb+srv://szydlooo:1234@szydlooo.r5unm5g.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
    const client =  new MongoClient(url);
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("ping");
        return client;
    } catch (e) {
        console.log("error " + e);
        process.exit(1);
    }
}
async function getAllListings(client) { 
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    let list = collection.find().toArray();
    return list;
}
async function get(client, criteria){
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    
    let list = collection.find(criteria).toArray();
    return list;   
}
async function add(client, data){
    const collection = await client.db('sample_airbnb').collection('listingsAndReviews');
    collection.insertOne(data, (error, response) =>{
        if(error){
            console.log("lipa");
            return false;
        }   else{
            return true;
        }
    });
}

function close(client) {
    client.close();
    console.log("disconnected");
}
module.exports = {connect, getAllListings, close, get, add}
