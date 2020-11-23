const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
var mysql = require('mysql');
const bodyParser = require('body-parser');
var http = require('http').createServer(app);

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dja1wkd2",
    database: "alarm",
  });
  connection.connect();
  app.use(express.json())
  app.use(express.urlencoded({extended : true}));
  app.use(cors());


app.use('/alarm_list', function (req, res){

    // var user_pk = req.body.user_pk;
    var user_pk = 1;

    var sql =
    "SELECT * FROM alarm WHERE user_pk = ?";
    var params = [user_pk];

    connection.query(sql, params, function (err, rows) {
        if (err) {
          console.log(err);
        }
         else {
          console.log("알람 리스트 전송 성공");
          res.json(rows);
        }
      })
})
app.post('/alarm_add', function (req, res){
if(req.body == undefined){
  console.log("!!!!");
}
console.log(req.body)
    // var user_pk = req.body.user_pk;
    var user_pk = 1; //Test 1
    var mon = req.body.mon;
    var tues = req.body.tues;
    var wed = req.body.wed;
    var thu = req.body.thu;
    var fri = req.body.fri;
    var sat = req.body.sat;
    var sun = req.body.sun;
    var time = req.body.alarm_time;
    var check_sql = 
    "SELECT * FROM alarm WHERE user_key = ? AND mon = ? AND tues = ? AND wed = ? AND thu = ? AND fri = ? AND sat= ? AND sun = ? AND time = ?"
    var sql =
    "INSERT INTO alarm (user_key, alarm_pk, mon, tues, wed, thu, fri, sat, sun, time) VALUES(?,DEFAULT,?,?,?,?,?,?,?,?)"
    var params = [user_pk, mon, tues, wed, thu, fri, sat, sun, time];
    
    connection.query(check_sql, params, function (err, check_rows) {
    
      if (err) {
        console.log(err);
      }else{
        console.log(check_rows);
    if(check_rows[0] != undefined){
      if (err) {
        console.log(err);
      }
       else {
        console.log("알람 존재");
        res.json(false);
      }
    }
    else {
      connection.query(sql, params, function (err, rows) {
        if (err) {
          console.log(err);
        }
         else {
          console.log("알람 추가 성공");
          res.json(true);
        }
      })
    }
  }
  })
    
})

http.listen(port, () => console.log(`Example app listening on port ${port}!`))