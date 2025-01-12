const exprss = require("express")
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer")
const path = require("path")

const app = exprss();
app.use(cors());
app.use(exprss.json())

const db = mysql.createConnection({
    host:"localhost",
    user : "root",
    password: "welcome" ,
    database: "school"
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/documents")
    },
    filename: function(req, file, cb) {
        return cb(null, file.originalname )
    }
})

const uploadStorage = multer({
    storage : storage
});

const storagePhoto = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images")
    },
    filename: function(req, file, cb) {
        return cb(null, file.originalname )
    }
})

const uploadStoragePhoto = multer({
    storage : storagePhoto
});

app.post("/uploadFile", uploadStorage.single('file'), (req, res) => {
    console.log("File Upload Started");
    console.log(req);
    res.json("File Uploaded...");
})

app.post("/uploadFile/:id", uploadStorage.single('file'), (req, res) => {
    console.log("File Upload Started - 1");    
    console.log(req);
    const id = req.params.id;
    console.log("File Upload Started - 1, id= "+ id);    
    console.log("File Upload Started - 1, file= "+ req.file.file);    
    console.log("File Upload Started - name = " + req.file.filename);

    const sql = "update student set file_1='"+req.file.filename+"' where id=" + id;
    db.query(sql, (err, data) => {
        if(err) { console.log(err); return res.json("Error"); }
            console.log(data);
            return res.json(data);
    });
    //res.json("File Uploaded...");
})

app.post("/uploadPhoto", uploadStoragePhoto.single('file'), (req, res) => {
    console.log("Photo Upload Started");
    console.log(req);
    res.json("Photo Uploaded...");
})

app.post("/uploadPhoto/:id", uploadStoragePhoto.single('file'), (req, res) => {
    console.log("Photo Upload Started - 1");
    const id = req.params.id;
    console.log("Photo Upload Started - id = " + id);
    console.log("Photo Upload Started - name = " + req.file.filename);
    const sql = "update student set photo_1=? where id=?";

    db.query(sql, [req.file.filename, id], (err, data) => {
        if(err) return res.json("Error : " + err);
            console.log(data);
            return res.json(data);
    });
})

app.get("/db", (req, res) => {
    console.log("Hello from Backend");
    res.json("hello database connected");
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) res.json("Error")
            return res.json(data);
    })
})

app.get("/viewStudent/:id", (req, res) => {

    console.log("view Student");
    const id = req.params.id;
    console.log("id = " + id);
    const sql = "SELECT * FROM student where id=?";

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
            console.log(data);
            return res.json(data);
    })
})

app.post("/createStudent", (req, res) => {

    console.log('create student');
    console.log("N " + req.body.name);
    console.log("@ " + req.body.email);
    console.log("m " + req.body.mobile);

    const sql = "insert into student(`name`, `mobile`, `email`) values('"+ req.body.name +"','"+ req.body.mobile +"','"+req.body.email +"')";
    const values = [ 
        req.body.name, 
        req.body.mobile,
        req.body.email
    ]
    console.log(values);

    db.query(sql, (err, data) => {
        if(err) { 
            
            console.log(err);
            return res.json("Error ");
        }
            return res.json(data);
    })
} )

app.put("/updateStudent/:id", (req, res) => {

    console.log('update student');
    console.log('name');
    console.log(req.body.name);

    console.log('email');
    console.log(req.body.email);

    const sql = "update student set `name`=?, `email`=? where id = ?";
    const values = [
        req.body.name, 
        req.body.email
    ]
    const id = req.params.id;
    console.log("id = " + id);

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
            return res.json(data);
    })
} )


app.delete("/deleteStudent/:id", (req, res) => {

    console.log('delete student');
    const sql = "delete from student where id = ?";
    const id = req.params.id;
    console.log("id = " + id);

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
            return res.json(data);
    })
} )


app.listen(8088, () => {
    console.log("listening on port 8088");
})