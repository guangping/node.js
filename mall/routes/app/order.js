var express = require('express');
var router = express.Router();


router.get('/id/:id',function(req,res,next){
    var id=req.params.id;
    res.send('id==>'+id);
})

router.post('/delete/:id',function(req,res,next){
    var id=req.params.id;
    res.send('delete id==>'+id);
})
module.exports = router;







