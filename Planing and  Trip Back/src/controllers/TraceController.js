const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Trace = require('../models/tracesModel');
const AppError = require("../utils/appError");


// exports.getAllTraces = catchAsync(async (req, res, next) => {
//     console.log(getAllTraces())
//     getAllTraces()
//         .then(data => {
//             console.log('data', data)
//             let doc = data.results.map(({name, area}) => {
//                 console.log(name)
//                 console.log(area)
//                 const areaList = getSplitAreaInToList(area)
//                 return {name, areaList}
//             })
//             console.log(doc)
//             res.status(200).json({
//                 status: 'success',
//                 doc
//             });
//
//         })
// });


exports.getTrace = factory.getOne(Trace);
exports.searchTrace = catchAsync(async (req, res, next) => {
    const body = {
        depart: req.body.depart,
        destination: req.body.destination,
    };
    let query = Trace.find(body);
    const data = await query;

    if (!data) {
        return next(new AppError('No document found with that ID', 402));
    }

    res.status(200).json({
        status: 'success',
        content: data
    });
})
exports.updateTrace = factory.updateOne(Trace);
exports.getAllTraces = factory.getAll(Trace);
// Do NOT update passwords with this!
exports.addTrace = catchAsync(async (req, res, next) => {
    console.log(req.body)
    for (let item of req.body.doc) {
        await Trace.create(item);
    }
    res.status(201).json({
        status: 'success',
    });
})
exports.deleteTrace = factory.deleteOne(Trace);

