import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Button, Typography, CardActions, CardMedia, Link } from '@material-ui/core';

const placeURL = 'http://localhost:4000/user_places/';

class PlaceInfo extends React.Component {
  deletePlace = () => {
    fetch(placeURL + this.props.place.upid, {
      method: 'DELETE',
    })
      .then((resp) => resp.json())
      .then((json) => {
        this.props.refreshPlaces(this.props.usergid);
      });
  };

  render() {
    const bigCard ={
      float: 'left',
      height: '500px',
      margin: '10px',
      width: '300px',
    }

    const card = {
      padding: '15px'
    };

    const media = {
      height: '150px',
    };

    const noteStyle = {
      maxHeight: '100px',
      overflowX: 'hidden',
      overflowY: 'auto',
      padding: '5px',
    };

    return (
      <Card style={bigCard} variant='outlined'>
        <CardMedia
          image={this.props.place.img}
          style={media}
          title={this.props.place.name}
        />
        <div style={card}>
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
          <Typography variant='body2'>{this.props.place.visited}</Typography>
          {this.props.place.notes ? (
            <Typography variant='body1' style={noteStyle}>
              {this.props.place.notes}
            </Typography>
          ) : null}
          <CardActionArea
            onClick={() => window.open(this.props.place.website, '_blank')}
          >
            <CardActions>
              <Link variant='subtitle1'>Website</Link>
            </CardActions>
          </CardActionArea>
          <Button onClick={this.deletePlace} variant='contained' color='primary' style={{position: 'relative', bottom: '0'}}>
            Delete
          </Button>
        </div>
      </Card>
    );
  }
}

export default PlaceInfo;
