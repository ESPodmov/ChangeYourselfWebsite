import React from 'react';

const ServiceCard = (props) => {

    return (
        <div className="service-card">
            <div>
                <h1>{props.card.info}</h1>
            </div>
            <h3>{props.card.name}</h3>
        </div>
    )
};

export default ServiceCard;