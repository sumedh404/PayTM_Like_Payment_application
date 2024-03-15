
// import cors from "cors";
const cors = require("cors");

const express = require("express");
const mainRouter = require('./routes/index')
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter)





app.listen(port, ()=>{
    console.log(`Port running on ${port}`);
})




//  /api/v1/user/signin
//  /api/v1/user/signup
//  /api/v1/user/passwordChange




// /api/v1/account/ transferMoney
// /api/v1/account/ CheckBalance