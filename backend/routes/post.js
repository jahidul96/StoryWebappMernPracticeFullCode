const router = require('express').Router();
const userMiddleware = require('../middleware/userMiddleware');
const Post = require('../models/post')


router.get('/allpost', async (req, res) => {
    try {
        const allpost = await Post.find().populate('postedBy comments.postedBy', '_id username')
        res.json(allpost)
    } catch (error) {
        res.status(404).json("server side error")
    }
})



router.get('/singlepost/:id', async (req, res) => {
    try {
        const singlepost = await Post.findById(req.params.id).populate('postedBy comments.postedBy', '_id username')
        res.json(singlepost)
    }
    catch (error) {
        res.json("server side error")
    }
})

router.post('/createpost', userMiddleware, async (req, res) => {
    const { title, description, photo } = req.body;
    try {
        req.user.password = undefined;
        req.user.__v = undefined
        const post = new Post({
            title,
            description,
            photo,
            postedBy: req.user
        });
        await post.save();
        res.status(201).json("succesfully post created")
    } catch (err) {
        res.status(404).json("server side error")
    }
})

router.delete('/deletepost/:id', async (req, res) => {
    const deletepost = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json('post deleted')
})


router.put('/like', userMiddleware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/unlike', userMiddleware, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})


module.exports = router