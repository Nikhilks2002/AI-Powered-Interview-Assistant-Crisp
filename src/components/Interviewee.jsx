import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { upsertCandidate, saveSession } from '../store'
import { extractTextFromPDF, extractTextFromDocx, parseContactInfo } from '../utils/resumeParser'
import { QUESTIONS, gradeAnswer } from '../utils/questions'
import { shuffleArray } from '../utils/helpers'
import { v4 as uuidv4 } from 'uuid'

export default function Interviewee() {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [candidate, setCandidate] = useState({ name: '', email: '', phone: '' })
  const [id, setId] = useState(null)
  const [stage, setStage] = useState('upload')
  const [chat, setChat] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerActive, setTimerActive] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState([])
  const [finalResult, setFinalResult] = useState(null)
  const [welcomeMsg, setWelcomeMsg] = useState('')
  const [hasPendingExam, setHasPendingExam] = useState(false)
  const [startedAt, setStartedAt] = useState(null)
  const [finishedAt, setFinishedAt] = useState(null)
  const answerRef = useRef()

  
  useEffect(() => {
    let t = null
    if (timerActive) {
      t = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(t)
            submitAnswer()
            return 0
          }
          persistSession({ timeLeft: prev - 1 })
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(t)
  }, [timerActive])

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('currentSession'))
    const lastCandidate = JSON.parse(localStorage.getItem('lastCandidate'))

    if (saved) {
      setId(saved.id)
      setCandidate(saved.candidate)
      setStage('welcome')
      setHasPendingExam(true)
      setWelcomeMsg(`Welcome back, ${saved.candidate.name}!`)
      setStartedAt(saved.startedAt)
      setFinishedAt(saved.finishedAt)
    } else if (lastCandidate) {
      setCandidate(lastCandidate)
      setStage('welcome')
      setWelcomeMsg(`Welcome back, ${lastCandidate.name}!`)
    }
  }, [])

  function persistSession(updatedFields) {
    const session = {
      id,
      candidate,
      stage,
      chat,
      qIndex,
      timeLeft,
      shuffledQuestions,
      startedAt,
      finishedAt,
      ...updatedFields
    }
    localStorage.setItem('currentSession', JSON.stringify(session))
  }


  async function handleFile(ev) {
    const f = ev.target.files[0]
    if (!f) return
    setFile(f)

    let text = ''
    try {
      if (f.name.toLowerCase().endsWith('.pdf')) text = await extractTextFromPDF(f)
      else text = await extractTextFromDocx(f)
    } catch (err) {
      alert('Error parsing resume: ' + err.message)
      return
    }

    const parsed = parseContactInfo(text)
    setCandidate(parsed)
    setStage('confirm')
    const nid = uuidv4()
    setId(nid)
    dispatch(saveSession({ id: nid, candidate: parsed, progress: 'confirm', createdAt: Date.now() }))
    persistSession({ id: nid, candidate: parsed, stage: 'confirm' })
  }

  
  function startInterview() {
    if (!candidate.name || !candidate.email || !candidate.phone) {
      alert('Please fill missing fields before starting.')
      return
    }

    const startTime = Date.now()
    setStartedAt(startTime)

    const questionsCopy = shuffleArray(QUESTIONS).slice(0, 6).map(q => ({
      ...q,
      options: shuffleArray(q.options),
      time: 30
    }))

    setShuffledQuestions(questionsCopy)
    setChat([])
    setQIndex(0)
    setTimeLeft(questionsCopy[0].time)
    setStage('interview')
    setTimerActive(true)

    dispatch(upsertCandidate({ id, ...candidate, score: 0, chat: [], startedAt: startTime }))
    persistSession({
      stage: 'interview',
      shuffledQuestions: questionsCopy,
      chat: [],
      qIndex: 0,
      timeLeft: questionsCopy[0].time,
      startedAt: startTime
    })
  }


  function resumeExam() {
    const saved = JSON.parse(localStorage.getItem('currentSession'))
    if (!saved) return
    setShuffledQuestions(saved.shuffledQuestions)
    setChat(saved.chat || [])
    setQIndex(saved.qIndex || 0)
    setTimeLeft(saved.timeLeft || 30)
    setStartedAt(saved.startedAt)
    setFinishedAt(saved.finishedAt)
    setStage('interview')
    setTimerActive(true)
  }

  
  function restartExam() {
    localStorage.removeItem('currentSession')
    setStage('upload')
    setChat([])
    setQIndex(0)
    setTimeLeft(30)
    setShuffledQuestions([])
    setFinalResult(null)
    setHasPendingExam(false)
    setStartedAt(null)
    setFinishedAt(null)
  }

  
  function submitAnswer(selectedAnswer = null) {
    setTimerActive(false)
    const ans = selectedAnswer || (answerRef.current ? answerRef.current.value : '')
    const q = shuffledQuestions[qIndex]
    const grade = gradeAnswer(q, ans)
    const entry = {
      question: q.text,
      answer: ans,
      correct: q.correct,
      isCorrect: grade.score === 100,
      level: q.level,
      score: grade.score
    }
    const newChat = [...chat, entry]
    setChat(newChat)

    if (qIndex + 1 < shuffledQuestions.length) {
      const next = qIndex + 1
      setQIndex(next)
      setTimeLeft(shuffledQuestions[next].time)
      setTimerActive(true)
      persistSession({ chat: newChat, qIndex: next, timeLeft: shuffledQuestions[next].time })
    } else {
      const correctCount = newChat.filter(e => e.isCorrect).length
      const passed = correctCount >= 4
      const finishTime = Date.now()
      setFinalResult({ correctCount, passed })
      setStage('finished')
      setFinishedAt(finishTime)
      dispatch(upsertCandidate({ id, ...candidate, score: correctCount, chat: newChat, startedAt, finishedAt: finishTime }))
      localStorage.removeItem('currentSession')
      localStorage.setItem('lastCandidate', JSON.stringify(candidate))
    }

    if (answerRef.current) answerRef.current.value = ''
  }

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', padding: 20, borderRadius: 10, boxShadow: '0 0 15px rgba(0,0,0,0.1)', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>

      {welcomeMsg && stage === 'welcome' && (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p style={{ background: '#e0f7fa', padding: 10, borderRadius: 6 }}>{welcomeMsg}</p>
          {hasPendingExam ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              <button onClick={resumeExam} style={{ padding: 10, borderRadius: 6, backgroundColor: '#4caf50', color: '#fff', fontWeight: 'bold' }}>Resume Exam</button>
              <button onClick={restartExam} style={{ padding: 10, borderRadius: 6, backgroundColor: '#f44336', color: '#fff', fontWeight: 'bold' }}>Restart Exam</button>
            </div>
          ) : (
            <button onClick={restartExam} style={{ padding: 10, borderRadius: 6, backgroundColor: '#4caf50', color: '#fff', fontWeight: 'bold' }}>Start New Exam</button>
          )}
        </div>
      )}

      {stage === 'upload' && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#4caf50' }}>Upload Your Resume</h2>
          <input type="file" accept=".pdf,.docx" onChange={handleFile} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        </div>
      )}

      {stage === 'confirm' && (
        <div>
          <h2 style={{ color: '#4caf50', marginBottom: 15 }}>Confirm Your Info</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input placeholder="Name" value={candidate.name} onChange={e => setCandidate({ ...candidate, name: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
            <input placeholder="Email" value={candidate.email} onChange={e => setCandidate({ ...candidate, email: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
            <input placeholder="Phone" value={candidate.phone} onChange={e => setCandidate({ ...candidate, phone: e.target.value })} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
            <button onClick={startInterview} style={{ padding: 12, borderRadius: 6, backgroundColor: '#4caf50', color: '#fff', fontWeight: 'bold', cursor: 'pointer', marginTop: 10 }}>Start Exam</button>
          </div>
        </div>
      )}

      {stage === 'interview' && shuffledQuestions.length > 0 && (
        <>
          {/* Show Started & Completed times */}
          {startedAt && (
            <div style={{ marginBottom: 10, fontSize: 14, color: '#555' }}>
              <div>Started At: {new Date(startedAt).toLocaleString()}</div>
              {finishedAt && <div>Completed At: {new Date(finishedAt).toLocaleString()}</div>}
            </div>
          )}

          <div style={{ position: 'relative', padding: 20, border: '1px solid #ddd', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: 20 }}>
            <div style={{
              position: 'absolute',
              top: 15,
              right: 15,
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 16,
              color: '#4caf50',
              boxShadow: '0 0 5px rgba(0,0,0,0.2)'
            }}>
              {timeLeft}s
            </div>

            <h2 style={{ color: '#4caf50', marginBottom: 15 }}>Interview</h2>
            <div>
              <strong>Question ({shuffledQuestions[qIndex].level}):</strong>
              <p style={{ fontSize: 16 }}>{shuffledQuestions[qIndex].text}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {shuffledQuestions[qIndex].options.map((opt, idx) => (
                  <button key={idx} onClick={() => submitAnswer(opt)} style={{ padding: 10, borderRadius: 6, border: '1px solid #4caf50', backgroundColor: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {stage === 'finished' && finalResult && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: finalResult.passed ? '#4caf50' : '#f44336' }}>Interview Finished</h2>
          <p style={{ fontSize: 18 }}>Correct Answers: {finalResult.correctCount} / {shuffledQuestions.length}</p>
          <p style={{ fontWeight: 'bold' }}>{finalResult.passed ? '🎉 Congratulations! You passed.' : '❌ Sorry, you did not pass.'}</p>

          {startedAt && <div>Started At: {new Date(startedAt).toLocaleString()}</div>}
          {finishedAt && <div>Completed At: {new Date(finishedAt).toLocaleString()}</div>}
        </div>
      )}
    </div>
  )
}
