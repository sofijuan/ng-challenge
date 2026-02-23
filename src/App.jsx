import { useState, useEffect } from "react"
import JobList from "./components/JobList.jsx"
import "./App.css"

function App() {
  const [candidateData, setCandidateData] = useState({})
  const [jobsList, setJobsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submit, setSubmit] = useState({})

  const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"
  const EMAIL = "soofiajuan@hotmail.com"

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [candidateRes, jobsRes] = await Promise.all([
          fetch(`${BASE_URL}/api/candidate/get-by-email?email=${EMAIL}`),
          fetch(`${BASE_URL}/api/jobs/get-list`)
        ])
        if (!candidateRes.ok || !jobsRes.ok) throw new Error("Error al obtener los datos")
        const candidateInfo = await candidateRes.json()
        const jobsInfo = await jobsRes.json()
        setCandidateData(candidateInfo)
        setJobsList(jobsInfo)
      } catch (err) {
        console.error("Error:", err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

const handleSubmit = async (id) => {
    try {
      const info = {
        uuid: candidateData.uuid,
        jobId: id,
        candidateId: candidateData.candidateId,
        repoUrl: "https://github.com/sofijuan/ng-challenge",
        applicationId: candidateData.applicationId
      }
      const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info)
      })
      if (!response.ok) throw new Error("Error al enviar la postulación")
      setSubmit({ ...submit, [id]: true })
    } catch (err) {
      console.error("Error:", err.message)
      setError(err.message);
    } finally {
      setLoading(false)
    }
  }

  const loadingRender = <div className="loading">Cargando...</div>
  const errorRender = <div className="error">Hubo un error: {error}</div>
  const okRender = jobsList.length > 0
    ? <JobList jobs={jobsList} onSubmit={handleSubmit} submit={submit} />
    : null

  const renderResult = error ? errorRender : okRender

  return (
  <div className="app-container">
    <h1>Posiciones disponibles</h1>
    {loading ? loadingRender : renderResult}
  </div>
)
}

export default App;