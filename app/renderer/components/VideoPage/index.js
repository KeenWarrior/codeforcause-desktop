import {
  Divider,
  Drawer,
  ListItem,
  makeStyles,
  Typography,
  List,
  Button,
  Icon,
} from '@material-ui/core';
import { ChevronLeft, ExitToApp, PlayCircleFilled } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const useStyles = makeStyles((theme) => ({
  root: {},
  list: {
    width: '280px',
  },
  btn: {
    color: 'transparent',
    height: '100vh',
    width: '100px',
    backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    right: 0,
    '&:hover': {
      color: 'rgb(255, 255, 255, 0.8)',
      backgroundImage: 'linear-gradient(to left, rgb(0,0,0,0.4) , transparent)',
    },
  },
  listItem: {
    // backgroundColor: 'rgb(0,0,0,0.5)',
    margin: '2px 0px',
    width: '100%',
  },
  icon: {
    fontSize: '150px',
  },
  drawer: {
    display: 'flex',
  },
}));

export default function VideoPage() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [vIndex, setVindex] = useState(2);

  const toggleDrawer = (status) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(status);
  };

  const videoList = [
    {
      name: 'Video 1',
      url: 'https://www.youtube.com/watch?v=ICRB3wqbzzI',
    },
    {
      name: 'Video 2',
      url: 'https://www.youtube.com/watch?v=2CLV9vTkXiU',
    },
    {
      name: 'Video 3',
      url: 'https://www.youtube.com/watch?v=pK2XfBuM9a8',
    },
    {
      name: 'Video 4',
      url: 'https://www.youtube.com/watch?v=xwRdVWTQ4AM',
    },
    {
      name: 'Video 5',
      url: 'https://www.youtube.com/watch?v=JyPzh69ZCyw',
    },
  ];

  return (
    <div>
      <VideoPlayer videoList={videoList} videoIndex={vIndex} />
      <Button className={classes.btn} onClick={toggleDrawer(true)}>
        <ChevronLeft className={classes.icon} />
      </Button>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={open}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ flexGrow: 1 }}>
          <Divider />
          <List className={classes.list}>
            <ListItem>
              <Typography variant="h6">Classroom Lessons</Typography>
            </ListItem>
            <Divider />
            {videoList.map(({ name }, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  setVindex(index);
                }}
                className={classes.listItem}
                style={index === vIndex ? { backgroundColor: 'pink' } : {}}>
                <PlayCircleFilled style={{ color: 'lightskyblue', marginRight: '12px' }} />
                <Typography variant="caption">{name}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List className={classes.list}>
            {['Video 6', 'video 7', 'Video 8'].map((text, index) => (
              <ListItem button key={text} className={classes.listItem}>
                <PlayCircleFilled style={{ color: 'lightskyblue', marginRight: '12px' }} />
                <Typography variant="caption">{text}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
        <List>
          <ListItem>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
              <ExitToApp style={{ color: 'lightskyblue', marginRight: '12px' }} />
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: 'none', color: 'black', marginBottom: '5px' }}>
              <Typography variant="caption">Go back To course page</Typography>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
