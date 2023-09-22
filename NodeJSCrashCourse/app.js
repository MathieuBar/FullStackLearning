const express = module.require('express')

const app = express()
app.set('view engine', 'ejs')

app.listen(3000)

app.get('/', (req, res) => {
    const blogs = [
        { title: 'blog 1', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores facilis similique quibusdam odio ducimus ab adipisci beatae quae ad excepturi?' },
        { title: 'blog 2', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores facilis similique quibusdam odio ducimus ab adipisci beatae quae ad excepturi?' },
        { title: 'blog 3', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores facilis similique quibusdam odio ducimus ab adipisci beatae quae ad excepturi?' },
    ]
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new article' })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.render('404', { title: '404' })
})

