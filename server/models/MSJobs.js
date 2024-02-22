const mongoose = require('mongoose')
const { Schema } = mongoose

const msJobSchema = new Schema({
    jobId: String,
    title: String,
    postingDate: String,
    applied: Boolean,
    appliedDate: String,
    applicationStatus: String,
    description: String
})

mongoose.model('ms', msJobSchema)