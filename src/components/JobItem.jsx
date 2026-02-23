import "./JobItem.css"

function JobItem({ job, onSubmit, submitted }) {
  return (
    <div className="job-item">
      <h2>{job.title}</h2>
      <button onClick={() => onSubmit(job.id)}>Submit</button>
      {submitted && <p className="success-message">Enviado: {job.title}</p>}
    </div>
  )
}

export default JobItem;