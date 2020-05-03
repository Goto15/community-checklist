import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Typography, CardActions, CardMedia, Link } from '@material-ui/core';

class PlaceInfo extends React.Component {
  state = {
    image: null,
  };

  render() {
    const card = {
      float: 'left',
      height: '150px',
      margin: '10px',
      padding: '15px',
      width: '400px',
    };

    const noteStyle = {
      padding: '5px',
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
          style={{ overflow: 'hidden' }}
        >
          {this.props.place.address}
        </Typography>
        <Typography variant='subtitle1'>{this.props.place.phone}</Typography>
        <Typography variant="h6">{this.props.place.visited}</Typography>
        {
          this.props.place.notes ? (
            <Typography variant='body1' style={noteStyle}>
              Notes: {this.props.place.notes}
            </Typography>
          ) : null }
        <CardActionArea
          onClick={() => window.open(this.props.place.website, '_blank')}
        >
          <CardActions>
            <Link variant='subtitle1'>Website</Link>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  }
}

export default PlaceInfo;
