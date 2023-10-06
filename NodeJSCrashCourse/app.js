const fs = module.require('fs');
const express = module.require('express');
const morgan = module.require('morgan');
const Blog = module.require('./models/Blog');
const mongoose = module.require('mongoose');

// express app
const app = express();

// db connexion
fs.readFile('./resources/connexionString', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const connexionString = data.toString();
    mongoose.connect(connexionString)
      .then(app.listen(3000, () => console.log('server listening to port 3000')))
      .catch(err => console.log(err))
      ;
  }
});

// listen for requests

// register view engine
app.set('view engine', 'ejs');

// middleware : logger 'morgan' and static pages
app.use(morgan('dev'));
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then(result => res.render('index', {
      title: 'All blogs',
      blogs: result,
    }))
    .catch(err => console.log(err))
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
