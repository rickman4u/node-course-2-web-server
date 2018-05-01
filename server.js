const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');


app.use((req,res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method}+ ${req.url}`;

  fs.appendFile('myServerLog.txt',log+ '\n',(err) => {
        if(err){
          console.log('Some error happened writing log');
        }
  });
  next();
});

app.use((req,res, next) => {
  res.render('maintenance.hbs',{
    welcomeMsg: 'Site being updated please call back later',
    pageTitle: 'Maintenance'
  });
});

app.use(express.static(__dirname + '/public' ));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()+' Cool Dude';
})


hbs.registerHelper('screamIT',(text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    welcomeMsg: 'Hi there welcome to my node express app',
    pageTitle: 'Home',
    // currentYear: new Date().getFullYear()
  });
 });

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About',
    // currentYear: new Date().getFullYear()
  });
});


app.get('/project',(req,res) => {
  res.send('<h1>Project Page</h1>');
})

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
    errorCode:[
      12221,
      1221
    ]
  });
});

app.listen(port,() => {console.log(`Server started on port ${port}`);});
