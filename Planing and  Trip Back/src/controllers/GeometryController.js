const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Geometry = require('../models/geometryModel');


// exports.getAllGeometrys = catchAsync(async (req, res, next) => {
//     console.log(getAllGeometrys())
//     getAllGeometrys()
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


exports.getGeometry = factory.getOne(Geometry);
exports.updateGeometry = factory.updateOne(Geometry);
exports.getAllGeometrys = factory.getAll(Geometry);

// Do NOT update passwords with this!
exports.addGeometry = factory.createOne(Geometry)
exports.deleteGeometry = factory.deleteOne(Geometry);

