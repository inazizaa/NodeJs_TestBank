const {
    Transaction,
    Account
} = require("../database/connect");

exports.getAll = function getAll(callback) {
    Transaction.findAll({
            attributes: ['AccountId', 'TransDate', 'Description', 'Status', 'Amount']
        })
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        });
}

exports.getAmount = function getAmount(id, callback) {
    Transaction.findOne({
            where: {
                AccountId: id
            },
            attributes: ['Amount'],
        })
        .then((result) => {
            return callback(null, result.Amount);
        })
        .catch((error) => {
            return callback(error);
        })

}
exports.insert = function insert(data, callback) {
    Transaction.create(data)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.getDate = function getDate(id, startDate, endDate, callback) {
    Transaction.find({
            where: {
                accountId: id,
                dateTrans: {
                    $between: [startDate, endDate]
                }
            }
        })
        .then((result) => {
            return callback(null, result.amount);
        })
        .catch((error) => {
            return callback(error);
        })
}