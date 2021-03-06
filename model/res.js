exports.success = function (values, res) {
    var data = {
        'status': 100,
        'message': 'success',
        'values': values
    };
    res.json(data);
    res.end();
};

exports.err = function (values, res) {
    var data = {
        'status': 300,
        'message': 'Failed',
        'values': values
    }
    res.json(data);
    res.end();
}

exports.datanotfound = function (values, res) {
    var data = {
        'status': 404,
        'message': 'not found',
        'values': values
    }
    res.json(data);
    res.end();
}