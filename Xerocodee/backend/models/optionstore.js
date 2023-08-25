const mongoose = require('mongoose')

const OptionstoreSchema = new mongoose.Schema({
    developername: String,
    organisationname: String,
    companyname: String
});

module.exports = mongoose.model("Optionstore",OptionstoreSchema);