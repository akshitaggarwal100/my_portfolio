import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../Firebase'
import { useThemeContext } from '../ThemeContext'
import { FaMoon } from 'react-icons/fa'
import { ImSun } from 'react-icons/im'
import { AiOutlineMenu } from 'react-icons/ai'
import sound from './switch.wav'
import envelope from './envelope.mp3'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function Navbar({ active }) {
  const { dark, switchTheme, colors } = useThemeContext()
  const [menu, setMenu] = useState(false)
  const [resumeLink, setResumeLink] = useState('')

  async function resumeLinkGenerator() {
    const resumeRef = ref(storage, 'Akshit Aggarwal Resume.pdf')
    const url = await getDownloadURL(resumeRef)
    const response = await fetch(url)
    const blob = await response.blob()
    const fileURL = window.URL.createObjectURL(blob)
    setResumeLink(fileURL)
  }

  useEffect(() => {
    resumeLinkGenerator()
    document.body.addEventListener('click', closeMenu)
    return () => document.body.removeEventListener('click', closeMenu)
  }, [])

  function closeMenu(e) {
    if (e.target.className === 'menuContainer') {
      setMenu(false)
    }
  }

  function handleMenuClick() {
    if (active === 'about') {
      if (!menu) {
        document.querySelector('.aboutCard').style.zIndex = -1
      }
      else {
        document.querySelector('.aboutCard').style.zIndex = 0
      }
    }
    setMenu(!menu)
  }

  function downloadResume() {
    new Audio(envelope).play()
  }

  function changeTheme() {
    new Audio(sound).play()
    switchTheme()
  }

  return (
    < nav className='navbar' >
      <div className='logo'>{'{Aa}'}</div>

      <ul className='navLinks'>
        <Link to='/' style={{ color: active === 'about' ? (dark ? colors.darkTheme.highlightText : colors.lightTheme.highlightText) : (dark ? colors.darkTheme.text : colors.lightTheme.text) }} className='navLink'>
          <li>// About Me</li>
        </Link>

        <Link to='/projects' style={{ color: active === 'projects' ? (dark ? colors.darkTheme.highlightText : colors.lightTheme.highlightText) : (dark ? colors.darkTheme.text : colors.lightTheme.text) }} className='navLink'>
          <li>// Projects</li>
        </Link>

        <Link to='/skills' style={{ color: active === 'skills' ? (dark ? colors.darkTheme.highlightText : colors.lightTheme.highlightText) : (dark ? colors.darkTheme.text : colors.lightTheme.text) }} className='navLink'>
          <li>// Skills</li>
        </Link>
      </ul>

      <div className='sideControl'>
        <AnimatePresence initial={false} mode={'wait'}>
          {dark ?
            <motion.div
              key={'lb'}
              className='lightButton'
              onClick={changeTheme}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
            >
              <ImSun />
            </motion.div>
            :
            <motion.div
              key={'db'}
              className='darkButton'
              onClick={changeTheme}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
            >
              <FaMoon />
            </motion.div>
          }
        </AnimatePresence>

        <a onClick={downloadResume} href={resumeLink} download='Akshit Aggarwal Resume.pdf' className={`resume ${dark ? 'resume_dm' : 'resume_lm'}`} >Resume</a>

        <AiOutlineMenu className={`menuButton ${menu ? 'open' : 'close'}`} onClick={handleMenuClick} />

        <AnimatePresence>
          {menu && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            style={{ height: document.body.scrollHeight }}
            id='menuContainer'
            className='menuContainer'
          >
            {menu && <motion.div
              initial={{ scale: 0, opacity: 0, originX: '9rem', originY: 0 }}
              animate={{ scale: 1, opacity: 1, originX: '9rem', originY: 0 }}
              transition={{ type: 'tween', duration: 0.2 }}
              exit={{ scale: 0, opacity: 0, originX: '9rem', originY: 0 }}
              className={`menu ${dark ? 'dm' : 'lm'}`}
            >
              <Link onClick={() => setMenu(false)} className='menuLink' style={{ color: dark ? colors.darkTheme.text : colors.lightTheme.text, backgroundColor: active === 'about' ? (dark ? colors.darkTheme.highlight : colors.lightTheme.highlight) : '' }} to='/'>About Me</Link>
              <Link onClick={() => setMenu(false)} className='menuLink' style={{ color: dark ? colors.darkTheme.text : colors.lightTheme.text, backgroundColor: active === 'projects' ? (dark ? colors.darkTheme.highlight : colors.lightTheme.highlight) : '' }} to='/projects'>Projects</Link>
              <Link onClick={() => setMenu(false)} className='menuLink' style={{ color: dark ? colors.darkTheme.text : colors.lightTheme.text, backgroundColor: active === 'skills' ? (dark ? colors.darkTheme.highlight : colors.lightTheme.highlight) : '' }} to='/skills'>Skills</Link>
              <a href={resumeLink} download='Akshit Aggarwal Resume.pdf' className='menuLink' style={{ color: dark ? colors.darkTheme.text : colors.lightTheme.text }} onClick={downloadResume}>Resume</a>
            </motion.div>}
          </motion.div>}
        </AnimatePresence>
      </div>
    </nav >
  )
}
