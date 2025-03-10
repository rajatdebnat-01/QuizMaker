import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
// import Quizes from './pages/Quizes'
import Results from './pages/TakeQuiz'
import CreateQuiz from './pages/CreateQuiz'
import TakeQuiz from './pages/TakeQuiz'
import AllQuizzes from './pages/AllQuizes'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/take-quiz/:id' element={<TakeQuiz />} />
        <Route path='/all-quiz' element={<AllQuizzes />} />
        <Route path='/result' element={<Results />} />
        <Route path='/create' element={<CreateQuiz />} />

      </Routes>
    </>
  )
}

export default App
