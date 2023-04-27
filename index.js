const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const path = require('path');

// initializing express app
const app = express();

// setting body to accept json encoding data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.send("API WORKING SUCCESSFULLY");
})

// get request
app.get('/users', (req, res) => {
    db.query(`SELECT * FROM users ORDER BY id ASC`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    db.end;
})

// get user by id
app.get('/users/:id', (req, res)=>{
    db.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);  
        }
    });
    db.end;
})

// post request
app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `INSERT INTO users(id, name, age, gender) 
                       values('${user.id}','${user.name}', '${user.age}', '${user.gender}')`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    db.end;
})

// update request
app.patch('/users/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       age = '${user.age}',
                       gender = '${user.gender}'
                       where id = ${req.params.id}`

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    db.end;
})

// delete request
app.delete('/users/:id', (req, res)=> {
    let insertQuery = `DELETE FROM users WHERE id=${req.params.id}`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    db.end;
})

app.listen(3000, () => {
    console.log(`> server is running on port http://localhost:3000`)
});

db.connect();


