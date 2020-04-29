import React from 'react';

class PlaceInfo extends React.Component{

  render(){
    return(
      <div>
        Name: {this.props.place.name}<br/>
        Address: {this.props.place.address}<br/>
        Phone: {this.props.place.phone}<br/>
        <a href={this.props.place.website}>
          {this.props.place.name}'s Website
        </a>
        <br/>
        <br/>
      </div>
    )
  }
}

export default PlaceInfo;