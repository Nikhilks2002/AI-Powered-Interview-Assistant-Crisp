import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function Interviewer() {
  const candidates = useSelector(s => s.candidates)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('score')
  const [now, setNow] = useState(Date.now()) // for dynamic elapsed time

  // Update "now" every second to refresh elapsed times
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  const list = useMemo(() => {
    let arr = Object.values(candidates || {})
    if (query) arr = arr.filter(c =>
      (c.name || '').toLowerCase().includes(query.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(query.toLowerCase())
    )
    if (sortBy === 'score') arr = arr.sort((a, b) => (b.score || 0) - (a.score || 0))
    if (sortBy === 'name') arr = arr.sort((a, b) => ((a.name || '').localeCompare(b.name || '')))
    return arr
  }, [candidates, query, sortBy])

  // Format milliseconds to hh:mm:ss
  const formatElapsed = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div>
      <h3>Interviewer Dashboard</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="Search by name or email" value={query} onChange={e => setQuery(e.target.value)} />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="score">Sort by Score</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      <div>
        {list.length === 0 && <div>No candidates yet.</div>}
        {list.map(c => {
          // Determine if candidate is still taking the exam
          const inProgress = !c.finishedAt && c.startedAt
          const elapsedMs = inProgress ? now - c.startedAt : (c.finishedAt ? c.finishedAt - c.startedAt : 0)

          return (
            <div key={c.id} className="candidate-card" style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{c.name || 'Unnamed'}</strong><br/>
                  <small>{c.email} · {c.phone}</small>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>Score: {c.score || 0}</div>
                  <div>Started At: {c.startedAt ? new Date(c.startedAt).toLocaleString() : '-'}</div>
                  <div>Completed At: {c.finishedAt ? new Date(c.finishedAt).toLocaleString() : '-'}</div>
                  {inProgress && <div>Elapsed: {formatElapsed(elapsedMs)}</div>}
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <details>
                  <summary>View details</summary>
                  <div>
                    <strong>Summary:</strong> {c.summary || `Avg score ${c.score || 0}. ${c.chat?.length || 0} answers evaluated.`}<br/>
                    <strong>Chat:</strong>
                    <ul>
                      {c.chat && c.chat.map((e, i) => (
                        <li key={i}><strong>{e.level}</strong>: {e.question} — Ans: {e.answer} — Score: {e.score}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
