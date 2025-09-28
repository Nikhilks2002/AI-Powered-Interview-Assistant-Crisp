# AI Interview Assistant (Enhanced)

# AI Interview Assistant

AI Interview Assistant is a comprehensive React-based web application designed to facilitate and streamline the technical interview process. It enables candidates to upload their resumes, automatically extracts their contact information, and presents them with a timed, multiple-choice technical exam. Interviewers can then review candidate performance, track progress in real-time, and analyze detailed results through an intuitive dashboard.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Notes](#notes)
- [License](#license)
- [Contact](#contact)

---

## Features

### 1. Resume Upload and Parsing

- **Supported Formats:** Candidates can upload resumes in PDF or DOCX formats.
- **Automatic Text Extraction:** The app uses `pdfjs-dist` to extract text from PDFs and `mammoth` to extract text from DOCX files.
- **Contact Information Parsing:** After extracting text, the app automatically parses the candidate’s name, email, and phone number using custom parsing utilities.
- **Editable Confirmation:** Candidates can review and edit their extracted contact information before starting the interview to ensure accuracy.

### 2. Timed Technical Interview

- **Question Bank:** The app includes a rich set of technical questions categorized by difficulty levels — Easy, Medium, and Hard.
- **Randomized Questions:** Each interview session presents a shuffled subset of questions to ensure uniqueness.
- **Multiple Choice Options:** Questions come with multiple answer options, shuffled for fairness.
- **Per-Question Timer:** Each question has a dedicated countdown timer (e.g., 20 seconds for Easy, 60 seconds for Medium, 120 seconds for Hard).
- **Automatic Submission:** If the candidate does not answer within the allotted time, the current question is automatically submitted with no answer.
- **Answer Grading:** Answers are graded instantly, with scores assigned (100 for correct, 0 for incorrect).
- **Progress Tracking:** The app tracks the current question index, time left, and candidate responses in real-time.

### 3. Session Persistence and Resume

- **Local Storage:** Candidate progress, including current question, answers, timer state, and interview stage, is saved in `localStorage`.
- **Resume Exam:** Candidates returning to the app can resume their pending exam exactly where they left off.
- **Restart Exam:** Candidates can choose to restart the exam, clearing previous progress.

### 4. Interview Timing and Tracking

- **Start and Finish Timestamps:** The app records when the interview started and when it finished.
- **Elapsed Time Display:** Both candidates and interviewers can see the exact time taken for the interview.
- **Timer Display:** A circular timer visually shows the remaining seconds for each question.

### 5. Final Results and Feedback

- **Score Summary:** At the end of the interview, candidates see their total correct answers out of the total questions.
- **Pass/Fail Status:** The app determines if the candidate passed based on a minimum correct answer threshold (e.g., 4 out of 6).
- **Detailed Feedback:** Interviewers can view each candidate’s answers, correctness, and scores.

### 6. Interviewer Dashboard

- **Candidate List:** Displays all candidates who have taken or are taking the exam.
- **Search and Sort:** Interviewers can search candidates by name or email and sort by score or name.
- **Real-Time Elapsed Time:** For ongoing interviews, the dashboard shows live elapsed time since the interview started.
- **Detailed Candidate View:** Expandable sections show candidate summaries and detailed chat logs of questions and answers.
- **Interview Timing:** Displays start and completion timestamps for each candidate.

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ai-interview-assistant.git
   cd ai-interview-assistant

Enhancements added:
- Explicit Welcome Back modal for unfinished/paused sessions.
- Pause/resume support: session state (including endTime/timeLeft) is persisted so timers survive page reloads.
- Search and sort features in Interviewer dashboard.
- Better session management (discard / remove).
- All previously implemented features retained:
  - Resume upload (PDF/DOCX), 6-question timed interview, auto-submit on timeout, keyword grading, persistence using redux-persist.

How it works:
- When interview starts, `endTime` for the current question is saved. If you reload the page, the app computes remaining time from `endTime` and resumes automatically or auto-submits if time expired while away.
- Pausing stores the session as `paused` and it appears in the Welcome Back modal on next load.
- Interviewer dashboard lists finished candidates, searchable and sortable by score/name.

To run:
1. npm install
2. npm run dev

