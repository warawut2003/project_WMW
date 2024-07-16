'use strict';

const express = require('express');
const User_udRoute = express.Router();
const connection = require('../db');

User_udRoute.put('/api/Update/:user_id', function(req, res, next){
    const now = new Date().toISOString().slice(0,19).replace('T', ' ');
    connection.execute("UPDATE user_personal SET User_Fname=?, User_age=?, User_Blood_Type=?, Update_at=? WHERE User_id=?",
        [req.body.Fname, req.body.age, req.body.Blood_Type, now, req.params.user_id]
    ).then(() =>{
        console.log('Update Successfully');
        res.status(200).send("Update Successfully.");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error updating user.");
    });
});

User_udRoute.delete('/api/Delete/:user_id',function(req,res,next){
    connection.execute("DELETE FROM user_personal WHERE User_id =?;",
        [req.params.user_id]
    ).then(() =>{
        console.log('ok');
    }).catch((err) =>{
        console.log(err);
    });
    res.status(200).send("Delete Successfully.");
    res.end();
});

module.exports = User_udRoute;