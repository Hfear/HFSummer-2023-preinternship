import "./App.css";
import JobCard from "./JobCard";
import jobs from "./jobs";

function App() {

  const jobCards = jobs.map((job,i) =>{

    //return <JobCard job = {job} key = {i}>)
  })
  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <JobCard job={jobs[0]} />
    </div>
  );
}

export default App;