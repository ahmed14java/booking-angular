const Rental = require('../models/Rental');
const rentalController = {};

rentalController.findAll = async (req,res) => {
    try {
       await Rental.find({})
                    .select('-bookings')
                    .exec(function(err , foundRentals){
                        // if (err) {
                        //    return res.status(422).send({errors: 'Rental Error!' , detail: 'Could not found Rental!'})
                        // }
                        return res.json(foundRentals);
                    });
        // const rentals = await Rental.find();
        // res.json(rentals);
    } catch (err) {
        console.log(err);
    }
}

rentalController.findById = async (req,res) => {
    try {
        const rentalId = req.params.id;
        await Rental.findById(rentalId)
                                    .populate('user', 'username -_id')
                                    .populate('bookings' , 'startAt endAt -_id')
                                    .exec(function(err , foundRental){
                                        if (err) {
                                           return res.status(422).send({errors: 'Rental Error!' , detail: 'Could not found Rental!'})
                                        }
                                        return res.json(foundRental);
                                    });
        // res.json(rental);
    } catch (err) {
        console.log(err);
    }
}

module.exports = rentalController;