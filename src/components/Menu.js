import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import menuLogo from "./hamburger.png"
import useClickOutside from "./useClickOutside.js"

export default function Menu() {
    const [visible, setVisible] = useState(false)
    const menuElement = useRef()

    useClickOutside(menuElement, () => {
        setVisible(false)
    })



    return (
        <div ref={menuElement} className="menu-container">
            <div className="menu-button" onClick={() => setVisible(!visible)
            }><img src={menuLogo} alt="menu" /></div>
            <div className={visible ? "menu-window active" : "menu-window inactive"}>
                <Link onClick={() => setVisible(false)} className={visible ? "menu-link link-active" : "menu-link link-inactive"} to="/customers">Customers</Link>
                <Link onClick={() => setVisible(false)} className={visible ? "menu-link link-active" : "menu-link link-inactive"} to="/trainings">Trainings</Link>
                <Link onClick={() => setVisible(false)} className={visible ? "menu-link link-active" : "menu-link link-inactive"} to="/calendar">Calendar</Link>
                <Link onClick={() => setVisible(false)} className={visible ? "menu-link link-active" : "menu-link link-inactive"} to="/statistics">Statistics</Link>
            </div>
        </div>
    )
}
