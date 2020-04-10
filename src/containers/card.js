import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardMedia} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 50,
    width: 300,
    paddingTop: '56.25%', // 16:9
    alignItems: 'center',
    justifyContent: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function PrintCard(item) {
    const classes = useStyles();
    
    console.log(item.item);

    let price = `Price: $${item.item.price}`;
    
    return (
      <Card className={classes.root}>
        <CardHeader
          title={item.item.description}
          subheader={price}
        />
        <CardMedia
        className={classes.media}
        image={item.item.picture}
        title={item.item.description}
      />
      </Card>
    );
  }