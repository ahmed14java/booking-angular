const Rental = require('../models/Rental');
const User = require('../models/User');
const { normalizeErrors } = require("../helpers/mongoose");
const rentalController = {};

rentalController.findAll = async (req,res) => {
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {} ;
    try {
        await Rental.find(query)
            .select('-bookings')
            .exec(function(err , foundRentals){
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
                if (city && foundRentals.length === 0) {
                    return res.status(422).send({errors: [{title: 'No Rental Found!' , detail: `There are no rentals for city ${city}`}]});
                }
                return res.json(foundRentals);
            });
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
                            return res.status(422).send({errors: [{title: 'Rental Error!' , detail: 'Could not found Rental!'}]})
                        }
                        return res.json(foundRental);
                    });
        // res.json(rental);
    } catch (err) {
        console.log(err);
    }
}

rentalController.createRental = async (req , res) => {
    const { title , city , street , category , image , bedrooms , shared , description , dailyRate , createdAt} = req.body;
    const user = res.locals.user;

    const rental = new Rental({title , city , street , category , image , bedrooms , shared , description , dailyRate , createdAt});
    rental.user = user;
   await Rental.create(rental , (err , newRental) => {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        User.update({_id: user.id} , {$push: {rentals: newRental}} , function(){});
        return res.json(newRental);
    })
}

rentalController.deleteRental = async (req , res) => {
    const user = res.locals.user;
    const rentalId = req.params.id;
    await Rental.findById(rentalId)
                .populate('user' , '_id')
                .populate({
                    path: 'bookings',
                    select: 'startAt',
                    match: { startAt: { $gt: new Date() } }
                }).exec(function(err , foundRental){
                    if (err) {
                        return res.status(422).send({errors: normalizeErrors(err.errors)});
                    }
                    if (user.id !== foundRental.user.id) {
                        return res.status(422).send({errors: [{title: 'Invalid User!' , detail: 'You are not rental owner!'}]})
                    }
                    if (foundRental.bookings.length > 0) {
                        return res.status(422).send({errors: [{title: 'Active Bookings!' , detail: 'Cannot delete rental with active bookings!'}]})
                    }
                    foundRental.remove(function(err){
                        if (err) {
                            return res.status(422).send({errors: normalizeErrors(err.errors)});
                        }
                        return res.json({'status': 'deleted'});
                    });
                });
}

rentalController.manageRental = async (req , res) => {
    const user = res.locals.user;
   await Rental.where({user})
          .populate('bookings')
          .exec(function(err , foundRentals){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.json(foundRentals);
          });
}

module.exports = rentalController;