const AccountDao = require('../dao/accountdao');
const response = require('../model/res');

exports.getAccounts = function (req, res) {
    AccountDao.getAll(function (err, result) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else {
            response.success(result, res);
        }
    });
}

exports.insertAcc = function (req, res) {
    AccountDao.insert(req.body, function (err, result) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else {
            console.log('insert success')
            response.success(result, res);
        }
    });
}

exports.getAccById = function (req, res) {
    AccountDao.getById(req.params['id'], function (err, result) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else {
            response.success(result, res);
        }
    });
}

exports.updateAcc = function (req, res) {
    const body = req.body;
    accountDao.getById(body.accountId, function (err, data) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound("data not found !", res);
        } else {
            accountDao.update(body.accountId, body, function (error, result) {
                if (err) {
                    console.log('error' + err);
                    response.err(error, res);
                } else {
                    response.success(result, res);
                }
            });
        }
    });
}