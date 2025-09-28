import React, { useState } from 'react'
import Interviewee from './components/Interviewee'
import Interviewer from './components/Interviewer'
import './styles.css'

export default function App(){
  const [tab, setTab] = useState('interviewee')
  return (
    <div className="app">
      <header>
        <h1>AI Interview Assistant</h1>
        <div className="tabs">
          <button onClick={()=>setTab('interviewee')} className={tab==='interviewee'?'active':''}>Interviewee</button>
          <button onClick={()=>setTab('interviewer')} className={tab==='interviewer'?'active':''}>Interviewer</button>
        </div>
      </header>
      <main>
        {tab==='interviewee' ? <Interviewee /> : <Interviewer />}
      </main>
    </div>
  )
}
