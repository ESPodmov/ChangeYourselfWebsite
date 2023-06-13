import React from 'react';
import DashboardToolbar from './components/DashboardToolbar';
import DashboardHeader from './components/DahsboardHeader'
import "./style.css"
import { useOutletContext } from 'react-router-dom';


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deviceType: this.props.deviceType,
        }
    }

    render() {
        return (
            <>
                <DashboardToolbar
                    deviceType={this.state.deviceType}
                />
                <DashboardHeader
                    deviceType={this.state.deviceType}
                />
            </>
        )
    }

}