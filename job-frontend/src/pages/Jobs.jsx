import React, { useEffect } from "react";
import { fetchJobs } from "../api/service";
import styled , {keyframes} from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { useState } from "react";

export default function Jobs() {

  const [jobs, setJobs] = useState([])
  const [laoding, setLoading] = useState(false)

  const getJobListing = async () => {
    setLoading(true)
    try{
      const jobs = await fetchJobs()

      setJobs(jobs)
    }catch(e){

    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getJobListing()
  }, []);


  return (
    <Container>
        <div className="navbar">
        <Navbar />
      </div>
      {laoding ? <Loader/> : (
    
      <div className="data">
        {
          jobs && jobs.length ? <Slider jobs={jobs} /> :
            <NotAvailable />
        }
      </div>)}
    </Container>
  )
}

const Container = styled.div`
.data {
    margin-top: 8rem;
    .not-available {
        text-align: center;
        color: white;
        margin-top: 20rem;
    }
}

`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
