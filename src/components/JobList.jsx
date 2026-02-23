import JobItem from "./JobItem.jsx"

function JobList({ jobs, onSubmit, submit }) {
  return (
    <>
      {jobs ? jobs.map((j) => (
        <JobItem
          key={j.id}
          job={j}
          onSubmit={onSubmit}
          submitted={submit[j.id]}
        />
      )) : null}
    </>
  )
}

export default JobList;