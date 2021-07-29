import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Button, Checkbox, FormControlLabel, IconButton, makeStyles, TextField, Typography,
} from '@material-ui/core';

import { io } from 'socket.io-client';

import {
  MicSharp as MicSharpIcon,
  MicOffSharp as MicOffSharpIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
} from '@material-ui/icons';

const socket = io('http://localhost:5000');

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '90px',
    paddingBottom: '128px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
  },
  formGroupInput: {
    margin: '10px 0',
  },
  formSubmitButton: {
    margin: '25px 5px',
  },

  previewContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 31px',
    flexGrow: 1,
    width: '500px',
    height: '315px',
    background: '#242424',
    borderRadius: '14px',

  },
  previewContainerButtons: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '10px',
    left: 0,
    right: 0,
    '& .MuiSvgIcon-root': {
      fill: 'white',
    },

  },
});

export const ContainerPreview:React.FC = () => {
  const deviceRef = useRef<any>(null);
  const [currentStreamVideo, setCurrentStreamVideo] = useState< MediaStream | null >(null);
  const [audioStatus, setAudioStatus] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const [currentID, setCurrentID] = useState<string>('');
  const [callId, setCallId] = useState<string>('');

  const getDevices = async () => {
    try {
      const devicesData = await navigator.mediaDevices.enumerateDevices();
      const cams = devicesData.filter((device) => device.kind === 'videoinput');
      const mics = devicesData.filter((device) => device.kind === 'audioinput');

      const constraints = { video: cams.length > 0, audio: mics.length > 0 };
      const videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      setCurrentStreamVideo(videoStream);
      const devices = deviceRef.current;
      if (devices) {
        devices.srcObject = videoStream;
        devices.play();

        if (cams.length) {
          setVideoStatus(true);
        }
        if (mics.length) {
          setAudioStatus(true);
        }
      }
    } catch (e) {
      throw Error(e);
    }
  };

  const toggleCameraDevice = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentStreamVideo) {
      currentStreamVideo.getVideoTracks()[0].enabled = !videoStatus;
      return setVideoStatus(!videoStatus);
    }
    return null;
  };

  const toggleAudioDevice = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (currentStreamVideo) {
      currentStreamVideo.getAudioTracks()[0].enabled = !audioStatus;
      setAudioStatus(!audioStatus);
    }
    return null;
  };
  const handleChangeName = (event:React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value.trim());
  const handleChangeCallId = (event:React.ChangeEvent<HTMLInputElement>) => setCallId(event.target.value.trim());
  const handleCheck = (event:React.ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);

  const showAudioIcon = () => (audioStatus ? <MicSharpIcon /> : <MicOffSharpIcon />);
  const showVideoIcon = () => (videoStatus ? <VideocamIcon /> : <VideocamOffIcon />);

  const handleSubmit = (event:React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.on('callUser', (data:any) => {
      console.log(data);
    });
  };

  useEffect(() => {
    (async function () {
      await getDevices();
    }());
  }, [deviceRef]);

  useEffect(() => {
    socket.on('me', (id:string) => {
      setCurrentID(id);
    });
  }, []);
  const classes = useStyles();


  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.formContainer}>
          <Typography align="center" variant="subtitle1">Join Meeting</Typography>
          <Typography align="center" variant="subtitle2">{`Your id ${currentID}`}</Typography>
          <form className={classes.formGroup} onSubmit={handleSubmit}>
            <TextField
              className={classes.formGroupInput}
              id="outlined-basic"
              label="Your name"
              variant="outlined"
              onChange={handleChangeName}
              value={userName}
            />
            <TextField
              className={classes.formGroupInput}
              id="outlined-basic"
              label="Enter id to call"
              variant="outlined"
              onChange={handleChangeCallId}
              value={callId}
            />
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" value={checked} onChange={handleCheck} />}
              label="Remember my name for future meetings"
              labelPlacement="end"
            />
            <Button variant="contained" type="submit" color="primary" className={classes.formSubmitButton} disabled={!userName && !callId}>
              <Typography align="center" variant="subtitle2">Join</Typography>
            </Button>
          </form>

        </div>
        <div className={classes.previewContainer}>
          <video ref={deviceRef}>
            <track kind="captions" />
          </video>
          <div className={classes.previewContainerButtons}>
            <IconButton key="audioButton" onClick={toggleAudioDevice}>
              {showAudioIcon()}
            </IconButton>
            <IconButton key="videoButton" onClick={toggleCameraDevice}>
              {showVideoIcon()}
            </IconButton>
          </div>
        </div>
      </div>

    </>
  );
};
