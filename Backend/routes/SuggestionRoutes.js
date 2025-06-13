const express = require('express');
const router = express.Router();
const SuggestionModel = require('../models/Suggestion');


router.get('/', async (req, res) => {
  try {
    const news = await SuggestionModel.find(); 
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req,res) => {
  try{
    await SuggestionModel(req.body).save();
    res.json({message:"Added Suggestion Successfully!"})
    console.log({message:"Added Suggestion Successfully!"})
  } catch(err){
    res.json({message: err})
    console.log(err)
  }
}
)

module.exports = router;