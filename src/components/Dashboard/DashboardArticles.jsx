import React from "react";
import DashboardToolbar from './components/DashboardToolbar';
import DashboardHeader from './components/DahsboardHeader'
import ArticlesMain from "./components/ArticlesMain";
import { useOutletContext } from "react-router-dom";

function DashboardArticles() {
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
                <ArticlesMain deviceType={deviceType} showNotification={showNotification} />
            </>
        )
    } else {
        return (
            <ArticlesMain deviceType={deviceType} showNotification={showNotification} />
        )
    }

}

export default DashboardArticles