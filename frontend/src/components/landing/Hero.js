import React from 'react';

class Hero extends React.Component {
  render() {

    const img = require(`../../assets/hero_images/${Math.floor(Math.random() * 5)}.jpeg`)
    const style = {
      backgroundImage: `url(${img})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '60vh'
    };

    return (
      <div style={style}>
        Community Checklist
      </div>
    );
  }
}

export default Hero;
