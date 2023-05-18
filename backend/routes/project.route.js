const express = require('express');
const app = express();
const cryptoRoute = express.Router();
let cryptoUsers = require('../model/criptoUsers');

cryptoRoute.route('/add-cryptoUsers').post((req, res, next) => {
    cryptoUsers.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

cryptoRoute.route('/').get((req, res, next) => {
    cryptoUsers.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})
cryptoRoute.route('/get-cryptoUsers').post((req, res, next) => {
    let quary=[]
    Object.keys(req.body).forEach(ele=>{
        quary.push({[ele]:req.body[ele]})
    })
    cryptoUsers.find({$and:quary}, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);

        } else {
            res.json(data);
            console.log('cryptoUsers updated sucessfully');
        }
    })
})
cryptoRoute.route('/update-cryptoUsers/:id').put((req, res, next) => {
    cryptoUsers.findByIdAndUpdate({mobile:req.params.id}, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);

        } else {
            res.json(data);
            console.log('cryptoUsers updated sucessfully');
        }
    })
})

cryptoRoute.route('/delete-cryptoUsers/:id').delete((req, res, next) => {
    cryptoUsers.findByIdAndRemove({mobile:req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = cryptoRoute;