import React from "react";
import Navbar from '../components/Navbar';

class About extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="main-container">
          <h1>About</h1>
        </div>
      </>
    );
  }
};

export default About;