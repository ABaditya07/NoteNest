import express from 'express';
import blogController from '../controllers/blogController.js';  
const router = express.Router();


// Create a new blog post
router.post('/', blogController.createBlog);   // POST /api/blogs

// Get all blog posts
router.get('/', blogController.getAllBlogs);    // GET /api/blogs

// Get a single blog post by ID
router.get('/:id', blogController.getBlogById);    // GET /api/blogs/:id

// Update a blog post by ID
router.put('/:id', blogController.updateBlogById);   // PUT /api/blogs/:id

// Delete a blog post by ID
router.delete('/:id', blogController.deleteBlogById);  // DELETE /api/blogs/:id

// Comment a blog post by ID
router.post('/:id/comment', blogController.commentBlog);   // POST /api/blogs/:id/comment

// bookmarked a blog post
router.put('/:id/save', blogController.toggleSaveBlog);   // Put /api/blog/:id/save

// Get blogs saved by a user
router.get('/saved/:userId', blogController.getSavedBlogs);  // GET /api/blogs/saved/:userId

export default router;