import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { screenShot } from '../../utils';

export default function Screenshot(props : any) {
  const { dataURL } = props;
  const { setDataURL } = props;
  const { rect } = props;
  const { setRect } = props;

  const canvasRef = useRef(null);
  // const canvas : any = canvasRef.current;
  // console.log("canvas :::: " , canvas);

  function cropcallback() {
    chrome.storage.local.get({ screenshot: null }, (data) => {
      setDataURL(data.screenshot);
    });
  }

  function takeScreenShot() {
    screenShot('take', cropcallback); // saves to local storage
  }

  function clearScreenShot() {
    const canvas : any = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      screenShot('clear', cropcallback); // saves to local storage
    }
  }

  cropcallback();

  useEffect(() => {
    const canvas : any = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext('2d');
      const img = new Image();
      // eslint-disable-next-line func-names
      img.onload = function () {
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height, // source rectangle
          0,
          0,
          canvas.width,
          canvas.height,
        ); // destination rectangle
        setRect(
          {
            width: img.width,
            height: img.height,
            maxWidth: img.width,
            maxHeight: img.height,
            ...rect,
          },
        );
      };
      img.src = dataURL;
    }
  }, [dataURL]);

  useEffect(() => {
    const canvas : any = canvasRef.current;
    // const canvas : any = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext('2d');
      const img = new Image();
      // eslint-disable-next-line func-names
      img.onload = function () {
        context.drawImage(
          img,
          rect.startX,
          rect.startY,
          rect.width,
          rect.height, // source rectangle
          0,
          0,
          canvas.width,
          canvas.height,
        ); // destination rectangle
      };
      img.src = dataURL;
    }
  }, [rect]);

  function changeSize(event : any) {
    const value = parseInt(event.target.value, 10);
    const item = event.target.id;
    let newRect;
    switch (item) {
      case 'startX':
        newRect = {
          startX: value,
          startY: rect.startY,
          width: Math.min(
            rect.width,
            rect.width - (value + rect.width - rect.maxWidth),
          ),
          height: rect.height,
          maxHeight: rect.maxHeight,
          maxWidth: rect.maxWidth,
        };
        break;

      case 'startY':
        newRect = {
          startX: rect.startX,
          startY: value,
          width: rect.width,
          height: Math.min(
            rect.height,
            rect.height - (value + rect.height - rect.maxHeight),
          ),
          maxHeight: rect.maxHeight,
          maxWidth: rect.maxWidth,
        };
        break;
      case 'rect-width':
        newRect = {
          startX: rect.startX,
          startY: rect.startY,
          width: value,
          height: rect.height,
          maxHeight: rect.maxHeight,
          maxWidth: rect.maxWidth,
        };
        break;

      case 'rect-height':
        newRect = {
          startX: rect.startX,
          startY: rect.startY,
          width: rect.width,
          height: value,
          maxHeight: rect.maxHeight,
          maxWidth: rect.maxWidth,
        };
        break;

      default:
        break;
    }

    setRect(newRect);
  }

  return (
    <div>
      <Button onClick={takeScreenShot}> Include Screenshot </Button>
      <Button
        style={{ display: dataURL ? 'block' : 'none' }}
        onClick={clearScreenShot}
      >
        {' '}
        Clear
        {' '}
      </Button>
      <canvas
        style={{ display: dataURL ? 'block' : 'none' }}
        ref={canvasRef}
        width="auto"
        height="auto"
      />
      <Box display={dataURL ? 'block' : 'none'}>
        <TextField
          id="startX"
          label="startX"
          type="number"
          InputProps={{
            inputProps: {
              max: rect.maxWidth,
              min: 0,
            },
          }}
          value={rect.startX}
          onChange={changeSize}
          margin="normal"
        />
        <TextField
          id="startY"
          label="startY"
          type="number"
          InputProps={{
            inputProps: {
              max: rect.maxHeight,
              min: 0,
            },
          }}
          value={rect.startY}
          onChange={changeSize}
          margin="normal"
        />
        <TextField
          id="rect-width"
          label="width"
          type="number"
          InputProps={{
            inputProps: {
              max: rect.maxWidth - rect.startX,
              min: 0,
            },
          }}
          value={rect.width}
          onChange={changeSize}
          margin="normal"
        />
        <TextField
          id="rect-height"
          label="height"
          type="number"
          InputProps={{
            inputProps: {
              max: rect.maxHeight - rect.startY,
              min: 0,
            },
          }}
          value={rect.height}
          onChange={changeSize}
          margin="normal"
        />
      </Box>
    </div>
  );
  // return (
  //   <div className="row">
  //       <div className="col-lg-12 text-center">
  //           <p className="lead mb-0">Netvyne Extension</p>
  //       </div>
  //   </div>
  // );
}
