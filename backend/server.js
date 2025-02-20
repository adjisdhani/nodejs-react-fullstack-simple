const express = require("express");
const app     = express();
const cors    = require("cors");
const mysql   = require("mysql");

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
	host     : "localhost",
	user     : "root",
	password : "" ,
	port     : 3306,
	database : "nodejs_api"
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get("/", (req, res) => {
	res.json("Hello From Backend");
})

app.get("/books/:id?", (req, res) => {
    const { id } = req.params;

    let sql;
    if (id) {
        sql = `SELECT title, author, COALESCE(DATE_FORMAT(published_date, '%Y-%m-%d'), '') AS published_date, price, id FROM books WHERE id = ?`;
    } else {
        sql = "SELECT title, author, COALESCE(DATE_FORMAT(published_date, '%Y-%m-%d'), '') AS published_date, price, id FROM books";
    }

    connection.query(sql, id ? [id] : [], (err, data) => {
        if (err) return res.json({ error: "Error" });

        return res.json(data);
    });
});

app.post("/books", (req, res) => {
	const sql    = "INSERT INTO books (`title`, `author`, `published_date`, `price`) VALUES(?)";
	const values = [
			req.body.title,
			req.body.author,
			req.body.date,
			req.body.price
	];

	connection.query(sql, [values], (err, data) => {
		if (err) return res.json("Error");

		return res.json(data);
	})
})

app.put("/books/:id", (req, res) => {
	const sql    = "UPDATE books SET `title` = ?, `author` = ?, `published_date` = ?, `price` = ? WHERE `id` = ?";
	const values = [
			req.body.title,
			req.body.author,
			req.body.published_date,
			req.body.price,
			req.params.id
	];

	connection.query(sql, values, (err, data) => {
		if (err) return res.json("Error");

		return res.json(data);
	})
})

app.delete("/books/:id", (req, res) => {
	const sql    = "DELETE FROM books WHERE `id` = ?";
	const values = [
			req.params.id
	];

	connection.query(sql, values, (err, data) => {
		if (err) return res.json("Error");

		return res.json(data);
	})
})


app.listen(8000, () => {
	console.log("berjalan di server 8000");
})