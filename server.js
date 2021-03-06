const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
// const dbConnection = require("./dbconfig");
const tblFacultyInfo = require("./models/faculty.js");
const mysql = require('mysql');
const tblfeedbackInfo = require("./models/feedback.js");
const fs = require("fs");

// const {insertFaculty, displayInfoById, displayInfoByAdmissionYear, displayAll} = require('./src/controllers/student.controller');
// const insertfeedback = require("./controllers/feedback_controller.js");
const insertFaculty = require("./controllers/faculty_controller.js");
const {insertfeedback, displayInfoById} = require('./controllers/feedback_controller.js');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    // let viewProfileTemplate = fs.readFileSync(__dirname + "/models/users.html", "utf-8");
    // res.contentType("text/html");
    // res.send(viewProfileTemplate);
    res.sendFile(__dirname + "/models/users.html");
});



app.get("/db-create", (req, res) => {
  const dbQuery = "CREATE DATABASE IF NOT EXISTS dbfeedback";
  dbConnection.query(dbQuery, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      message: "dbfeedback Database successfully created.",
    });
  });
});

app.get("/db-create-table/:type", (req, res) => {
  let dbTable;
  let type = req.params.type;

  if (type == "faculty") {
    dbTable = tblFacultyInfo;
  } else if (type == "feedback") {
    dbTable = tblfeedbackInfo;
  } else {
    return res.status(400).json({
      error: "Type Specified is Invalid.",
    });
  }

  dbConnection.query(`USE dbfeedback`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Database cant be accessed.",
      });
    }
    dbConnection.query(dbTable, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Table could not be created.",
        });
      }
      return res.status(200).json({
        message: `tbl${type}Info Table was successfully created.`,
      });
    });
  });
});

const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database:'dbfeedback'
});

dbConnection.connect((err) => {
    if(err){
        throw err;
    }
    console.log("Connected successfully to MySQL Server.");
});

app.post('/myaction', function(req, res) {

    console.log('req.body');
    console.log(req.body);
    res.write('Student Id: "' + req.body.sname+'".\n');
    res.write('Faculty Id: "' + req.body.fname+'".\n');
    res.write('1.Effectively utilizes the classroom interaction time for syllabus transaction; illustrate the concepts through examples & applications and creates interest in the course?  "' + req.body.q1+'".\n');
    res.write('2.Is fair in evaluation aspects of internal examination? "' + req.body.q2+'".\n');
    res.write('3.Makes efforts to inculcate life skills and employability/ Professional skills to make you ready for the world of work. "' + req.body.q3+'".\n');
    res.write('4.Comes prepared for the class and has helpful approach to the students. "' + req.body.q4+'".\n');
    res.write('5.Discusses about expected competencies, Course outcomes, Program outcomes and lesson planning with thestudents."' + req.body.q5+'".\n');
    res.write('6.Utilizes student centric methods, such as experiential learning, participative learning and problem solving methodologies for enhancing learning experiences. "' + req.body.q6+'".\n');
    res.end()
    
    dbConnection.query("Insert into tblfeedbackInfo (feedbackId,facultyId,Q1,Q2,Q3,Q4,Q5,Q6) VALUES ('"+req.body.sname+"','"+req.body.fname+"','"+req.body.q1+"','"+req.body.q2+"','"+req.body.q3+"','"+req.body.q4+"','"+req.body.q5+"','"+req.body.q5+"')",function(err, result)      
    {                                                      
      if (err)
         throw err;
    });
    });



app.post("/db-insert/:type", (req, res) => {
  let dbRow;
  let type = req.params.type;

  if (type == "faculty") {
    dbRow = insertFaculty(req, res);
  }
  // else if (type == "competitiveexam") {
  //     dbRow = insertCompetitiveExam(req, res);
  // } else if (type == "admission") {
  //     dbRow = insertAdmission(req, res);
  // }
  else {
    return res.status(400).json({
      error: "Type Specified is Invalid.",
    });
  }

  dbConnection.query(`USE dbfeedback`, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Database cant be accessed.",
      });
    }
    dbConnection.query(dbRow, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Rows could not be inserted.",
        });
      }
      return res.status(200).json({
        message: `${type}Info Inserted Successfully in tbl${type}Info .`,
      });
    });
  });
});


app.get('/db-display-id/:id', (req, res)=>{
    let id = req.params.id;
    
    dbConnection.query(`USE dbfeedback`, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: "Database cant be accessed."
            })
        }
        dbConnection.query(displayInfoById(id), (err, result) => {
            
            return res.status(200).json(result);
        })
    })
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
