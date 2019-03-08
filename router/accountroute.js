module.exports = function (app) {
    const controller = require('../controller/accountController');

    app.route('/accounts').get(controller.getAccounts);
    app.route('/account/:id').get(controller.getAccById);
    app.route('/account').post(controller.insertAcc);
}