import React, { useEffect, useRef, useState } from 'react';
import {
  Button, makeStyles, TextField, Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  previewContainer: {
    display: 'flex',
    margin: '0 31px',
    flexGrow: 1,
    width: '500px',
    height: '400px',
  },
});

export const ContainerPreview:React.FC = () => {
  const videoRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const [currentStreamVideo, setCurrentStreamVideo] = useState< MediaStream | null >(null);
  const [currentStreamAudio, setCurrentStreamAudio] = useState< MediaStream | null >(null);
  const [showBackground, setShowBackground] = useState(false);

  const getVideo = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setCurrentStreamVideo(videoStream);
    setCurrentStreamAudio(audioStream);
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video) {
      video.srcObject = videoStream;
      video.play();
    }
    if (audio) {
      // @ts-ignore
      audio.srcObject = audioStream;
      // @ts-ignore
      audio.play();
    }
  };
  const startAudion = () => {
    // if (audioRef.current) {
    // currentStreamVideo.getTracks().forEach((track) => {
    audioRef.current.play();
    // });
    // }
  };
  const stopAudion = () => {
    if (currentStreamAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const startCamera = () => {
    setShowBackground(false);
    console.log(videoRef?.current, currentStreamVideo);
    if (videoRef.current) {
      // if (!showBackground) {
      // setShowBackground(false);
      // }

      videoRef.current.play();
    }
  };

  const stopCamera = () => {
    if (currentStreamVideo) {
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  };

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line
  }, [videoRef]);

  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.formContainer}>
        <Typography align="center" variant="subtitle1">Join Meeting</Typography>
        <TextField />
        <Button />
      </div>
      <div className={classes.previewContainer}>
        { showBackground ? <div>kek</div> : (
          <video
            ref={videoRef}
            // width={300}
            // height={300}
            poster={'https://static.remove.bg/remove-bg-web/3661dd45c31a4ff23941855a7e4cedbbf6973643/assets/st'
          + 'art_remove-79a4598a05a77ca999df1dcb434160994b6fde2c3e9101984fb1be0f16d0a74e.png'}
          >
            <track kind="captions" />
          </video>
        ) }

        <audio ref={audioRef}>
          <track kind="captions" />
        </audio>
        <Button onClick={startAudion}>StartAudio</Button>
        <Button onClick={stopAudion}>StopAudio</Button>
        <Button onClick={startCamera}>Start</Button>
        <Button onClick={stopCamera}>Stop</Button>
      </div>
    </div>
  );
};
