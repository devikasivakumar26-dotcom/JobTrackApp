
import { useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");

  function addJob(e) {
    e.preventDefault();

    if (!company.trim() || !role.trim()) {
      alert("Please enter company and job role.");
      return;
    }

    const newJob = {
      id: Date.now(),
      company,
      role,
      status,
    };

    setJobs([...jobs, newJob]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  }

  function deleteJob(id) {
    setJobs(jobs.filter((job) => job.id !== id));
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>JobTrack<span>App</span></h2>
        <p className="menu-title">WORKSPACE</p>
        <p className="active-menu">▦ Dashboard</p>
        <p>▤ My Applications</p>
        <p>⚙ Settings</p>
        <div className="sidebar-bottom">
          <div className="avatar">D</div>
          <div>
            <strong>Devika</strong>
            <small>Job Seeker</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Job Application Dashboard</h1>
            <p>Keep your career journey organized.</p>
          </div>
          <span className="profile">Welcome, Devika 👋</span>
        </header>

        <section className="stats">
          <div className="stat-card">
            <p>Total Applications</p>
            <h2>{jobs.length}</h2>
          </div>
          <div className="stat-card">
            <p>Interviews</p>
            <h2>{jobs.filter((j) => j.status === "Interview").length}</h2>
          </div>
          <div className="stat-card">
            <p>Offers</p>
            <h2>{jobs.filter((j) => j.status === "Offer").length}</h2>
          </div>
          <div className="stat-card">
            <p>Rejected</p>
            <h2>{jobs.filter((j) => j.status === "Rejected").length}</h2>
          </div>
        </section>

        <section className="panel">
          <h2>Add a Job Application</h2>
          <form onSubmit={addJob} className="job-form">
            <input
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              placeholder="Job role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <button type="submit">+ Add Application</button>
          </form>
        </section>

        <section className="panel">
          <div className="list-heading">
            <div>
              <h2>My Applications</h2>
              <p>Track and manage your job applications.</p>
            </div>
            <input
              className="search"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.company}</td>
                    <td>{job.role}</td>
                    <td>
                      <span className={`badge ${job.status.toLowerCase()}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredJobs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty">
                      No applications yet. Add your first job above!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <footer>JobTrackApp · Organize your career journey</footer>
      </main>
    </div>
  );
}

export default App;
