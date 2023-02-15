import React, { useEffect } from 'react'
import './Project.css'
import { useThemeContext } from '../ThemeContext'
import { TbExternalLink } from 'react-icons/tb'
import { FiGithub } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Project({ projData }) {
    const { dark, colors } = useThemeContext()

    const navigate = useNavigate()

    function close(e) {
        if (e.target.className === 'projectBlogContainer') {
            navigate('/projects')
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', close)
        return () => document.body.removeEventListener('click', close)
    }, [])

    const slides = projData.images.map((img, index) => {
        if (index === 1 || index === 2) {
            return <motion.div
                className='catalogueImgPortrait'
            >
                <img key={index} className='catalogueImgPortrait' src={img} />
            </motion.div>
        }
        else {
            return <motion.div
                className='catalogueImg'
            >
                <img key={index} className='catalogueImg' src={img} />
            </motion.div>
        }
    })

    function techStack(projData) {
        let result = ''
        for (let i = 0; i < projData.tech.length; i++) {
            result += projData.tech[i]
            if (i < projData.tech.length - 1) {
                result += ' | '
            }
        }
        return result
    }

    return (
        <div className='projectBlogContainer'>
            <motion.div
                initial={{ y: '96vh' }}
                animate={{ y: 0 }}
                exit={{ y: '96vh' }}
                transition={{ type: 'tween', duration: 0.5 }}
                className={`projectBlog ${dark ? 'dm' : 'lm'}`}
            >
                <h1 className='projectBlogName'>{projData.name}</h1>

                <p className='projectTagline'>{projData.short_desc}</p>

                <div className='projectBlogLinks'>
                    <a className='projectBlogLink' style={{ color: dark ? colors.darkTheme.text : colors.lightTheme.text }} href={projData.link} target='_blank'>
                        <TbExternalLink />
                    </a>
                    <a className='projectBlogLink' style={{ color: dark ? colors.darkTheme.text : colors.lightTheme.text }} href={projData.github} target='_blank'>
                        <FiGithub />
                    </a>
                </div>

                <p className='projectBlogDesc'>{projData.desc}</p>

                <div className='projectBlogTechStack'>
                    {techStack(projData)}
                </div>

                <div className='catalogue'>
                    {slides}
                </div>

            </motion.div>
        </div>
    )
}
