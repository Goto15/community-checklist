import React from 'react';
import TextField from '@material-ui/core/TextField';

class Search extends React.Component {
  state = {
    fields: ['name'],
  };

  //TODO: add functionality here
  handleChange = (event) => {
    this.setState({ query: event.target.value });
    console.log(this.props.google);
  };

  /* global google */
  enterPressed = (event) => {
    if (event.key === 'Enter') {
      let map = document.getElementById('map');
      let service = new google.maps.places.PlacesService(map);
      let request = {
        query: event.target.value,
        fields: this.state.fields,
      };

      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((result) => {
            console.log(result);
          });
        }
      });
    }
  };

  //TODO: Handle submission to find events
  handleSubmit = (event) => {
    console.log(event.target.value + 'Submitted');
  };

  render() {
    return (
      <TextField
        type={'search'}
        placeholder={'Search...'}
        onChange={this.handleChange}
        onKeyPress={this.enterPressed}
      />
    );
  }
}

export default Search;
