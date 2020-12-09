const express = require('express');
const Post = require('../model/Post')
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res)=>{
    try
    {
        res.sendFile(path.join(__dirname + '/index.html'));
    }
    catch(err)
    {
        res.json({message: err});
    }
});

router.post('/', async (req,res)=>
{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try
    {
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err)
    {
        res.json({message: err});
    }
    

}); 

router.get('/:postId', async(req, res)=>
{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err)
    {
        res.json({message: err});
    }
});

module.exports = router;