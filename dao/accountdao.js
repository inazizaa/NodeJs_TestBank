const {
    Account
} = require("../database/connect");

exports.insert = function insert(data, callback) {
    Account.create(data)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.getAll = function getAll(callback) {
    Account.findAll()
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.getById = function getById(id, callback) {
    Account.findById(id)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.update = function update(id, data, callback) {
    Account.update(data, {
            where: {
                AccountId: data.Account
            },
            returning: true,
            plain: true
        })
        .then((result) => {
            return callback(null, data);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.deb = function deb(AccountId, Amount, Description, callback) {
    this.getById(AccountId, function (err, result) {
        if (err) {
            callback(err);
        } else if (result.Balance > Amount) {
            var poina = 0;
            var poinb = 0;
            var point = result.TPoint;
            if (Description == "Beli Pulsa") {
                if (Amount <= 10000) {
                    point = result.TPoint;
                } else {
                    if (Amount >= 10001 && Amount <= 30000) {
                        poina = ((Amount - 10000) / 1000) * 1;
                    }
                    if (Amount > 30000) {
                        poinb = ((Amount - 30000) / 1000) * 2;
                        poina = ((30000 - 10000) / 1000) * 1;
                    }
                }

                point += poina + poinb;
            } else if (Description == "Bayar Listrik") {
                if (Amount <= 50000) {
                    point = result.TPoint;
                } else {
                    if (Amount >= 50001 && Amount <= 100000) {
                        poina = ((Amount - 50000) / 2000) * 1
                    }
                    if (Amount > 100000) {
                        poinb = ((Amount - 100000) / 2000) * 2
                        poina = ((100000 - 50000) / 2000) * 1
                    }
                }

                point += poina + poinb;

            }

            Account.update({
                    Balance: (result.Balance - Amount),
                    TPoint: (point)
                }, {
                    where: {
                        AccountId: AccountId
                    }
                })
                .then((account) => {
                    return callback(null, result)
                })
                .catch((error) => {
                    return callback(error);
                })
        } else {
            callback('Balance tidak cukup');
        }
    });
}

exports.cred = function credit(AccountId, Amount, callback) {
    this.getById(AccountId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result) {
                Account.update({
                        Balance: (result.Balance + parseInt(Amount))

                    }, {
                        where: {
                            AccountId: AccountId
                        }
                    })
                    .then((account) => {
                        return callback(null, result)
                    })
                    .catch((error) => {
                        return callback(error);
                    })

            } else {
                callback('account not found');
            }
        }
    });
}