import { Divider, Drawer, ListItem, makeStyles, Typography, List } from '@material-ui/core';
import React from 'react';
import VideoPlayer from './VideoPlayer';

const useStyles = makeStyles((theme) => ({
  root: {},
  list: {
    width: '250px',
  },
}));

export default function VideoPage() {
  const classes = useStyles();

  return (
    <div>
      <VideoPlayer />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={false}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <List className={classes.list}>
          {['Video 1', 'video 2', 'Video 3', 'Video 4', 'Video 5'].map((text, index) => (
            <ListItem button key={text}>
              <Typography>{text}</Typography>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} /> */}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className={classes.list}>
          {['Video 6', 'video 7', 'Video 8'].map((text, index) => (
            <ListItem button key={text}>
              <Typography>{text}</Typography>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} /> */}
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
