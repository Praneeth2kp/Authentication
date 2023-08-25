const mongoose = require('mongoose')

const HostingoptionSchema = new mongoose.Schema({
    selectedOption: String
});

module.exports = mongoose.model("Hostingoption", HostingoptionSchema);