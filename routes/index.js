var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express.Router();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/register', function (req, res, next){
	res.render('register');
});

app.get('/auth/:email', function (req,res,next){
	var email = req.params.email
	isRegistered(email,function(match){
		if(match){
			console.log('already registered, redirect to wait');
			res.redirect('/')
		}else{
			console.log('not registered, redirect to typeform')
			res.redirect('https://ichauster.typeform.com/to/mCEJwM')
		}
	})
});

app.get('/forms', function (req,res,next){
	console.log("reached");
	fs.readFile("./public/waiver.pdf", function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
});

function isRegistered(em,callback){
	var match = false;
	var req = {
		method:"GET",
		url : 'https://api.typeform.com/v1/form/mCEJwM?key=8db8603fab6dab388dbce75a901979a4e53bbe91&completed=true',
		headers : {'cache-control':'no-cache'}
	}
	request(req, function (error, response, body){
		if (error) throw new Error(error);
		var str = JSON.parse(body);
		var responses = str.responses
		for(i in str.responses){
			var a = str.responses[i].answers;
			var email = a["email_ZnFSgexKILay"];
			console.log(email)
			if(em == email){
				console.log(em,email)
				match = true;
			}
		}
		console.log(match);
		callback(match);
		return match;
	});
}
module.exports = app;
