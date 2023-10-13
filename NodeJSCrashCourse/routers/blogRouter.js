const express = module.require('express');
const controller = module.require('../controllers/blogController.js')
const Blog = module.require('../models/Blog');

const router = express.Router()

router.get('/', controller.getHomePage)
router.get('/create', controller.getCreatePage)
router.post('/', controller.postPost)
router.get('/:id', controller.getDetailsPage)
router.delete('/:id', controller.deletePost)

module.exports = router;