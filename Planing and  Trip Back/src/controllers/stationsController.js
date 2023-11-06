const User = require('./../models/user');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
const fetch = require("node-fetch");


function getSplitAreaInToList(area) {
    return area.split(/\s*\,\s*/);
}

exports.getAllStations = catchAsync(async (req, res, next) => {
    getAllStations()
        .then(data => {
            // console.log('data', data)
            let doc = data.results.map(({name, area}) => {
                console.log(name)
                console.log(area)
                const areaList = getSplitAreaInToList(area)
                return {name, areaList}
            })
            console.log(doc)
            res.status(200).json({
                status: 'success',
                doc
            });

        })
});


exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
let getAllStations = async function () {
    let url = `https://api.maptiler.com/coordinates/search/germany.json?key=03IaMno9taHYAyaYMqcy`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    };

    const res = await fetch(url, options);
    // console.log(res)
    return await res.json();
}
