/*
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    last_name: {type: String, required: true, maxLength: 50},
    first_name: {type: String, required: true, maxLength: 50},
    email: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true, maxLength: 200}
  }
);

// Virtual for user's full name
UserSchema.virtual('name').get(function () {
  return this.last_name + ', ' + this.first_name;
});

// Virtual for user's URL
UserSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
const Users = mongoose.model('User', UserSchema);
*/
class users{
  constructor(email, password, firstname, lastname){
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
  }
}
    
module.exports = users