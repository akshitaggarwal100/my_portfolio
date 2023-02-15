import React from 'react'
import { Link } from 'react-router-dom'
import './ProjectCard.css'
import { motion } from 'framer-motion'

export default function ProjectCard({ projData, index }) {

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
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: index / 10, when: 'beforeChildren' } }}
            exit={{ y: 20, opacity: 0, scale: 0.95, transition: { delay: index / 20, duration: 0.3 } }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            transition={{ type: 'tween' }}
        >
            <Link
                to={`/projects/${projData.id}`}
                className='projectCard'
            >
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'tween' }}
                    className='featuredProjImg'
                    src={projData.images[0]}
                />

                <div className='projInfo'>
                    <h1 className='projName'>{projData.name}</h1>
                    <p className='projSD'>{projData.short_desc}</p>
                    <div className='techStack'>
                        {techStack(projData)}
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}