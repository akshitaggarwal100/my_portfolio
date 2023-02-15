import React, { useEffect, useState } from 'react'
import './Projects.css'
import { Outlet } from 'react-router-dom'
import { db } from '../Firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useThemeContext } from '../ThemeContext'
import Navbar from '../Components/Navbar'
import ProjectCard from '../Components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const { dark, switchTheme } = useThemeContext()

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
    <div>
      <Navbar active='projects' />
      <main className='projects'>
        <Outlet />
        <div className='projectsTray'>
          {projects.map((project, index) => {
            return (
              <ProjectCard
                key={project.id}
                projData={project}
                index={index}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}
