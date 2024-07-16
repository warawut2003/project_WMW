'use strict';

const express = require('express');
const crypto = require('crypto');
const adm_wrRoute = express.Router();
const connection = require('../db');
const { createPool } = require('mysql2');

adm_wrRoute.post('/api/admin/add',async function(req,res,next){
    const { username,password,First_name , Last_name,Image,tel,email } = req.body;
    if (!username ||!password ||!First_name || !Last_name || !Image || !tel || !email) {
        return res.status(400).send('Missing required fields');
    }

    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    const now = new Date().toISOString().slice(0,19).replace('T',' ');

    try {
        const [rows] = await connection.query('SELECT admin_id FROM ADMIN ORDER BY admin_id DESC LIMIT 1');
        let newAdminId = '01';
        if (rows.length > 0) {
            let lastAdminId = parseInt(rows[0].admin_id, 10);
            newAdminId = (lastAdminId + 1).toString().padStart(2, '0');
        }

        await connection.execute(
            `INSERT INTO ADMIN(admin_id, admin_user, admin_password, admin_Fname, admin_Lname, admin_image, admin_tel, admin_email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                newAdminId, username, mypass, First_name, Last_name, Image, tel, email, now, now
            ]
        );

        console.log("Insert successfully");
        res.status(201).send('Admin added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting admin');
    }
});

adm_wrRoute.get('/api/admin/display', function (req, res, next) {

    connection.execute('SELECT * FROM ADMIN;')

    .then((result) => {

       var rawData = result[0];

       res.send(rawData);

       

    }).catch((err) => {

       console.log(err);

       res.end();

    });

});

adm_wrRoute.post('/api/admin/check', function(req, res, next){
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");

    connection.execute('SELECT * FROM ADMIN WHERE admin_user=? AND admin_password=?',
        [req.body.username, mypass]
    ).then((result) =>{
        var data = result[0];
        if(data.length === 0){
            res.status(400).send('Admin not found');
        }else{
            res.status(200).send('Admin authenticated')
        }
    }).catch((err) =>{
        console.log(err);
        res.status(500).end('Error fetching Admin')
    })
})

module.exports = adm_wrRoute;
