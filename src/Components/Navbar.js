import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../Firebase'
import { useThemeContext } from '../ThemeContext'
import { FaMoon } from 'react-icons/fa'
import { ImSun } from 'react-icons/im'
import { TiThMenu } from 'react-icons/ti'
import sound from './switch.wav'
import envelope from './envelope.mp3'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ active }) {
  const { dark, switchTheme, colors } = useThemeContext()
  const [menu, setMenu] = useState(false)

  function closeMenu(e) {
    if (e.target.className !== 'menuButton') {
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

    if (menu) {
      document.querySelector('#menuContainer').addEventListener('click', closeMenu)
      console.log('added')
    }

    else if (menu) {
      document.querySelector('#menuContainer').removeEventListener('click', closeMenu)
    }
  }

  const resumeRef = ref(storage, 'Akshit Aggarwal Resume.pdf')
  getDownloadURL(resumeRef)
    .then((url) => document.querySelector('.resume').setAttribute('href', url))

  function changeTheme() {
    new Audio(sound).play()
    switchTheme()
  }

  return (
    < nav className='navbar' >
      <div className='logo'>{'{Aa}'}</div>

      <ul className='navLinks'>
        <Link to='/' style={{color: active === 'about' ? (dark ? colors.darkTheme.highlightText : colors.lightTheme.highlightText) : (dark ? colors.darkTheme.text : colors.lightTheme.text)}} className='navLink'>
          <li>// About Me</li>
        </Link>

        <Link to='/projects' style={{color: active === 'projects' ? (dark ? colors.darkTheme.highlightText : colors.lightTheme.highlightText) : (dark ? colors.darkTheme.text : colors.lightTheme.text)}} className='navLink'>
          <li>// Projects</li>
        </Link>

        <Link to='/skills' style={{color: active === 'skills' ? (dark ? colors.darkTheme.highlightText : colors.lightTheme.highlightText) : (dark ? colors.darkTheme.text : colors.lightTheme.text)}} className='navLink'>
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
        <a target='_blank' download className={`resume ${dark ? 'resume_dm' : 'resume_lm'}`} onClick={() => new Audio(envelope).play()}>Resume</a>

        <TiThMenu className={menu ? 'menuButton open' : 'menuButton close'} onClick={handleMenuClick} />

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
              <a target='_blank' download className='menuLink' onClick={() => new Audio(envelope).play()}>Resume</a>
            </motion.div>}
          </motion.div>}
        </AnimatePresence>
      </div>
    </nav >
  )
}
