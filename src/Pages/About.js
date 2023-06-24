import './About.css'
import Navbar from '../Components/Navbar'
import { useThemeContext } from '../ThemeContext'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { getDoc, doc } from 'firebase/firestore'
import { IoLogoLinkedin } from 'react-icons/io'
import { FaGithubSquare } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function About() {
  const { dark } = useThemeContext()

  const [data, setData] = useState({ name: '', bio: '' })

  useEffect(() => {
    (async () => {
      const temp = await getDoc(doc(db, 'about_me', 'about_me'))
      setData(temp.data())
    })()
  }, [])

  return (
    <div>
      <Navbar active='about' />
      <main className='about'>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: 'tween' }}
          className={`aboutCard ${dark ? 'aboutCard_dm' : 'aboutCard_lm'}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween' }}
            className='photoWrapper'
          >
            <img className='photo' src="https://firebasestorage.googleapis.com/v0/b/akshit-portfolio.appspot.com/o/IMG_20220526_233014_508.jpg?alt=media&token=e5ae4bd3-ddef-4dd7-aaf9-66b1a900d57c" />
            <div className='photoContent'>
              Yeah! This is me
            </div>
          </motion.div>

          <div className='aboutInfo'>
            <div className="bio">
              <h1>{data.name}</h1>
              <p>{data.bio}</p>
            </div>

            <div className='aboutIcons'>
              <a className='aboutIcon' href="https://github.com/akshitaggarwal100" target='_blank'><FaGithubSquare /></a>
              <a className='aboutIcon' href="https://www.linkedin.com/in/akshitaggarwal7/" target='_blank'><IoLogoLinkedin /></a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
