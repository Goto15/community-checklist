import React from 'react';
import { Typography } from '@material-ui/core';

class Hero extends React.Component {
  render() {
    const img = require(`../../assets/hero_images/${Math.floor(
      Math.random() * 5
    )}.jpeg`);
    const style = {
      backgroundImage: `url(${img})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '60vh',
      position: 'fixed',
      width: '100vw',
    };
    const textStyle = {
      color: '#ffffff',
      fontWeight: '400',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '7%',
      textAlign: 'center',
      width: '50%',
    };

    return (
      <div style={style}>
        <Typography style={textStyle} variant='h1'>
          Community Checklist
        </Typography>
      </div>
    );
  }
}

export default Hero;
