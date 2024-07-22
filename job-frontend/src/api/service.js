import axios from "axios";


const API_URL = 'http://localhost:3000/api/jobs';


export const createJob = async (payload) => {
    try {
     const res =  await axios.post(`${API_URL}/`, {
        ...payload
      });
      return res.data.id
    } catch (error) {
      console.log(error);
    }
  };

export const getJobById = async (id) => {
    try {
      await axios.get(`${API_URL}/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

export const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data.jobs
    } catch (error) {
      console.log(error);
    }
  };


