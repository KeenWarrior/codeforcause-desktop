import { makeStyles } from '@material-ui/core';
import React from 'react';
import VideoPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function YoutubePlayer() {
  const classes = useStyles();

  return (
    <VideoPlayer
      url="https://www.youtube.com/watch?v=i5oP95218IQ"
      pip={true}
      playing={false}
      controls={false}
      light={false}
      onReady={() => console.log('onReady')}
      onStart={() => console.log('onStart')}
    />
  );
}
