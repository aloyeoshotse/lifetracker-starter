import express from "express"

const router = express.Router();


router.get('/',  (req, res) => {
  res.json('Wiki home page');
})

// About page route.
router.get('/about', (req, res) => {
  res.json('About this wiki');
})

export default router;