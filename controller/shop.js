const Product = require('../models/product');
const Order = require('../models/order');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            if (req.user == null)
                res.render('index_shop', {
                    prods: products,
                    path: '/',
                    pageTitle: 'Home',
                    user: req.user
                });
            else if (req.user != null) {
                res.render('index_shop',
                    {
                        prods: products,
                        path: '/',
                        pageTitle: 'Home',
                        user: req.user,
                        //adminName:req.user.name 
                    });

            }
        })
        .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.render('product-details', { prod: product, pageTitle: 'Product Detail', path: '/', name: 'Edward', user: req.user });
        })
        .catch(err => console.log(err));
}
exports.getsearchpage = (req, res, next) => {
    Product.find({ $text: { $search: req.body.search } })
        .then(products => {
            if (req.user == null)
                res.render('search', {
                    prods: products,
                    path: '/',
                    pageTitle: 'search',
                    user: req.user,
                    key: req.body.search
                });
            else if (req.user != null) {
                res.render('search',
                    {
                        prods: products,
                        path: '/',
                        pageTitle: 'search',
                        user: req.user,
                        key: req.body.search
                    });

            }
        })
        .catch(err => console.log(err));

}
exports.getorderpage = (req, res, next) => {
    res.render('order', {
        user: req.user,
        pageTitle: 'Search',
    })
}
exports.postsearchorderpage = (req, res, next) => {
    errors = [];
    if (req.body.phone.length < 10) {
        errors.push({ msg: 'Vui Lòng NhẬP Số điện thoại 10 số' });
    }
    if (errors.length > 0) {
        res.render('order', {
            errors,
            user: req.user,
            pageTitle: 'Search',
        });
    }
        else {
            Order.find({ $text: { $search: '0123456' } })
                .then(orderr => {
                    console.log(orderr);
                    
                })
                .catch(err => console.log(err));
        }
    }