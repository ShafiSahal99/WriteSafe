const path = require("path");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


mongoose.connect(
  "mongodb+srv://ShafiSahal:" +
   process.env.MONGO_ATLAS_PW +
    "@cluster0-lsrf0.mongodb.net/node-angular?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true})
	.then(() => {
		console.log("Connected to database");
	})
	.catch(() => {
		console.log("Connectoin failed");
	});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));


/*app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, x-Requested-With, Content-Type, Accept, Authorization"
	);

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});*/
//BDk1IEFrmyKkbCXJ

app.use("/api/posts/", postsRoutes);
app.use("/api/user/", userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
