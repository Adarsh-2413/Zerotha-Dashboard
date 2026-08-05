const mongoose = require('mongoose');
// passport-local-mongoose v9 is an ES module; under CommonJS require() it
// exposes { errors, default } — we need the .default to get the plugin fn.
const passportLocalMongoose = require('passport-local-mongoose').default;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

// passport-local-mongoose adds username, hash, salt fields automatically
// and provides .register(), .createStrategy(), .serializeUser(), .deserializeUser()
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);