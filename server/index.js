const express = require('express');
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/MSJobs')


mongoose.connect(keys.mongoURI)

const app = express();

app.get('/', async (req, res) => {
    const response = await fetch('https://gcsservices.careers.microsoft.com/search/api/v1/search?q=software%20engineer&lc=United%20States&exp=Experienced%20professionals&rt=Individual%20Contributor&et=Full-Time&ws=Up%20to%20100%25%20work%20from%20home&l=en_us&pg=1&pgSz=20&o=Recent&flt=true')
    const json = await response.json();
    const data = json.operationResult.result.jobs

    const MSJobs = mongoose.model('ms')

    data.map(job => {
        MSJobs.findOne({ jobId: job.jobId }).then(existingUser => {
            if(!existingUser) {
                new MSJobs({ 
                    jobId: job.jobId,
                    title: job.title,
                    postingDate: job.postingDate,
                    applied: false,
                    appliedDate: new Date().toISOString(),
                    applicationStatus: "Not Applied",
                    description: job.properties.description
                 }).save()
                }
            })
        })
        res.send('done')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);