const express = require('express');
const cors = require("cors");
const db = require('./config/db.js');
const path = require("path");
const bodyParser = require('body-parser');
const multer = require("multer");
const uuid4 = require("uuid4");
const app = express();
const PORT = process.env.PORT || 4000;
let imgName;
app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })) ;
app.use(express.json());
app.use(bodyParser.json());

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, '../src/img');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const randomId = uuid4();
            imgName = randomId + ext;
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

app.post('/upload',upload.single('img'),(req,res)=>{
    console.log(req);
    res.send(imgName);
})


app.listen(PORT,()=>{
    console.log(`Server On : http://localhost:${PORT}`);
})