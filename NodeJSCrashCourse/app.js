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
app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => res.render('index', {
      title: 'All blogs',
      blogs: result,
    }))
    .catch(err => console.log(err))
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.post('/blogs', (req, res) => {
  const formContent = req.body;
  const blog = new Blog(formContent) // todo : ensure input data
  blog.save()
    .then((result) => res.redirect('/blogs'))
    .catch((err) => console.log(err))
    ;
})

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => res.render('details', {
      title: `Post | ${result.title}`,
      blog: result,
    }))
    .catch((err) => console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs'})
    })
})


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
