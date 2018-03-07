var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 5000;
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('ucla_3', 'root', '', {
  dialect: 'mysql',
  operatorsAliases: false
});



const Note = sequelize.define('note', {
  title: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.TEXT
  }
});

// force: true will drop the table if it already exists
Note.sync().then(() => {
  // Table created
  
  // Note.create({
  //   title: 'Note 1',
  //   details: 'Details about note 1'
  // });

});

// console.log(path.join(__dirname, 'public'));

var app = express(); // Self Instantiating Constructor

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  Note.findAll().then(function(data) {
    response.render('index', { notes: data });
  });
});

app.post('/notes', function(request, response) {
  // request.body
  Note.create(request.body).then(function() {
    // console.log('created note');
    response.redirect('/');
  });
});


app.listen(port, function() {
  console.log('Listening on port ' + port);
});

















// var test = false || 'hey there' || 0 || null || 100;

// console.log(test);






// var people = [
//   {
//     name: 'JD',
//     age: 38
//   },
//   {
//     name: 'Sarah',
//     age: 34
//   },
//   {
//     name: 'Bob',
//     age: 99
//   }
// ];
// // Routes
// // Request --> How the frontend interacts with the backend
// // Response --> How we interact from the backend to the frontend
// app.get('/', function(request, response) {
//   response.render('index', { 
//     name: 'JD',
//     fruits: ['apple', 'orange', 'grape'],
//     people: people 
//   });
// });

// app.get('/test', function (request, response) {
//   response.render('test');
// });

// app.post('/people', function(request, response) {
//   // console.log(request.body);

//   if ( request.body.name && request.body.age ) {
//     people.push(request.body);
//     response.redirect('/');
//   }

// });




















// {
//   listen: function(port) {
//     http.createServer(port);
//   }
// }



// function Person(name, age) {
//   this.name = name; 
//   this.age = age;
// }

// var jd = new Person('JD', 38);

