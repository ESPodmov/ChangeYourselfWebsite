import React from 'react';
import "../styles/index.css";
import Navbar from '../components/Navbar';
import ServicesBlock from "../components/servicesBlock";


class Home extends React.Component {
	render() {
		return (
			<>
				<Navbar />
				<div className='main-container'>
					<ServicesBlock />
				</div>
			</>
		);
	}
};

export default Home;
