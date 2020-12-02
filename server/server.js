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

  app.post('/log',function(req,res){
    console.log(req.body);
    var id = req.body.id;
    var pw = req.body.pw;
    connection.query('INSERT INTO user (user_id, user_pw) VALUES(?, ?)',[id,pw],function(err,rows){
      if (err) {
        console.log(err);
      }else{
        console.log('완료');
      }
        
    })
})

app.post('/idcheck',function(req,res){
    var id = req.body.id;
    connection.query('select user_id from user where user_id=?',[id],function(err,rows){
      if (err) {
        console.log(err);
      }else{
        res.json(rows);

      }
            
    })
})

app.post('/login',function(req,res){
    var id = req.body.id;
    var pw = req.body.pw;
    connection.query('select user_pk,user_id,user_pw from user where user_id=?',[id],function(err,rows){
      if (err) {
        console.log(err);
      }else{
        var admin = new Object();
        admin.key = rows[0].user_pk;
        admin.id = rows[0].user_id;
        admin.boolean = false;
        if(rows[0]===undefined){ //쿼리문 항목안나오면
            res.send(admin);
            console.log("안나옴");
            
        }else if(rows[0].user_pw===pw){ //일치할떄
            admin.boolean = true;
            console.log(admin);
            res.send(admin);
            
        }else{                        //쿼리 비번이랑 받아온 비번이랑 안맞을떄
            res.send(admin);   
        }
      }             
    })
})
  
  app.post('/alarm_list_count', function (req, res){

    var user_key = req.body.user_key
    var sql =
    "SELECT COUNT(user_key) as count FROM alarm WHERE user_key = ?";
    var params = [user_key];

    connection.query(sql, params, function (err, rows) {
        if (err) {
          console.log(err);
        }
         else {
          console.log("알람 수 전송");
          res.json(rows);
        }
      })
})
app.post('/alarm_delete', function (req, res){
  var alarm_pk = req.body.alarm_key;
  var sql = 
  "DELETE FROM alarm WHERE alarm_pk = ?"  
  var params = [alarm_pk];

  connection.query(sql, params, function (err, rows) {
      if (err) {
        console.log(err);
      }
       else {
        console.log(alarm_pk+"알람 삭제");
      }
    })
})
app.post('/alarm_modify', function (req, res){

  var alarm_pk = req.body.alarm_key;
  var user_key = req.body.user_key
  var time = req.body.alarm_time;
  var mon = req.body.mon;
  var tues = req.body.tues;
  var wed = req.body.wed;
  var thu = req.body.thu;
  var fri = req.body.fri;
  var sat = req.body.sat;
  var sun = req.body.sun;
  var sql = 
  "UPDATE alarm SET mon = ?, tues = ?, wed = ?, thu = ?, fri = ?, sat = ?, sun = ?, time = ? WHERE alarm_pk = ? AND user_key = ?"  
  var check_sql = 
  "SELECT * FROM alarm WHERE user_key = ? AND mon = ? AND tues = ? AND wed = ? AND thu = ? AND fri = ? AND sat= ? AND sun = ? AND time = ?"
  var check_params = [user_key,mon, tues, wed, thu, fri, sat, sun, time ]
  var params = [mon, tues, wed, thu, fri, sat, sun, time, alarm_pk, user_key];

  connection.query(check_sql, check_params, function (err, check_rows) {
    
    if (err) {
      console.log(err);
    }else{
    
      if(check_rows[0] != undefined){
        if (err) {
          console.log(err);
        }else {
          console.log("알람 존재");
          res.json(false);
        }
      }
      else {
        connection.query(sql, params, function (err, rows) {
          if (err) {
            console.log(err);
          }else {
            console.log("알람 수정 성공");
            res.json(true);
          }
        })
      }
}
})
  
})
app.post('/alarm_list', function (req, res){
  
    var user_key = req.body.user_key

    var sql =
    "SELECT alarm_pk, mon , tues, wed , thu , fri , sat , sun , SUBSTR(time,1,5) as time FROM alarm WHERE user_key = ? ORDER BY alarm_pk";
    var params = [user_key];

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
app.post('/current_alarm', function(req,res){

  var alarm_pk = req.body.alarm_pk;
  var sql = 
  "SELECT alarm_pk, mon , tues, wed , thu , fri , sat , sun , SUBSTR(time,1,5) as time FROM alarm WHERE alarm_pk = ?"
  var params = [alarm_pk]
  connection.query(sql, params, function (err, rows) {
    if (err) {
      console.log(err);
    }
     else {
      console.log(alarm_pk+"현재 알람 전송");
      console.log(rows);
      res.json(rows);
    }
  })
})
app.post('/alarm_add', function (req, res){

    var user_key = req.body.user_key;
    var time = req.body.alarm_time;
    var mon = req.body.mon;
    var tues = req.body.tues;
    var wed = req.body.wed;
    var thu = req.body.thu;
    var fri = req.body.fri;
    var sat = req.body.sat;
    var sun = req.body.sun;
    var check_sql = 
    "SELECT * FROM alarm WHERE user_key = ? AND mon = ? AND tues = ? AND wed = ? AND thu = ? AND fri = ? AND sat= ? AND sun = ? AND time = ?"
    var sql =
    "INSERT INTO alarm (user_key, alarm_pk, mon, tues, wed, thu, fri, sat, sun, time) VALUES(?,DEFAULT,?,?,?,?,?,?,?,?)"
    var params = [user_key, mon, tues, wed, thu, fri, sat, sun, time];
    
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
app.post('/ringmybell', function(req,res){
  var user_pk = req.body.user_key;
  var date = req.body.date;
  var day = req.body.day;

  connection.query('select * from alarm where user_key=? AND time=?',[user_pk, date],function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        
      }
      if(rows[0] != undefined){
      if(rows[0].mon == 1 && day == "Mon"){
          res.send(true)
      }
      else if(rows[0].tues == 1 && day =="Tue"){
          res.send(true)
      }
      else if(rows[0].wed == 1 && day =="Wed"){
          res.send(true)
      }
      else if(rows[0].thu == 1 && day =="Thu"){
          res.send(true)
      }
      else if(rows[0].fri == 1 && day =="Fri"){
          res.send(true)
      }
      else if(rows[0].sat == 1 && day =="Sat"){
          res.send(true)
      }
      else if(rows[0].sun == 1 && day =="Sun"){
          res.send(true)
      }
      else{
          res.send(false)
      }
                            }
      else{
          res.send(false)
      }
  })
})
http.listen(port, () => console.log(`Example app listening on port ${port}!`))