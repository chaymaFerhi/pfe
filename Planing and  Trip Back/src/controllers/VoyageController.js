const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Voyage = require('../models/voyageModel');


// exports.getAllVoyages = catchAsync(async (req, res, next) => {
//     console.log(getAllVoyages())
//     getAllVoyages()
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


exports.getVoyage = factory.getOne(Voyage);
exports.updateVoyage = factory.updateOne(Voyage);
exports.getAllVoyages = factory.getAll(Voyage);

// Do NOT update passwords with this!
exports.addVoyage = factory.createOne(Voyage)
exports.deleteVoyage = factory.deleteOne(Voyage);

