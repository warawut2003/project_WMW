'use strict';

const express = require('express');
const crypto = require('crypto');
const User_WRoute = express.Router();
const connection = require('../db');
const { createPool } = require('mysql2');

//เพิ่ม แสดง ข้อมูลตาราง login

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

User_WRoute.get('/api/DisplayLogin', function (req, res, next) {

    connection.execute('SELECT * FROM users_iogin;')

    .then((result) => {

       var rawData = result[0];

       res.send(rawData);

       

    }).catch((err) => {

       console.log(err);

       res.end();

    });

});

//เพื่ม แสดงข้อมูล ส่วนตัว User

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
       
            console.log('Insert personal successfully');
            res.status(201).send('User personal added successfully');
        }).catch((err) => {
       
            console.error(err);
    res.status(500).send('Error inserting User');
       
        });
            
          
       
       });

       User_WRoute.get('/api/DisplayPersonal', function (req, res, next) {

        connection.execute('SELECT * FROM user_personal;')
    
        .then((result) => {
    
           var rawData = result[0];
    
           res.send(rawData);
    
           
    
        }).catch((err) => {
    
           console.log(err);
    
           res.end();
    
        });
    
    });

       
    //เพิ่ม แสดง ข้อมูลพ่อแม่

    User_WRoute.post('/api/AddParent',function(req,res,next){
        const { user_id , house_num, villageNum, father_Occupation,mother_fname,mother_lname,mother_Occupation} = req.body;
    
        if (!user_id || !house_num || !villageNum || !father_Occupation || !mother_fname || !mother_lname|| !mother_Occupation ) {
            return res.status(400).send('Missing required fields');
        }
    
        
        connection.execute(`INSERT INTO user_parents(U_id, house_num, villageNum, alley, mother_Fname
            ,mother_Lname, mother_Occupation) VALUES ( ?, ?, ?, ?, ?,?, ?);`,
        [user_id, house_num, villageNum, alley,mother_fname,mother_lname, mother_Occupation]).then(() => {
                console.log('Insert parents successfully');
                res.status(201).send('User parents added successfully');
            }).catch((err) => {
           
                console.error(err);
        res.status(500).send('Error inserting User');
           
            });
                
           });

    User_WRoute.get('/api/DisplayParents', function (req, res, next) {

            connection.execute('SELECT * FROM user_parents;')
        
            .then((result) => {
        
               var rawData = result[0];
        
               res.send(rawData);
        
               
        
            }).catch((err) => {
        
               console.log(err);
        
               res.end();
        
            });
        
        });


    //เพิ่ม แสดง ที่อยู่

    User_WRoute.post('/api/insAddress',function(req,res,next){
        const { user_id , house_num, villageNum, alley,street,sub_district,district,province,postal_code} = req.body;
    
        if (!user_id || !house_num || !villageNum || !alley || !street || !sub_district|| !district||!province||!postal_code ) {
            return res.status(400).send('Missing required fields');
        }
    
        
        connection.execute(`INSERT INTO user_address(U_id, house_num, villageNum, alley, street
            ,sub_district, district,province,postal_code) VALUES ( ?, ?, ?, ?, ?,?, ?,?,?);`,
        [user_id, house_num, villageNum, alley,street,sub_district, district,province,postal_code]).then(() => {
                console.log('Insert address successfully');
                res.status(201).send('User address added successfully');
            }).catch((err) => {
           
                console.error(err);
        res.status(500).send('Error inserting User');
           
            });
                
           });

           User_WRoute.get('/api/DisplayAddress', function (req, res, next) {

            connection.execute('SELECT * FROM user_address;')
        
            .then((result) => {
        
               var rawData = result[0];
        
               res.send(rawData);
        
               
        
            }).catch((err) => {
        
               console.log(err);
        
               res.end();
        
            });
        
        });

    //เพื่ม แสดงข้อมูล ที่อยู่ ที่ทำงานปัจจุบัน
    
    User_WRoute.post('/api/AddOffice',function(req,res,next){
        const { user_id , Office_Name, Job_position, Salary,Office_address,Office_villageNum,
            Office_alley, Office_street, Office_sub_district, Office_district,
            Office_province, Office_phone, Office_fax} = req.body;
    
        if (!user_id || !Office_Name || !Job_position || !Salary || !Office_address || !Office_villageNum|| !Office_alley||
            !Office_street||!Office_sub_district||!Office_district||!Office_province||!Office_phone||!Office_fax ) {
            return res.status(400).send('Missing required fields');
        }
    
        
        connection.execute(`INSERT INTO user_workplace_now(U_id, Office_Name, Job_position, Salary, Office_address
            ,Office_villageNum, Office_alley,Office_street,Office_sub_district,Office_district,Office_province,Office_phone,
            Office_fax) VALUES ( ?, ?, ?, ?, ?,?, ?,?,?,?,?,?,?);`,
        [user_id, Office_Name, Job_position, Salary,Office_address,Office_villageNum, Office_alley, Office_street, Office_sub_district,
            Office_district, Office_province, Office_phone, Office_fax
        ]).then(() => {
                console.log('Insert Workplace Now successfully');
                res.status(201).send('User Workplace Now added successfully');
            }).catch((err) => {
           
                console.error(err);
        res.status(500).send('Error inserting User');
           
            });
                
           });

        User_WRoute.get('/api/DPoffice', function (req, res, next) {

            connection.execute('SELECT * FROM user_workplace_now;')
        
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