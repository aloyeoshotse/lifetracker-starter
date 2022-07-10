import express from "express"

const router = express.Router();

// Home page route.
router.get('/',  (req, res) => {
  res.json('Wiki home page');
})

// About page route.
router.get('/about', (req, res) => {
  res.json('About this wiki');
})

export default router;