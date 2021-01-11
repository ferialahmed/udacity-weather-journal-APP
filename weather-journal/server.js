// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express=require('express');


// Start up an instance of app
const app=express();
/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=4005;
const server=app.listen(port,function listening()
{
    console.log(`running on port: ${port}`);
});

app.post('/add',adddata);
function adddata(req,res){
    console.log(req.body);
    let newEntry=req.body;
    projectData['temp']=newEntry.temp;
    projectData['feelings']=newEntry.feelings;
    projectData['date']=newEntry.date;
    res.send(projectData);
    console.log(projectData);
}
app.get('/all',get);
function get(req,res){
    res.send(projectData);
    console.log(projectData);
};
