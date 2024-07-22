const fs = require('fs');
const path = require('path');
const uuid = require("uuid/v4") 
const { getPhoto } = require("../external-api")
const moment = require("moment")


const _fetchJobsFromFile = function (){
    let jobs = [];

    // file path
    const filePath = path.join(__dirname, 'jobs.json');

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath);
        jobs = JSON.parse(fileData);
    }

    return jobs

}

module.exports.createJob = async (req, res) => {
    try {
        const { rate, title, jobDate } = req.body;

        // Validate payload
        if (!rate || !title || !jobDate) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        // Setup job object
        const job = {
            id: uuid(),
            rate,
            title,
            jobDate : moment(jobDate).format("YYYY-MM-DD"),
            createdAt: moment().format("YYYY-MM-DD"),
            status: "pending"
        };

        // Save in file
        const filePath = path.join(__dirname, 'jobs.json');

        let jobs = _fetchJobsFromFile();

        const url = await getPhoto()

        job["url"] = url || "https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg"

        jobs.push(job);

        fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));

        return res.json({ msg: "Job added successfully" , id: job.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error adding job" });
    }
};


module.exports.getJobById = async(req, res) => {
    try {
        const { jobId } = req.params;

        let jobs = _fetchJobsFromFile();


        return  res.json({
            job : jobs.find(job => job.id == jobId)
        })


    } catch (err) {
        return res.json({ msg: "Error Fetching job"});
    }
};

module.exports.fetchJobs = async(req, res) => {
    try {
        const { page, limit } = req.query;
        let jobs = _fetchJobsFromFile();

        // Sort jobs (assuming we are sorting by createdAt in descending order)
        jobs = jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (page && limit) {
            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);

            // Calculate start and end indices
            const startIndex = (pageNum - 1) * limitNum;
            const endIndex = pageNum * limitNum;

            // Slice the jobs array to get the paginated jobs
            jobs = jobs.slice(startIndex, endIndex);
        }

        return res.json({ jobs })

    } catch (err) {
        return res.json({ msg: "Error Fetching jobs"});
    }
};

