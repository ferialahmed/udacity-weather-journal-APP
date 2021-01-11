/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
const apiurl=`http://api.openweathermap.org/data/2.5/weather?`;
const apikey='6e35551bfec9d1937e361cc08183aca1';

const btn=document.getElementById('generate').addEventListener('click',performAction);
function performAction(e){
    const feeling=document.getElementById('feelings').value;
    getData()
    .then((data)=>{
        console.log(data);
        postData('/add',{temp:data.main.temp,date:newDate,feelings:feeling})
    })
      .then((newdata)=>update());
};

//get data from API
const getData=async ()=>{
    const zipcode=document.getElementById('zip').value;
    //to fetch data from api
    const req=await fetch(apiurl+`zip=${zipcode}&appid=${apikey}&units=metric`) ;//json data
    try{
        const res=await req.json();
        console.log(res);
        return res;
    }
    catch(err){
        console.log(err);
    }
}

//post temp,date,and user feelings to server endpoint
const postData=async(url='',data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    try{
        const newdata=await response.json();
        console.log(newdata);
        return newdata;
    }
    catch (err){
        console.log(err);
    }
}
//update UI
const update=async()=>{
    const request=await fetch(url='/all');
    try{
        const alldata=await request.json();
        console.log(alldata);
        const temp=document.getElementById('temp');
        const date=document.getElementById('date');
        const content=document.getElementById('content');
        temp.innerHTML='temperature: '+alldata.temp+'°C';
        date.innerHTML='date: '+ alldata.date;
        content.innerHTML='feeling: '+alldata.feelings;
    }
    catch(err){
        console.log(err);
    }
}




