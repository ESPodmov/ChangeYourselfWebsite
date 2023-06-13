import React from 'react';
import ServiceCard from './servicesCard';

class ServicesBlock extends React.Component {

    state = {
        cardProperties: [
            { id: 1, name: "card", info: "Card1" },
            { id: 2, name: "card", info: "Card2" },
            { id: 3, name: "card", info: "Card3" }
        ]
    }

    render() {
        return (
            <div className='cards-container'>
                {this.state.cardProperties.map((card) => <ServiceCard key={card.id} card={card}/>)}
            </div>
        )
    }
}

export default ServicesBlock;