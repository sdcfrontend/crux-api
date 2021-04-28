const router = require('express').Router();
const verify = require('./verify-token');

router.get('/', verify, (req, res) => {
  res.json({
    posts: {
      title: 'Secret',
      description: 'secret',
      user: req.user
    }
  });
});

module.exports = router;