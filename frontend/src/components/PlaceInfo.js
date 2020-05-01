import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Typography, CardActions, CardMedia, Link } from '@material-ui/core';

class PlaceInfo extends React.Component {
  state = {
    image: null,
  };

  componentDidMount = () => {
    // this.getWebPic();
  };

  getWebPic = () => {
    fetch(this.props.place.website, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.text())
      .then((html) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        console.log(doc.querySelector('[property="og:image"]').content);
        this.setState({
          image: doc.querySelector('[property="og:image"]').content,
        });
      });
  };

  render() {
    const card = {
      maxWidth: '450px',
      margin: '5px',
      padding: '15px',
    };

    return (
      <Card style={card} variant='outlined'>
        {this.state.image ? (
          <CardMedia image={this.state.image} title={this.props.place.name} />
        ) : null}
        <Typography variant='h5' component='h2'>
          {this.props.place.name}
        </Typography>
        <Typography
          gutterBottom
          variant='body2'
          color='textSecondary'
          component='h2'
        >
          {this.props.place.address}
        </Typography>
        <Typography variant='subtitle1'>{this.props.place.phone}</Typography>
        <CardActionArea
          onClick={() => window.location.replace(this.props.place.website)}
        >
          <CardActions>
            <Link variant='subtitle1' target="_blank">Website</Link>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  }
}

export default PlaceInfo;
