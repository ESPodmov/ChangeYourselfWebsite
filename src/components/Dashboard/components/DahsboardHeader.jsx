import React from "react";
import Logo from "./DashboardIcon"

export default class DashboardHeader extends React.Component {

    render() {
        if (this.props.deviceType === "desktop") {
            return (
                <div className="dashboard__header-container">
                    <div className="dashboard__header-container__wrapper">
                        <div className="dashboard__haeder-main-container">
                            <div className="dashboard__icon-container">
                                <a className="dashboard__icon-container" href="/dashboard">
                                    <Logo />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="dashboard__header-container">
                    <div className="dashboard__header-container__wrapper mobile">
                        <div className="dashboard__haeder-main-container mobile">
                            <a className="dashboard__icon-container mobile" href="/dashboard">
                                <span>Панель управления</span>
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}