import React from "react";
import DashboardToolbar from "./components/DashboardToolbar";
import DashboardHeader from './components/DahsboardHeader';
import SpecialistsMain from "./components/SpecialistsMain";
import { useOutletContext } from "react-router-dom";

const DashboardSpecialists = (props) => {
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
                <SpecialistsMain deviceType={deviceType} showNotification={showNotification} />
            </>
        )
    } else {
        return (
            <SpecialistsMain deviceType={deviceType} showNotification={showNotification} />
        )
    }

}

export default DashboardSpecialists