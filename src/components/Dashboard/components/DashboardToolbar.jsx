import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./DashboardIcon"

const list_items = [
    {
        "href": "/dashboard/articles", "title": "Статьи", "svg":
            <>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6 9.125A3.875 3.875 0 0 0 2.125 13v7A3.875 3.875 0 0 0 6 23.875h12A3.875 3.875 0 0 0 21.875 20v-7A3.875 3.875 0 0 0 18 9.125H6ZM3.875 13c0-1.174.951-2.125 2.125-2.125h12c1.174 0 2.125.951 2.125 2.125v7A2.125 2.125 0 0 1 18 22.125H6A2.125 2.125 0 0 1 3.875 20v-7ZM6 5.125a.875.875 0 1 0 0 1.75h12a.875.875 0 0 0 0-1.75H6Z" fill="currentColor" />
                    <path d="M8 1.125a.875.875 0 1 0 0 1.75h8a.875.875 0 0 0 0-1.75H8Z" fill="currentColor" />
                </svg>
            </>
    },
    {
        "href": "/dashboard/services", "title": "Услуги", "svg":
            <>
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.932 4.582a.85.85 0 0 0-.995.838v5.782h-1.36a.85.85 0 1 0 0 1.7h1.36v1.983h-1.36a.85.85 0 1 0 0 1.7h1.36v2.835a.85.85 0 1 0 1.7 0v-2.835h4.309a.85.85 0 0 0 0-1.7h-4.308v-1.983h3.484c1.27 0 2.27-.532 2.935-1.35.649-.798.95-1.825.95-2.816 0-.991-.301-2.019-.95-2.816-.665-.819-1.665-1.35-2.935-1.35h-4.045a.856.856 0 0 0-.145.012Zm.706 6.62h3.484c.753 0 1.27-.298 1.616-.723.363-.446.568-1.076.568-1.743s-.205-1.298-.568-1.744c-.346-.425-.863-.722-1.616-.722h-3.484V11.2Z" fill="currentColor" />
                </svg>
            </>
    },
    {
        "href": "/dashboard/specialists", "title": "Рабочие", "svg":
            <>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />
                        <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
                    </g>
                </svg>
            </>
    }
]

export default class DashboardToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceType: this.props.deviceType,
        }
    }

    render() {
        const currentPathmname = window.location.pathname
        if (this.state.deviceType === "desktop") {
            return (
                <div
                    className="dashboard-navbar__block"
                >
                    <div className="dashboard-navbar__container">
                        <ul className="dashboard-navbar__nav-list">
                            {list_items.map(item => {
                                const itemClassName = "dashboard-navbar__item" + (currentPathmname === item.href ? " dashboard-navbar__item__is-active" : "")
                                return (
                                    <li className="dashboard-navbar__nav-list_item" key={item.href}>
                                        <NavLink className={itemClassName} to={item.href}>
                                            <div className="dashboard-navbar__icon">
                                                {item.svg}
                                            </div>
                                            <span className="dashboard-navbar__text">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        } else {
            return (
                <div
                    className="dashboard-navbar__block mobile"
                >
                    <div className="dashboard-navbar__container mobile">
                        <ul className="dashboard-navbar__nav-list mobile">
                            {list_items.map(item => {
                                const itemClassName = "dashboard-navbar__item mobile" + (currentPathmname === item.href ? " dashboard-navbar__item__is-active" : "")
                                return (
                                    <li className="dashboard-navbar__nav-list_item mobile" key={item.href}>
                                        <NavLink className={itemClassName} to={item.href}>
                                            <div className="dashboard-navbar__flex-container">
                                                <div className="dashboard-navbar__icon">
                                                    {item.svg}
                                                </div>
                                                <span className="dashboard-navbar__text">
                                                    {item.title}
                                                </span>
                                            </div>
                                            <div className="dashboard-navbar__flex-container">
                                                <div className="dashboard-navbar__icon arrow">
                                                    <svg version="1.1" width={14} height={14} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 129 129">
                                                        <g>
                                                            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
    }
}
