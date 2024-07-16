'use strict';

const express = require('express');
const Amd_udRoute = express.Router();
const connection = require('../db');

Amd_udRoute.put('/api/admin/:amd_id', function(req, res, next){
    const now = new Date().toISOString().slice(0,19).replace('T', ' ');
    connection.execute("UPDATE ADMIN SET admin_Fname=? ,admin_Lname=? , admin_tel=? ,updated_at=? WHERE admin_id =?",
        [req.body.First_name , req.body.Last_name, req.body.tel, now, req.params.amd_id]
    ).then(() =>{
        console.log('OK')
    }).catch((err) => {
        console.log(err);
    });
    res.status(200).send("Update Successfully.");
});

Amd_udRoute.delete('/api/Admin/:amd_id',function(req,res,next){
    connection.execute("DELETE FROM Admin WHERE admin_id=?;",
        [req.params.amd_id]
    ).then(() =>{
        console.log('ok');
    }).catch((err) =>{
        console.log(err);
    });
    res.status(200).send("Delete Successfully.");
    res.end();
});

Amd_udRoute.use('/', function (req, res, next) {

    res.sendStatus(404);

})

module.exports = Amd_udRoute;