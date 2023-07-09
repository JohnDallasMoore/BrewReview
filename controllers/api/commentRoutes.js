const router = require('express').Router();
const { Comment } = require('../../models');

//create a new comment
router.post('/', async (req, res) => {
  console.log(req.session.userId);
    try {
      const newComment= await Comment.create({
        user_id: req.session.userId,
        ...req.body
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