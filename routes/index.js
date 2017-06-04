var express = require('express');
var router = express.Router();
var User=require('../lib/User');
var Career=require('../lib/Career');
var FB = require('facebook-node');
var mongoose = require('mongoose');
FB.setApiVersion("v2.2");
FB.setAccessToken('EAACEdEose0cBAIYzGQI9VtZCFYcJfFOjuWmd24DtAEHZCtCO9ZC7ES5t6SgkBRxDLRljMJO4ZCOaZAfkCMGKp1gvWgzZBl383aR9X7AvLUhLRBiGrtNAh0Yx9eFThUkIYI4jz2KBzb1tDXeLNqwBHOhyMkzu7X7MmxHShneITPnf2dcT7M0xHVFd0ZCvhVigXsZD');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req,res){
 res.render('login');
});
router.post('/login',function(req,res){
  var username=req.body.username;
  var password=req.body.password;

User.findOne({username: username, password: password},function(err,user){
  if(err){
    console.log(err);
    return res.status(500).send();
  }
  if(!user){
    res.render('notfound');
      res.redirect('/login');
  }
  else{
  req.session.user=user;
  res.redirect('/dashboard');
  }
})
});
router.get('/dashboard', function(req,res){
  if(!req.session.user){
    res.redirect('/login');
  }
  res.render('welcome');
})
router.get('/career', function(req, res, next){
Career.find(function(err, docs){
	console.log(docs);
res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(docs));
})
});
router.post('/deldata', function(req, res, next){
 var id=req.body._id;
 console.log(id);
 var oid = mongoose.Types.ObjectId(id);
 Career.findByIdAndRemove(oid, function (err, docs) {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    	 if (err) {
        res.status(500).send(err);
    }
	else{
		res.status(200).send(err);
		//console.log(docs);
	}
});
/*Career.findById(oid,function(err,docs) {
	 if (err) {
        res.status(500).send(err);
    }
	else{
		res.status(200).send(err);
		//console.log(docs);
	}
})*/
});
router.post('/careerup', function (req, res) {
  var id=req.body._id;
  var oid = mongoose.Types.ObjectId(id);
  var title=req.body.title;
  var technology=req.body.technology;
  var minexp=req.body.minexp;
  var maxexp= req.body.maxexp;
  console.log(req.body.technology);
  var description= req.body.description;
  var email= req.body.email;
  var city= req.body.city;
  var location= req.body.location;
  var newcareer=new Career();
   newcareer.title=title;
   newcareer.technology=technology;
   newcareer.minexp=minexp;
   newcareer.maxexp=maxexp;
   newcareer.description=description;
   newcareer.city=city;
   newcareer.location=location;
   newcareer.email=email;
console.log(id);
console.log(id);
console.log(id);
console.log(id);
console.log(id);
console.log(id);
console.log(oid);
console.log(oid);
console.log(oid);
console.log(oid);
console.log(title);
Career.findById(oid,function(err,docs) {
	 if (err) {
        res.status(500).send(err);
    }
	else{
		res.status(200).send(err);
		console.log(docs);
		docs.title=title;
			docs.technology=technology;
   docs.minexp=minexp;
   docs.maxexp=maxexp;
   docs.description=description;
   docs.city=city;
   docs.location=location;
   docs.email=email;
    docs.save(function (err, todo) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send();
        });
	}
});
/*Career.find({_id:oid},function(err,docs) {
    if(err) {
console.log(err);
		throw err;
		res.status(500).send(err);
		}
		else{
			console.log(docs);
			 docs.title=title;
			docs.technology=technology;
   docs.minexp=minexp;
   docs.maxexp=maxexp;
   docs.description=description;
   docs.city=city;
   docs.location=location;
   docs.email=email;
    docs.save(function (err, todo) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send();
        });
		
		}
    //...
});
*/
}); 
router.post('/career', function(req,res){
  var title=req.body.title;
  var technology=req.body.technology;
  var minexp=req.body.minexp;
  var maxexp= req.body.maxexp;
  console.log(req.body.technology);
  var description= req.body.description;
  var email= req.body.email;
  var city= req.body.city;
  var location= req.body.location;
  var newcareer=new Career();
  var post='job openings \n Designation: '+title.concat('\n experience: ',minexp,' to  ',maxexp,' years \n description: ',description,'\n email: ',email,'\n city: ',city,'\n location:',location);
  console.log(post);
  newcareer.title=title;
   newcareer.technology=technology;
   newcareer.minexp=minexp;
   newcareer.maxexp=maxexp;
   newcareer.description=description;
   newcareer.city=city;
   newcareer.location=location;
   newcareer.email=email;
   newcareer.save(function(err,savedCareer){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
        var body = 'My first post using facebook-node';
   FB.api('me/feed', 'post', { message: post}, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});
    return res.status(200).send();

  })
})
router.post('/register', function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  var firstname=req.body.firstname;
  var lastname= req.body.lastname;
  var newuser=new User();
  newuser.username=username;
  newuser.password=password;
  newuser.firstname=firstname;
  newuser.lastname=lastname;
  newuser.save(function(err,savedUser){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  })
})
module.exports = router;
