const express = require('express');
const _ = require('lodash');
const router = express.Router();
const model = require('../models/controller');
const errors = require('../error');


const setkoResponse =(err) =>{
    const resultCode='KO';
    const obj ={
        resultCode: resultCode,
        message: err.message,
        description: err.ErrorDescription
    }
    console.log('final error', obj);
    return obj;
}
router.get("/contacts",(req, res) =>{
    model.find((err, contact) =>{
        if(!err) {
            res.json(contact);
        } else {
            res.json(err);
        }
    });
});
const validateInputs=(req) =>{
    const body = req.body;
    const inputErrors = errors.Inputparameters;
    return new Promise((resolve, reject) =>{
        if((!_.isEmpty(body.Name) || !_.isUndefined(body.Name)) 
        && (!_.isEmpty(body.Address) || !_.isUndefined(body.Address))
        && (!_.isEmpty(body.phoneNumber) || !_.isUndefined(body.phoneNumber))) {
            resolve(body);
        } else {
            reject(inputErrors);
        }
    });
}

router.post("/contact",(req, res) =>{
    console.log('reqbody data', req.body);
   validateInputs(req).then((response) =>{
    let newConnect = new model({
        Name:response.Name,
        Address:response.Address,
        phoneNumber:response.phoneNumber
    });
    newConnect.save((err, rows) =>{
        if(!err) {
            res.json('Details saved Succesfully.')
        } else {
            console.log(err);
            res.json('failed to save the details');
        }
    });
   }).catch((err) =>{
       res.json(setkoResponse(err));
   })
    
});

router.delete("/contacts/:id", (req, res) =>{
    const deleteErrors = errors.deleteconnectionError;
    model.remove({_id:req.params.id}, (err, result) =>{
        if(!err) {
            res.json(result);
        } else {
            res.json(setkoResponse(deleteErrors));
        }
    });
});

module.exports = router;