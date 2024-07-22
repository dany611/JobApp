import React from "react";
import CardSlider from "./CardSlider";

export default React.memo (function Slider({jobs}) {

  const pendingJobs = jobs.filter(job=>job.status=="pending");
  const inProgressJobs = jobs.filter(job=>job.status=="inprogress");

  const completedJobs = jobs.filter(job=>job.status=="completed");
  const cancelledJobs = jobs.filter(job=>job.status=="cancelled");

   
  return (
    <div>
     {!! pendingJobs.length &&  <CardSlider title="Pending Jobs" data={pendingJobs} /> }
     {!! inProgressJobs.length &&  <CardSlider title="InProgress Jobs" data={inProgressJobs} /> }
     {!! completedJobs.length &&  <CardSlider title="Completed Jobs" data={completedJobs} /> }
     {!! cancelledJobs.length &&  <CardSlider title="Cancelled Jobs" data={cancelledJobs} /> }
    </div>
  );
}
);
