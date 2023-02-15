import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import './Skills.css'
import { doc, getDoc } from 'firebase/firestore'
import Navbar from '../Components/Navbar'
import { SiFirebase } from 'react-icons/si'
import { RiReactjsFill } from 'react-icons/ri'
import { SiJavascript } from 'react-icons/si'
import { SiHtml5 } from 'react-icons/si'
import { FaCss3Alt } from 'react-icons/fa'
import { FaPython } from 'react-icons/fa'
import { SiFramer } from 'react-icons/si'
import { motion } from 'framer-motion'

export default function Skills() {
  const [skills, setSkills] = useState({ skills: [] })

  useEffect(() => {
    (async () => {
      const temp = await getDoc(doc(db, 'skills', 'skills'))
      setSkills(temp.data())
    })()
  }, [])

  function skillIcon(skill) {
    switch (skill) {
      case 'HTML':
        return <div className='skillIcon'><SiHtml5 /></div>
      case 'CSS':
        return <div className='skillIcon'><FaCss3Alt /></div>
      case 'JS':
        return <div className='skillIcon'><SiJavascript /></div>
      case 'React.js':
        return <div className='skillIcon'><RiReactjsFill /></div>
      case 'Python':
        return <div className='skillIcon'><FaPython /></div>
      case 'Firebase':
        return <div className='skillIcon'><SiFirebase /></div>
      case 'Framer Motion':
        return <div className='skillIcon'><SiFramer /></div>
    }
  }

  return (
    <div>
      <Navbar active='skills' />
      <main className='skills'>
        <div className='skillTray'>
          {skills.skills.map((skill, index) => {
            return (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: index / 10 } }}
                exit={{ y: 20, opacity: 0, transition: { delay: index / 30 } }}
                transition={{ type: 'tween' }}
                key={skill}
                className='skill'
              >
                {skillIcon(skill)}
                <p key={skill}>{skill}</p>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
