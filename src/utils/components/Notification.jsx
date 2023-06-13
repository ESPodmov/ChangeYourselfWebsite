import React from "react";
import "./style.css";

const svgs = {
    'error':
        <svg data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
            <path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
        </svg>,
    'success':
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.53033 12.9697C4.23744 12.6768 3.76256 12.6768 3.46967 12.9697C3.17678 13.2626 3.17678 13.7374 3.46967 14.0303L7.96967 18.5303C8.26256 18.8232 8.73744 18.8232 9.03033 18.5303L20.0303 7.53033C20.3232 7.23744 20.3232 6.76256 20.0303 6.46967C19.7374 6.17678 19.2626 6.17678 18.9697 6.46967L8.5 16.9393L4.53033 12.9697Z" fill="#212121" />
        </svg>
}

const Notification = (props) => {
    const { type, text } = props;

    return (
        <div className="notification-container">
            <span className="notification-icon">
                {type === "success" && svgs.success}
                {type === "error" && svgs.error}
            </span>
            <a className="notification-text">
                {text}
            </a>
        </div>
    )
}
export default Notification;

