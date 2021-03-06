import React from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

class MapSearch extends React.Component{

  //TODO: add search selection and option to add to places
  //TODO: cull correct fields to pass to setSelectedPlace
  getPlace = () => {
    this.props.setSelectedPlace(this.searchBox.getPlaces()[0]);
  };

  searchLoaded = (ref) => {
    this.searchBox = ref;
  };

  render(){
    let inputStyle = {
      boxSizing: `border-box`,
      border: `1px solid transparent`,
      width: `50%`,
      height: `32px`,
      padding: `0 12px`,
      borderRadius: `3px`,
      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
      fontSize: `14px`,
      outline: `none`,
      textOverflow: `ellipses`,
      position: 'absolute',
      left: '25%',
      top: '1%',
    };

    return(
      <StandaloneSearchBox
        onLoad={this.searchLoaded}
        onPlacesChanged={this.getPlace}
        // bounds={[500]}
      >
        <input
          type='text'
          placeholder='Search places near you...'
          style={inputStyle}
        />
      </StandaloneSearchBox>
    )
  }
}

export default MapSearch;