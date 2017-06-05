var express = require('express');
var router = express.Router();
var FB = require('facebook-node');
var path = require('path'); 
var mongoose = require('mongoose');
router.get('/', function(req, res, next){
res.sendFile(path.join(__dirname+'/../dist/portal/index2.html'));
});