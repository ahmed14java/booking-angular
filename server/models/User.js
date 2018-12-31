const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"]
  },
  email: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    unique: true,
    lowercase: true,
    required: "Email is required",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, "Too short, min is 4 characters"],
    max: [32, "Too long, max is 32 characters"],
    required: "Password is required"
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: "Rental" }],
  bookings: [{type: Schema.Types.ObjectId , ref: 'Booking'}]
});

UserSchema.methods.hasSamePassword = function(passwordRequested) {
  // bcrypt.c
  return bcrypt.compareSync(passwordRequested , this.password);
}

UserSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
