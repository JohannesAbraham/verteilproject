const express = require('express');
const router = express.Router();
const NewsModel = require('../models/News');


router.get('/', async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ publishDate: -1 }); 
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req,res) => {
  try{
    await NewsModel(req.body).save();
    res.json({message:"Added News Article Successfully!"})
    console.log({message:"Added News Article Successfully!"})
  } catch(err){
    res.json({message: err})
    console.log(err)
  }
}
)

module.exports = router;