require('dotenv').config();


const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose  = require("mongoose");
const schoolRoutes = require("./routes/school.js");
const app = express();

const dbUrl = process.env.MONGO_URL;

app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', schoolRoutes);

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

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
