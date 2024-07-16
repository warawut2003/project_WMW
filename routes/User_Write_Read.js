'use strict';

const express = require('express');
const crypto = require('crypto');
const User_WRoute = express.Router();
const connection = require('../db');
const { createPool } = require('mysql2');

User_WRoute.post('/api/AddLogin',async function(req,res,next){
    const { username ,password } = req.body;
    if ( !username ||!password) {
        return res.status(400).send('Missing required fields');
    }

    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");

    let newUserId ;

    try {
        const [rows] = await connection.query('SELECT U_id FROM users_iogin ORDER BY U_id DESC LIMIT 1');
        if (rows.length > 0) {
            let lastUserId = parseInt(rows[0].U_id, 10);
            newUserId = (lastUserId + 1).toString().padStart(3, '0');
            if (parseInt(newUserId, 10) > 999) {
                return res.status(400).send('User ID limit reached');
            }
        } else {
            newUserId = '001'; 
        }
        

        await connection.execute(
            `INSERT INTO users_iogin(U_id, UserName, User_Password) VALUES (?, ?, ?);`,
            [
                newUserId, username, mypass
            ]
        );

        console.log("Insert successfully");
        res.status(201).send('User added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting User');
    }
});

User_WRoute.post('/api/AddPersonal',function(req,res,next){
    const { User_id , Fname, Lname, gender,Date_Birth,age,dmc_Province,Religion,Blood_Type,
        Marital_Status,num_child,Military_Status,phone_num,email,Image,file
     } = req.body;

    if (!User_id || !Fname || !Lname || !gender || !age || !dmc_Province|| !Religion || !Blood_Type 
        || !Marital_Status|| !num_child || !Military_Status || !phone_num||!email ||!Image ||!file
    ) {
        return res.status(400).send('Missing required fields');
    }

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    connection.execute(`INSERT INTO user_personal(User_id , User_Fname, User_Lname, User_gender, User_Date_Birth, User_age
        ,User_dmc_Province, User_Religion, User_Blood_Type, User_Marital_Status, User_child ,User_Military_Status
        ,User_phone_num, User_email,User_Image,User_file,created_at,Update_at) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?, ?, ?, ?,?,?);`,
    [User_id, Fname, Lname, gender,Date_Birth,age, dmc_Province, Religion, Blood_Type,Marital_Status,num_child,Military_Status,
        phone_num,email,Image,file,
        now,  now]).then(() => {
       
            console.log('Insert successfully');
            res.status(201).send('User added successfully');
        }).catch((err) => {
       
            console.error(err);
    res.status(500).send('Error inserting User');
       
        });
            
          
       
       });

       User_WRoute.get('/api/DisplayLogin', function (req, res, next) {

        connection.execute('SELECT * FROM user_personal;')
    
        .then((result) => {
    
           var rawData = result[0];
    
           res.send(rawData);
    
           
    
        }).catch((err) => {
    
           console.log(err);
    
           res.end();
    
        });
    
    });

User_WRoute.use('/', function (req, res, next) {

    res.sendStatus(404).send("Path error");

})

module.exports = User_WRoute;