'use strict';

const express = require('express');
const User_udRoute = express.Router();
const connection = require('../db');

User_udRoute.put('/api/UpdatePersonal/:user_id', function(req, res, next){
    const now = new Date().toISOString().slice(0,19).replace('T', ' ');
    connection.execute("UPDATE user_personal SET User_Fname=?, User_Date_Birth=? , User_age=?, User_Blood_Type=?, Update_at=? WHERE User_id=?",
        [req.body.Fname,req.body.Date_Birth, req.body.age, req.body.Blood_Type, now, req.params.user_id]
    ).then(() =>{
        console.log('Update Successfully');
        res.status(200).send("Update Successfully.");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error updating user.");
    });
});

User_udRoute.delete('/api/DeletePersonal/:user_id',function(req,res,next){
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

//ลบ แก้ไข้ ข้อมูลพ่อแม่

User_udRoute.put('/api/UpdateParents/:user_id', function(req, res, next){

    connection.execute("UPDATE user_parents SET father_Occupation=?, mother_Occupation=?  WHERE U_id=?",
        [req.body.father_Occupation,req.body.mother_Occupation, req.params.user_id]
    ).then(() =>{
        console.log('Update Parents Successfully');
        res.status(200).send("Update Parents Successfully.");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error updating user.");
    });
});

User_udRoute.delete('/api/DeleteParents/:user_id',function(req,res,next){
    connection.execute("DELETE FROM user_parents WHERE U_id =?;",
        [req.params.user_id]
    ).then(() =>{
        console.log(`Delete Parents ${req.params.user_id}  Successfully.`);
    }).catch((err) =>{
        console.log(err);
    });
    res.status(200).send(`Delete Parents ${req.params.user_id}  Successfully.`);
    res.end();
});

//แก้ไข ลบ ที่อยู่

User_udRoute.put('/api/UpdateAddress/:user_id', function(req, res, next){
    
    connection.execute("UPDATE user_address SET house_num=?, villageNum=? ,alley=? ,street=? ,sub_district=? ,district=? ,province=?,postal_code=?  WHERE U_id=?",
        [req.body.house_num, req.body.villageNum, req.body.alley, req.body.street , req.body.sub_district, req.body.district, req.body.province, req.body.postal_code, req.params.user_id]
    ).then(() =>{
        console.log('Update Address Successfully');
        res.status(200).send("Update Address Successfully.");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error updating user.");
    });
});

User_udRoute.delete('/api/DeleteAddress/:user_id',function(req,res,next){
    connection.execute("DELETE FROM user_address WHERE U_id =?;",
        [req.params.user_id]
    ).then(() =>{
        console.log(`Delete Address ${req.params.user_id}  Successfully.`);
    }).catch((err) =>{
        console.log(err);
    });
    res.status(200).send(`Delete Address ${req.params.user_id}  Successfully.`);
    res.end();
});

//แก้ไข ลบ ที่อยู่ ที่ทำงาน
User_udRoute.put('/api/udOffice/:user_id', function(req, res, next){
    
    connection.execute("UPDATE user_workplace_now SET Office_Name=?, Job_position=? ,Salary=? ,Office_phone=? ,Office_fax=?  WHERE U_id=?",
        [req.body.Office_Name, req.body.Job_position, req.body.Salary, req.body.Office_phone , req.body.Office_fax,req.params.user_id]
    ).then(() =>{
        console.log(`Update Workplace Now ${req.params.user_id} Successfully`);
        res.status(200).send(`Update Workplace ${req.params.user_id} Now Successfully.`);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Error updating user.");
    });
});

User_udRoute.delete('/api/DelOffice/:user_id',function(req,res,next){
    connection.execute("DELETE FROM user_workplace_now WHERE U_id =?;",
        [req.params.user_id]
    ).then(() =>{
        console.log(`Delete Workplace Now ${req.params.user_id}  Successfully.`);
    }).catch((err) =>{
        console.log(err);
    });
    res.status(200).send(`Delete Workplace Now ${req.params.user_id}  Successfully.`);
    res.end();
});

module.exports = User_udRoute;