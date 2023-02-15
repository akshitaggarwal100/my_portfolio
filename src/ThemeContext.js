import React, { useContext, useState, useEffect } from "react";

const themeContext = React.createContext(null)

export function ThemeContextProvider({ children }) {
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')))

    const colors = {
        lightTheme: {
            BG: '#f0e7db',
            text: '#202023',
            border: '#d4cabd',
            highlight: '#d8cec1',
            highlightText: '#f72585'
        },
        darkTheme: {
            BG: '#2a2a2e',
            text: 'white',
            border: '#4b4b57',
            highlight: '#2a2a2e',
            highlightText: '#de2b55'
        },
        
    }

    function colorSetter() {
        if (dark) {
            // light theme
            document.body.style.backgroundColor = colors.lightTheme.BG
            document.body.style.color = colors.lightTheme.text
        }
        else {
            // dark theme
            document.body.style.backgroundColor = colors.darkTheme.BG
            document.body.style.color = colors.darkTheme.text
        }
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('dark')) === null) {
            localStorage.setItem('dark', JSON.stringify(true))
            colorSetter()
        }
        if (dark) {
            // dark theme
            document.body.style.backgroundColor = colors.darkTheme.BG
            document.body.style.color = colors.darkTheme.text
        }
        else {
            // light theme
            document.body.style.backgroundColor = colors.lightTheme.BG
            document.body.style.color = colors.lightTheme.text
        }
    }, [])

    function switchTheme() {
        setDark(!dark)
        localStorage.setItem('dark', JSON.stringify(!dark))
        colorSetter()
    }

    const value = { dark, switchTheme, colors }

    return (
        <themeContext.Provider value={value}>
            {children}
        </themeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(themeContext)
}