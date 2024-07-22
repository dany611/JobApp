const { createJob, getJobById, fetchJobs } = require("../controllers/JobController");

const router = require("express").Router();

router.post("/", createJob);
router.get("/:jobId", getJobById);
router.get("/", fetchJobs);

module.exports = router;
