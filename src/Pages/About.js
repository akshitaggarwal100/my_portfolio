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
            <img className='photo' src="https://media.licdn.com/dms/image/C4D03AQFEbgK0dcG7WA/profile-displayphoto-shrink_800_800/0/1660391592831?e=1680134400&v=beta&t=gsdMhdA8nov9JwrLqkEt-bFrh_7K9I4RGra-Dtqqf-Y" />
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
