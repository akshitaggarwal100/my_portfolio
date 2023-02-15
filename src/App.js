import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Project from './Components/Project';
import Skills from './Pages/Skills';
import { db } from './Firebase'
import { getDocs, collection } from 'firebase/firestore'
import { ThemeContextProvider } from './ThemeContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, 'projects'))
      let temp = []

      data.forEach((info) => {
        temp.push(info.data())
      })

      setProjects(temp)
    })()
  }, [])

  return (
    <ThemeContextProvider>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route path='/' exact element={<About />} />
          <Route path='skills' element={<Skills />} />
          <Route path='projects' element={<Projects />}>
            {projects.map((project) => {
              return <Route key={project.id} path={project.id} element={<Project projData={project} />} />
            })}
          </Route>
        </Routes>
      </AnimatePresence>
    </ThemeContextProvider>
  );
}

export default App;
