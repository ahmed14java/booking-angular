const Rental = require('./models/Rental');
const User = require('./models/User');
const Booking = require('./models/Booking');

const fakeDbData = require('./data.json');

class FakeDB {
    
    constructor(){
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;
    }

    async cleanDB(){
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDataToDB(){
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach(rental => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);
            newRental.save();
        });
        user.save();
        user2.save();
    }

    async seedDB(){
        await this.cleanDB();
        this.pushDataToDB();
    }
}
module.exports = FakeDB;