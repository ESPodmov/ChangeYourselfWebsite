import React from "react";
import DashboardToolbar from './components/DashboardToolbar';
import DashboardHeader from './components/DahsboardHeader'
import { useOutletContext } from "react-router-dom";
import ServicesMain from './components/ServicesMain'

const DashboardServices = (props) => {
    const { deviceType, showNotification } = useOutletContext()

    if (deviceType === 'desktop') {
        return (
            <>
                <DashboardToolbar
                    deviceType={deviceType}
                />
                <DashboardHeader
                    deviceType={deviceType}
                />
                <ServicesMain deviceType={deviceType} showNotification={showNotification} />
            </>
        )
    } else {
        return (
            <ServicesMain deviceType={deviceType} showNotification={showNotification} />
        )
    }

}

export default DashboardServices;