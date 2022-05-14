 const express = require('express'); 
 const PORT = process.env.PORT || 3001; 
const fs = require('fs'); 
const path = require('path'); 
 
 const app = express(); 

 const notesDB = require('./data/db.json'); 

 app.use(express.urlencoded({extended: true})); 
 app.use(express.json()); 
 app.use(express.static('public')); 

 app.get('/api/notes', (req, res) => {
     res.json(notesDB.slice(1)); 
 })

 app.get('/', (req, res) =>{
     res.sendFile(path.join(__dirname, './public/index.html')); 
 }); 

 app.get('/notes', (req, res)=> {
     res.sendFile(path.join(__dirname, './public/notes.html')); 
 }); 

 app.get('*', (req, res)=>{
     res.sendFile(path.join(__dirname, './public/index.html')); 
 }); 

 function createNotes(body, notesArray) {
     const addNotes = body; 
     if(!Array.isArray(notesArray)){
        notesArray =[]; 
     }; 
        

    if(notesArray.length === 0){
         notesArray.push(0); 
        }; 

    body.id = notesArray[0]; 
    notesArray[0]++; 

    notesArray.push(addNotes); 
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify(notesArray, null, 2)
    ); 
    return addNotes; 

 }

 app.post('/api/notes', (req, res) =>{
     const newNotes = createNotes(req.body, notesDB); 
     res.json(newNotes); 
 })






 app.listen(PORT, ()=> {
     console.log(`API server is now on port ${PORT} blah! blah! blah!`)
 })



