const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const db = require('./db');

app.use(bodyParser.urlencoded({extended: true}));



app.get('/', async (req, res) => {
    res.send("Działa!");
})
app.get('/listAll', async (req, res) => {
    res.write("<h1>Lista i fajnie </h1>");
    const client = await db.connect();
    res.write("<table>");
    let list = await db.getAllListings(client);
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
});
app.post('/search', async(req, res)=>{
    let criteria = req.body;
    const client = await db.connect();
    let list = await db.get(client, criteria);
    res.setHeader('content-type', 'text/html');
    res.write("<h1>Lista rekordów w bazie spełniających kryteria</h1>");
    res.write("<table>");
    list.forEach(element => {
        res.write("<tr>");
        res.write("<td>" + element.listing_url + "</td>");
        res.write("<td>" + element.name + "</td>");
        res.write("</tr>");
    });
    res.write("</table>");
    db.close(client);
    res.end();
});
app.post('/add', async(req, res)=>{
    let data = req.body;
    const client = await db.connect();
    let dbResponse = await db.add(client, data);
    if (dbResponse){
        res.setHeader('content-type', 'text/html');
        res.write("dodano rekord");
    }else{
        res.setHeader('content-type', 'text/html');
        res.write("błąd");
    }
    
    db.close(client);
    res.end();
});

app.listen(8000);