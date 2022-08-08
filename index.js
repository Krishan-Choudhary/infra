const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");


app.use(bodyParser.json());


const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "restapi",
});


conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM emp WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

app.post("/api/create", (req, res) => {
	let data = { name: req.body.name, salary: req.body.salary };
	let sql = "INSERT INTO emp SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added Successfully..." }));
	});
});

app.put("/api/update", (req, res) => {
	let sql = "UPDATE emp SET name='" + req.body.name + "', salary='" + req.body.salary + "' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record Updated Successfully.." }));
	});
});


app.delete("/api/delete/:id",(req,res)=>{
	let sql = "DELETE from emp WHERE id="+req.params.id+"";
	let query = conn.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(JSON.stringify({status : 200,error : null ,response : "Record deleted Successfully...."}));
	});
});

app.listen(3000, () => {
	console.log("server started");
});

