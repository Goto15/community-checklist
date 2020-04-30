import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Typography, CardActions, Link } from '@material-ui/core';

class PlaceInfo extends React.Component {
  render() {
    const card = {
      maxWidth: '450px',
      margin: '5px',
      padding: '15px',
    };

    return (
      <Card style={card} variant='outlined'>
        {
          //Add og:image here in CardMedia
        }
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
        <CardActionArea onClick={() => window.location.replace(this.props.place.website)}>
          <CardActions>
            <Link variant="subtitle1">
              Website
            </Link>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  }
}

export default PlaceInfo;
