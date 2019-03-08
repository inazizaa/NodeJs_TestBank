module.exports = function (app) {
    const controller = require('../controller/transcontroller');

    app.route('/transactions').get(controller.getTrans);
    app.route('/transaction').get(controller.getByDate);
    app.route('/transaction/:id').get(controller.getByAcc);
    app.route('/transaction/').post(controller.insertTrans);
}