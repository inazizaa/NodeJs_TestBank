module.exports = (sequelize, type) => {
    return sequelize.define("account", {
        accountId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: type.STRING,
        Balance: type.DOUBLE,
        TPoint: type.INTEGER
    }, {
        tableName: 'account',
        timestamps: false
    })
}