import React, { Component } from 'react';
import { Direction, FormattedTime, Slider } from 'react-player-controls';
import { findDOMNode } from 'react-dom';
import { Grid, IconButton, Slider as MuiSlider } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import { hot } from 'react-hot-loader'
import screenfull from 'screenfull';

import ReactPlayer from 'react-player';
import { Fullscreen, Pause, Stop, VolumeOff, VolumeUp } from '@material-ui/icons';

class App extends Component {
  state = {
    url: 'https://www.youtube.com/watch?v=9yMnfkkcb8s',
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  };

  pRate = [1, 1.5, 2];
  pIndex = 1;

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handleToggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url),
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (e, value) => {
    this.setState({ volume: parseFloat(value / 100) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (e) => {
    console.log(this.state.playbackRate);
    this.pIndex += 1;
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    console.log('onPlay');
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    console.log('onEnablePIP');
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    console.log('onDisablePIP');
    this.setState({ pip: false });
  };

  handlePause = () => {
    console.log('onPause');
    this.setState({ playing: false });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e) });
  };

  handleSeekMouseUp = (val) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(val));
  };

  handleProgress = (state) => {
    console.log('onProgress', state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  };

  handleDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState({ duration });
  };

  handleClickFullscreen = () => {
    this.fullScreen = !this.fullScreen;
    screenfull.toggle(findDOMNode(this.temp));
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player) => {
    this.player = player;
  };

  tref = (temp) => {
    this.temp = temp;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;

    return (
      <div className="app">
        <section ref={this.tref} className="section" style={{ overflow: 'hidden' }}>
          <div className="player-wrapper" style={{ overflow: 'hidden' }}>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              height={'100vh'}
              width="auto"
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={(e) => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={(e) => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
              style={{
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
            />
          </div>

          <Grid
            container
            spacing={2}
            alignItems="center"
            style={{
              overflow: 'hidden',
              width: '100vw',
              position: 'absolute',
              bottom: 0,
              backgroundColor: 'rgb(0, 0, 0, 0.4)',
              margin: 0,
              color: 'black',
            }}>
            <Grid container item xs={2} sm={1}>
              <Grid item xs={6}>
                <IconButton onClick={this.handlePlayPause} style={{ color: '#fff' }}>
                  {playing ? <Pause /> : <PlayArrowIcon />}
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton onClick={this.handlePlayPause}>
                  {<Stop style={{ color: '#fff' }} />}
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={8}>
              <BarWithTimeOnHover
                played={played}
                duration={duration}
                onChange={(newValue) => this.handleSeekChange(newValue)}
                onChangeStart={(startValue) => this.handleSeekMouseDown(startValue)}
                onChangeEnd={(endValue) => this.handleSeekMouseUp(endValue)}
              />
            </Grid>
            <Grid alignItems="center" container item xs={2} sm={2}>
              <Grid item xs={5} md={3}>
                <IconButton onClick={this.handleToggleMuted}>
                  {this.state.muted ? (
                    <VolumeOff style={{ color: '#fff' }} />
                  ) : (
                    <VolumeUp style={{ color: '#fff' }} />
                  )}
                </IconButton>
              </Grid>
              <Grid item xs={7} md={9}>
                <MuiSlider
                  value={volume * 100}
                  onChange={(event, newValue) => this.handleVolumeChange(event, newValue)}
                  style={{ color: '#fff' }}
                />
              </Grid>
            </Grid>
            <Grid container item xs={2} sm={1} alignItems="center">
              <Grid item xs={8}>
                <button
                  style={{
                    padding: '2px 16px',
                    marginLeft: '10px',
                    border: 'none',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                  }}
                  onClick={this.handleSetPlaybackRate}
                  value={this.pRate[this.pIndex % 3]}>{`${
                  this.pRate[(this.pIndex - 1) % 3]
                }x`}</button>
              </Grid>
              <Grid item xs={4}>
                <IconButton onClick={this.handleClickFullscreen}>
                  <Fullscreen style={{ color: '#fff' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </div>
    );
  }
}

export default App;

const TimeBar = ({ ...props }) => <MuiSlider style={{ color: '#fff' }} {...props} />;

// Create a tooltip that will show the time
const TimeTooltip = ({ numSeconds, style = {} }) => (
  <div
    style={{
      display: 'inline-block',
      position: 'absolute',
      bottom: '90%',
      transform: 'translateX(-50%)',
      padding: '2px 8px',
      borderRadius: 3,
      background: 'black',
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      zIndex: 10,
      ...style,
    }}>
    <FormattedTime numSeconds={numSeconds} />
  </div>
);

// Create a component to keep track of user interactions
class BarWithTimeOnHover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // This will be a normalised value between 0 and 1,
      // or null when not hovered
      hoverValue: null,
    };

    this.handleIntent = this.handleIntent.bind(this);
    this.handleIntentEnd = this.handleIntentEnd.bind(this);
  }

  handleIntent(value) {
    this.setState({
      hoverValue: value,
    });
  }

  handleIntentEnd() {
    // Note that this might not be invoked if the user ends
    // a control change with the mouse outside of the slider
    // element, so you might want to do this inside a
    // onChangeEnd callback too.
    this.setState({
      hoverValue: null,
    });
  }

  render() {
    const { duration, played } = this.props;
    const { hoverValue } = this.state;

    return (
      <Slider
        direction={Direction.HORIZONTAL}
        style={{
          position: 'relative',
        }}
        onIntent={this.handleIntent}
        onIntentEnd={this.handleIntentEnd}
        {...this.props}>
        <TimeBar value={played} min={0} max={0.99} />
        {hoverValue !== null && (
          <TimeTooltip
            numSeconds={hoverValue * duration}
            style={{
              left: `${hoverValue * 100}%`,
            }}
          />
        )}
      </Slider>
    );
  }
}
