const fs = module.require('fs');
const express = module.require('express');
const morgan = module.require('morgan');
const mongoose = module.require('mongoose');
const blogRouter = module.require('./routers/blogRouter');

// express app
const app = express();

// db connexion
fs.readFile('./resources/connexionString', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const connexionString = data.toString();
    mongoose.connect(connexionString)
      .then(() => app.listen(3000, () => console.log('server listening to port 3000')))
      .catch(err => console.log(err))
      ;
  }
});

// register view engine
app.set('view engine', 'ejs');

// middleware : logger 'morgan', static pages, urlencoder
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
