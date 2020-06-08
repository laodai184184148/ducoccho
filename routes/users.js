const express=require('express');
const router=express.Router();
const passport = require('passport');
const { ensureAuthenticated,unAuthenticated, forwardAuthenticated,authRole } = require('../config/auth');

//User controller
const usercontroll=require('../controller/user')
//Get login form
router.get('/login',unAuthenticated,usercontroll.getLoginForm);
//Get Register form
router.get('/register',usercontroll.getUserForm);
//Post Register
router.post('/register',usercontroll.postSingup);
//Post Login
router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/users/login',
      failureFlash: true
    }), (req, res, next) => {
      if (req.user.role === 'admin') {
        res.redirect('/admin');
      }
      if (req.user.role === 'basic') {
        res.redirect('/');
      }
    });
//Handle logout
router.get('/logout',usercontroll.getLogout);

router.get('/profile',usercontroll.getprofilepage);
router.post('/profile',usercontroll.postprofilepage);

module.exports=router;