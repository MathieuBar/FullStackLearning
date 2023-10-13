const Blog = module.require('../models/Blog');

const controller = {
    getHomePage: getHomePage,
    getCreatePage: getCreatePage,
    getDetailsPage: getDetailsPage,
    postPost: postPost,
    deletePost: deletePost,
}

module.exports = controller

function getHomePage(req, res) {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('blogs/index', {
            title: 'All blogs',
            blogs: result,
        }))
        .catch(err => console.log(err))
}

function getCreatePage(req, res) {
    res.render('blogs/create', { title: 'Create a new blog' })
}

function getDetailsPage(req, res) {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => res.render('blogs/details', {
            title: `Post | ${result.title}`,
            blog: result,
        }))
        .catch((err) => {
            res.status(404).render('404', {title: 'Blog not found'})
        })
}

function postPost(req, res) {
    const formContent = req.body;
    const blog = new Blog(formContent) // todo : ensure input data
    blog.save()
        .then((result) => res.redirect('/'))
        .catch((err) => console.log(err))
        ;
}

function deletePost(req, res) {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' })
        })
}