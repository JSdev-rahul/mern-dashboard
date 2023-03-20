const express = require("express");
const cors = require("cors");
const Connection = require("./database/db.js");
const users = require("./model/users.js");
const route = require("./router/route.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',route)
Connection()
app.listen(3300,()=>{
  
});
