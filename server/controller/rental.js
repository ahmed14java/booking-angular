const Rental = require('../models/Rental');
const rentalController = {};

rentalController.findAll = async (req,res) => {
    try {
        const rentals = await Rental.find();
        res.json(rentals);
    } catch (err) {
        console.log(err);
    }
}

rentalController.findById = async (req,res) => {
    try {
        const rentalId = req.params.id;
        const rental = await Rental.findById(rentalId);
        res.json(rental);
    } catch (err) {
        console.log(err);
    }
}

module.exports = rentalController;