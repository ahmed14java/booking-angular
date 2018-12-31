const Booking = require('../models/Booking');
const Rental = require('../models/Rental');
const User = require('../models/User');
const { normalizeErrors } = require("../helpers/mongoose");
const moment = require('moment');

const bookingController = {};

bookingController.createBooking = (req , res) => {

    const { startAt , endAt , totalPrice , days , guests , rental} = req.body;
    const user = res.locals.user;

    const newBooking = new Booking({startAt , endAt , totalPrice , days , guests});

      Rental.findById (rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function(err , foundRental){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)})
            }
            if (foundRental.user.id  === user.id) {
                return res.status(422).send({errors: 'Invalid User' , detail: 'Cannot create booking on your rental'})
            }
            // Check here for validate booking
            if (isValidBooking(newBooking , foundRental)) {
                newBooking.user = user;
                newBooking.rental = rental;
                foundRental.bookings.push(newBooking);
                newBooking.save((err) => {
                    if (err) {
                        return res.status(422).send({errors: normalizeErrors(err.errors)})                        
                    }
                    foundRental.save();
                    User.update({_id: user.id} , {$push: {bookings: newBooking}} , function(){});
                    return res.json({startAt: newBooking.startAt , endAt: newBooking.endAt});
                });
            }else {
                return res.status(422).send({errors: 'Invalid Booking' , detail: 'Choosen date are already taken!'});
            }

            return res.json({booking: foundRental});
        });
}

function isValidBooking(propesdBooking , rental) {
    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {
        isValid = rental.bookings.every((booking) => {
            const propsedStart = moment(propesdBooking.startAt);
            const propsedEnd = moment(propesdBooking.endAt);
            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);
            return ((actualStart < propsedStart && actualEnd < propsedStart) || (propsedEnd < actualEnd && propsedEnd < actualStart));
        })
    }

    return isValid;
}

module.exports = bookingController;