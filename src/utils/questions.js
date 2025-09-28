export const QUESTIONS = [
  { text: 'What is JSX in React?', options: ['JavaScript XML', 'Java Syntax', 'JSON Syntax', 'JavaScript Export'], correct: 'JavaScript XML', level: 'Easy', time: 20 },
  { text: 'Which hook is used for state management in React?', options: ['useEffect', 'useState', 'useReducer', 'useRef'], correct: 'useState', level: 'Easy', time: 20 },
  { text: 'Which method is used to render React components in DOM?', options: ['ReactDOM.render()', 'React.render()', 'DOM.render()', 'renderReact()'], correct: 'ReactDOM.render()', level: 'Easy', time: 20 },
  { text: 'What is the default port for Node.js servers?', options: ['3000', '8080', '5000', '80'], correct: '3000', level: 'Easy', time: 20 },
  { text: 'What is the command to create a React app using Vite?', options: ['npx create-vite', 'npm create vite@latest', 'npx create-react-app', 'npm init react-app'], correct: 'npm create vite@latest', level: 'Easy', time: 20 },
  { text: 'Which keyword is used to declare variables in ES6?', options: ['var', 'let', 'int', 'define'], correct: 'let', level: 'Easy', time: 20 },
  { text: 'Which method converts JSON to JavaScript object?', options: ['JSON.stringify()', 'JSON.parse()', 'JSON.object()', 'JSON.toJS()'], correct: 'JSON.parse()', level: 'Easy', time: 20 },
  { text: 'Which of these is a React lifecycle method?', options: ['componentDidMount', 'init()', 'start()', 'load()'], correct: 'componentDidMount', level: 'Easy', time: 20 },
  { text: 'How do you pass data from parent to child in React?', options: ['Props', 'State', 'Context', 'Reducer'], correct: 'Props', level: 'Easy', time: 20 },
  { text: 'Which is a Node.js framework for building APIs?', options: ['Express', 'React', 'Angular', 'Vue'], correct: 'Express', level: 'Easy', time: 20 },
  { text: 'How do you create a state variable in React?', options: ['const [state, setState] = useState()', 'let state = useState()', 'state = useState()', 'useState()'], correct: 'const [state, setState] = useState()', level: 'Easy', time: 20 },
  { text: 'Which method is used to handle promises in JS?', options: ['then()', 'done()', 'await()', 'promise()'], correct: 'then()', level: 'Easy', time: 20 },
  { text: 'What does Node.js use to manage packages?', options: ['npm', 'yarn', 'pip', 'composer'], correct: 'npm', level: 'Easy', time: 20 },
  { text: 'Which hook is used for side effects in React?', options: ['useState', 'useEffect', 'useReducer', 'useContext'], correct: 'useEffect', level: 'Easy', time: 20 },
  { text: 'Which HTML attribute is used to reference a CSS class?', options: ['class', 'id', 'style', 'className'], correct: 'className', level: 'Easy', time: 20 },
  { text: 'Which command installs dependencies from package.json?', options: ['npm install', 'npm start', 'npm run', 'npm init'], correct: 'npm install', level: 'Easy', time: 20 },
  { text: 'Which of these is used for routing in React?', options: ['React Router', 'Express Router', 'Angular Router', 'Vue Router'], correct: 'React Router', level: 'Easy', time: 20 },
  { text: 'How do you pass a function as prop in React?', options: ['<Child func={myFunc} />', '<Child function=myFunc />', '<Child callback={myFunc} />', 'All'], correct: '<Child func={myFunc} />', level: 'Easy', time: 20 },
  { text: 'Which operator is used for default values in JS?', options: ['||', '??', '&&', '!'], correct: '||', level: 'Easy', time: 20 },
  { text: 'Which method removes the last element from an array in JS?', options: ['pop()', 'push()', 'shift()', 'unshift()'], correct: 'pop()', level: 'Easy', time: 20 },

  { text: 'What is the difference between let and var?', options: ['Scope', 'Hoisting', 'Both', 'None'], correct: 'Both', level: 'Medium', time: 60 },
  { text: 'What is the purpose of useReducer hook?', options: ['State management', 'Side effects', 'DOM manipulation', 'Routing'], correct: 'State management', level: 'Medium', time: 60 },
  { text: 'Which method is used to join path in Node.js?', options: ['path.join()', 'path.resolve()', 'path.concat()', 'path.path()'], correct: 'path.join()', level: 'Medium', time: 60 },
  { text: 'How do you memoize a component in React?', options: ['React.memo()', 'useMemo()', 'useCallback()', 'memoComponent()'], correct: 'React.memo()', level: 'Medium', time: 60 },
  { text: 'Which event triggers re-render in React?', options: ['State change', 'Props change', 'Context change', 'All'], correct: 'All', level: 'Medium', time: 60 },
  { text: 'Which package is used to parse HTTP requests in Express?', options: ['body-parser', 'express-json', 'http-parser', 'request'], correct: 'body-parser', level: 'Medium', time: 60 },
  { text: 'Which hook caches computed values?', options: ['useMemo', 'useEffect', 'useCallback', 'useState'], correct: 'useMemo', level: 'Medium', time: 60 },
  { text: 'How do you create middleware in Express?', options: ['function(req,res,next)', 'app.use()', 'Both', 'None'], correct: 'Both', level: 'Medium', time: 60 },
  { text: 'What is the difference between require() and import?', options: ['CommonJS vs ES Module', 'Syntax', 'Both', 'None'], correct: 'Both', level: 'Medium', time: 60 },
  { text: 'Which method adds elements at the beginning of an array?', options: ['unshift()', 'push()', 'shift()', 'concat()'], correct: 'unshift()', level: 'Medium', time: 60 },
  { text: 'Which hook is used to memoize a function?', options: ['useCallback', 'useMemo', 'useEffect', 'useState'], correct: 'useCallback', level: 'Medium', time: 60 },
  { text: 'Which HTTP method is used to delete a resource?', options: ['DELETE', 'POST', 'GET', 'PUT'], correct: 'DELETE', level: 'Medium', time: 60 },
  { text: 'Which lifecycle method runs before component mounts?', options: ['constructor', 'componentDidMount', 'componentWillMount', 'render'], correct: 'constructor', level: 'Medium', time: 60 },
  { text: 'How do you prevent default form submission in JS?', options: ['event.preventDefault()', 'return false', 'stopPropagation()', 'None'], correct: 'event.preventDefault()', level: 'Medium', time: 60 },
  { text: 'Which Express method serves static files?', options: ['express.static()', 'app.use()', 'staticServe()', 'serveFiles()'], correct: 'express.static()', level: 'Medium', time: 60 },
  { text: 'How do you pass multiple props in React?', options: ['<Comp prop1={a} prop2={b} />', '<Comp {...props} />', 'Both', 'None'], correct: 'Both', level: 'Medium', time: 60 },
  { text: 'Which Node.js module is used for file operations?', options: ['fs', 'file', 'io', 'path'], correct: 'fs', level: 'Medium', time: 60 },
  { text: 'Which method in React prevents unnecessary re-render?', options: ['shouldComponentUpdate', 'useEffect', 'useMemo', 'useCallback'], correct: 'shouldComponentUpdate', level: 'Medium', time: 60 },
  { text: 'Which operator spreads array elements?', options: ['...', '++', '+', '**'], correct: '...', level: 'Medium', time: 60 },
  { text: 'Which HTTP status code indicates success?', options: ['200', '404', '500', '403'], correct: '200', level: 'Medium', time: 60 },
  { text: 'Which lifecycle hook replaces componentWillMount in React 16+', options: ['useEffect', 'componentDidMount', 'constructor', 'render'], correct: 'useEffect', level: 'Medium', time: 60 },

  { text: 'Explain event loop in Node.js.', options: ['Async task manager', 'Synchronous loop', 'CPU scheduler', 'Memory manager'], correct: 'Async task manager', level: 'Hard', time: 120 },
  { text: 'What is context API used for?', options: ['Global state', 'Local state', 'Routing', 'Hooks'], correct: 'Global state', level: 'Hard', time: 120 },
  { text: 'What is the difference between useEffect and useLayoutEffect?', options: ['Execution timing', 'Syntax', 'Return value', 'None'], correct: 'Execution timing', level: 'Hard', time: 120 },
  { text: 'Explain middleware chaining in Express.', options: ['Sequential execution', 'Parallel execution', 'Conditional execution', 'None'], correct: 'Sequential execution', level: 'Hard', time: 120 },
  { text: 'Which Node.js module handles streams?', options: ['stream', 'fs', 'http', 'buffer'], correct: 'stream', level: 'Hard', time: 120 },
  { text: 'How do you optimize React performance?', options: ['Memoization', 'Code splitting', 'Lazy loading', 'All'], correct: 'All', level: 'Hard', time: 120 },
  { text: 'What is SSR in React?', options: ['Server Side Rendering', 'Static Site Rendering', 'Synchronous Rendering', 'Server Script Rendering'], correct: 'Server Side Rendering', level: 'Hard', time: 120 },
  { text: 'Explain difference between let, var, const in JS.', options: ['Scope and hoisting', 'Only scope', 'Only hoisting', 'None'], correct: 'Scope and hoisting', level: 'Hard', time: 120 },
  { text: 'What is the purpose of useCallback hook?', options: ['Memoize functions', 'State management', 'Side effects', 'Context'], correct: 'Memoize functions', level: 'Hard', time: 120 },
  { text: 'Explain difference between CommonJS and ES modules.', options: ['Syntax and loading', 'Only syntax', 'Only loading', 'None'], correct: 'Syntax and loading', level: 'Hard', time: 120 }
]
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
export function gradeAnswer(question, answer) {
  const isCorrect = question.correct === answer
  return {
    score: isCorrect ? 100 : 0, 
    reason: isCorrect ? 'Correct' : `Incorrect. Correct answer: ${question.correct}`
  }
}
