const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mysql = require('mysql')
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "address"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});

app.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:4000/images/' + req.file.filename
        var insertData = "INSERT INTO users(`image`)VALUES(?)"
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

app.get('/',(req,res)=>{
    console.log('root')
})


app.get('/address',(req,res)=>{
    console.log('hello world');
    db.query("select * from users",(err,data)=>{
        if(!err){
            //console.log(data);
            res.send(data);
        }
        else{
            console.log(err)
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Server On : http://localhost:${PORT}`);
})