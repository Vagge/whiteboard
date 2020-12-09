const express = require('express');
const Whiteboard = require('../model/WhiteBoard')
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
router.get('/', async (req, res)=>
{
    Whiteboard.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('app', { items: items }); 
        } 
    }); 
});

router.get('/board', async (req, res)=>
{
    try
    {
        res.sendFile(path.join(__dirname + '/board.html'));
    }
    catch(err)
    {
        res.json({message: err});
    }
});

router.get('/board/:title', async (req, res)=>
{
    try
    {
        const board = await Whiteboard.findOne({title: req.params.title});
        if(!board)
        {
            res.status(404).send('Could not find board');
        }
        res.render('board', {board: board});
    }
    catch(err)
    {
        res.json({message: err});
    }
});


router.post('/', upload.single('whiteboardImage'),async(req,res)=>
{
    console.log(req.body);
    const whiteboard = new Whiteboard({
        title: req.body.title,
        img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)), 
            contentType: 'image/png'
        }
    });
    try
    {
        const board = await whiteboard.save();
        res.render('board', {board: board});
    }catch(err)
    {
        res.json({message: err});
    }
});

module.exports = router;