const transDao = require('../dao/transdao');
const accountDao = require('../dao/accountdao');
const response = require('../model/res')

exports.getTrans = function (req, res) {
    transDao.getAll(function (err, result) {
        if (err) {
            response.err(err, res);
        } else {
            response.success(result, res)
        }
    })
}

exports.getByDate = function (req, res) {
    let id = req.query.id;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    transDao.getDate(id, startDate, endDate, function (err, result) {
        if (err) {
            response.err(err, res);
        } else {
            response.success(result, res)
        }

    })
}

exports.getByAcc = function (req, res) {
    transDao.getAmount(req.params['id'], function (err, result) {
        if (err) {
            response.err(err, res);
        } else {
            response.success(result, res)
        }
    })
}

exports.insertTrans = function (req, res) {
    const body = req.body;
    if (body.Description != "Add Balance") {
        accountDao.deb(body.AccountId, body.Amount, body.Description, function (err, result) {
            if (err) {
                response.err(err, res);
            } else {
                body.Status = "D";
                transDao.insert(body, function (error, result2) {
                    if (error) {
                        console.log('error call insert : ' + error);
                        response.err(error, res);
                    } else {

                        response.success('transaction success', res);
                    }
                });
            }
        })
    } else {
        accountDao.cred(body.AccountId, body.Amount, function (err, result) {
            if (err) {
                response.err(err, res);
            } else {
                let credit2 = body;
                credit2.Status = "C"
                transDao.insert(credit2, function (error, result2) {
                    if (error) {
                        console.log('error call insert : ' + error);
                        response.err(error, res);
                    } else {
                        response.success('transaction success', res);
                    }
                });
            }
        })
    }
}