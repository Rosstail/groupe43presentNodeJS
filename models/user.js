const mysql = require('mysql')

var Schema = mysql.Schema;

var UserSchema = new Schema(
  {
    last_name: {type: String, required: true, maxLength: 50},
    first_name: {type: String, required: true, maxLength: 50},
    email: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true, maxLength: 200},
    date_of_register: {type: Date},
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
module.exports = mysql.model('User', UserSchema)
//module.exports = mongoose.model('User', UserSchema);