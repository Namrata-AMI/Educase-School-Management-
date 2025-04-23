require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require("mongoose");
const schoolRoutes = require("./routes/school.js");
const app = express();

const dbUrl = process.env.MONGO_URL;

app.use(bodyParser.json())

app.use('/', schoolRoutes);


main()
.then((res)=>{
    console.log(res);
    console.log("working db");
})
.catch((e)=>{
    console.log(e);
    console.log("db error");
})

async function main(){
    await mongoose.connect(dbUrl);
}


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
