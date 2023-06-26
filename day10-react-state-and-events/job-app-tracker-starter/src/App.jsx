import JobCard from "./JobCard";
import jobs from "./jobs";
import classNames from "classnames";
import "./App.css";
import { useState } from "react";

const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};



function App() {

  const [selectedStatus, setSelectedStatus] = useState(1);

  const jobCards = jobs.map((job, i) => {
    return <JobCard job={job} key={i} />;
  });

  const statusbuttons = Object.keys(statuses).map(statusId => {

    const buttonClass = selectedStatus === parseInt(statusId) ? "bg-blue-500": ""

    return (
      <button key={statusId} 
      className={buttonClass}
      onClick = {() => setSelectedStatus(parseInt(statusId))}
      > 
      
      {statuses[statusId]}
      </button>
    )
  })

  return (
    <div className="mx-auto max-w-4xl">
      <h1>Job Application Tracker</h1>
      <div className="">{statusbuttons}</div>
      {jobCards}
    </div>
  );
}

export default App;
