const router = require('express').Router();
const { Comment } = require('../../models');


//create a new comment
router.post('/', async (req, res) => {
  const commentDate = new Date();
    try {
      const newComment= await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.session.post_id,
        date: commentDate,
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
});

//edit a comment
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData[0]) {
      res.status(404).json({ message: 'This comment does not exist!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a comment

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'This comment does not exist!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;