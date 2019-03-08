module.exports = (sequelize, type) => {
    return sequelize.define("transaction", {
        AccountId: {
            type: type.INTEGER,
            references: {
                model: "account",
                key: 'AccountId'
            }
        },
        TransDate: {
            type: type.DATE,
            primaryKey: true
        },
        Description: type.STRING,
        Status: type.STRING,
        Amount: type.DOUBLE,

    }, {
        tableName: 'transaction',
        timestamps: false
    })
}