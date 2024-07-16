const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

const adm_wrRoute = require('./routes/Adm_writeRead');
const adm_ud_Route = require('./routes/Adm_Update_Delete');

const User_WRoute = require('./routes/User_Write_Read');
const User_ud_Route = require('./routes/User_Update_Delete');

app.use('/wr',adm_wrRoute);
app.use('/ud',adm_ud_Route);

app.use('/user/wr',User_WRoute);
app.use('/user/ud',User_ud_Route);

app.use('/',function(req,res,next){
    res.sendStatus(404).send("Path Error");
});

app.listen(PORT,()=>
    console.log('Server running on port:'+ PORT)
);