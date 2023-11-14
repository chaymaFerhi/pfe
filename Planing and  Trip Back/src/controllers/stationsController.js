const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const fetch = require("node-fetch");
const APIFeatures = require("../utils/apiFeatures");
const Station = require('../models/stationModel');


function getSplitAreaInToList(area) {
    return area.split(/\s*\,\s*/);
}

// exports.getAllStations = catchAsync(async (req, res, next) => {
//     console.log(getAllStations())
//     getAllStations()
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


exports.getStation = factory.getOne(Station);
exports.updateStation = factory.updateOne(Station);
exports.getAllStations = factory.getAll(Station);
exports.addStation = factory.createOne(Station);

// Do NOT update passwords with this!
exports.addMultiStation = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const areaList = getSplitAreaInToList(req.body.areaList);
    req.body.areaList = areaList
        await Station.create(req.body);
    res.status(201).json({
        status: 'success',
    });
})
exports.deleteStation = factory.deleteOne(Station);
let getAllStations = async function () {
    let url = `https://api.maptiler.com/coordinates/search/germany.json?key=03IaMno9taHYAyaYMqcy`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    };

    const res = await fetch(url, options);
    console.log('res', res)
    return await res.json();
}
