import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Notification from "../../utils/components/Notification";
import './style.css'

const DashboardLayout = (props) => {
    const { deviceType } = props;
    const [showNot, setShowNot] = useState(false)
    const [notText, setNotText] = useState('')
    const [notType, setNotType] = useState("");

    const showNotification = (type, text) => {
        if (!showNot) {
            setShowNot(true)
            setNotType(type)
            setNotText(text)
            setTimeout(() => {
                setShowNot(false)
            }, 5000)
        }
    }

    return (
        <>
            <Outlet context={{deviceType, showNotification}}/>

            {showNot &&
                <Notification type={notType} text={notText} />
            }
        </>
    )

}

export default DashboardLayout;