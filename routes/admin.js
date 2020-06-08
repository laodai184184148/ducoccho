const express = require('express');

const adminController = require('../controller/admin');

const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated,authRole } = require('../config/auth');

const ROLE={ 
    ADMIN:'admin',
    BASIC:'basic'
  }
 
router.get('/add-product',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.getProductForm);
router.get('/',ensureAuthenticated,authRole(ROLE.ADMIN),adminController.getAdminPage);
router.get('/products',ensureAuthenticated,authRole(ROLE.ADMIN),adminController.getAllProducts);
router.get('/users',ensureAuthenticated,authRole(ROLE.ADMIN),adminController.getAllUsers);
router.get('/users/send_messages/:user_id',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.getSendMessagesForm);
router.post('/users/send_messages',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.postSendMessages);

router.get('/products/:prodId',ensureAuthenticated,authRole(ROLE.ADMIN),adminController.getProductDetail);
router.post('/add-product',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.postProduct);
router.get('/edit-product/:prodId',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.editProductPage);
router.post('/edit-product',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.editProductPost);
router.post('/delete-product',ensureAuthenticated,authRole(ROLE.ADMIN), adminController.deleteProduct);



module.exports = router;