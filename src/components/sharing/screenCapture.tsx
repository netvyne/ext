import React, { Component, Fragment } from 'react';
import html2canvas from 'html2canvas';

interface Props {
    onEndCapture: (url: string) => void;
    onStartCapture: () => void;
}
  
//   interface State {
//     error: boolean;
//     field: string;
//     maxLength: number;
//     classes: any;
//     label: string;
//     edit_form: any;
//   }

interface State {
    on: boolean;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    crossHairsTop: number;
    crossHairsLeft: number;
    isMouseDown: boolean;
    windowWidth: number;
    windowHeight: number;
    borderWidth: number;
    cropPositionTop: number;
    cropPositionLeft: number;
    cropWidth: number;
    cropHeigth: number;
    imageURL: string;
};

class ScreenCapture extends React.Component<Props, State> {
// export default function Screenshot(props : any) {

    constructor(props : Props) {
        super(props);
        this.state = {
            on: false,
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            crossHairsTop: 0,
            crossHairsLeft: 0,
            isMouseDown: false,
            windowWidth: 0,
            windowHeight: 0,
            borderWidth: 0,
            cropPositionTop: 0,
            cropPositionLeft: 0,
            cropWidth: 0,
            cropHeigth: 0,
            imageURL: ''
        };
      }

    componentDidMount = () => {
        this.handleWindowResize()
        window.addEventListener('resize', this.handleWindowResize)
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    handleWindowResize = () => {
        const windowWidth : any = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const windowHeight : any = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.setState({
            windowWidth,
            windowHeight
        })
    }

    handStartCapture = () => {
        const handStartBool : any = true;
        this.setState({ on: handStartBool })
    }


    handleMouseMove = (e : any) => {
        const { isMouseDown, windowWidth, windowHeight, startX, startY, borderWidth } = this.state;
    
        let cropPositionTop = startY
        let cropPositionLeft = startX
        const endX = e.clientX
        const endY = e.clientY
        const isStartTop = endY >= startY
        const isStartBottom = endY <= startY
        const isStartLeft = endX >= startX
        const isStartRight = endX <= startX
        const isStartTopLeft = isStartTop && isStartLeft
        const isStartTopRight = isStartTop && isStartRight
        const isStartBottomLeft = isStartBottom && isStartLeft
        const isStartBottomRight = isStartBottom && isStartRight
        let newBorderWidth : any = borderWidth
        let cropWidth = 0
        let cropHeigth = 0
    
        if (isMouseDown) {
          if (isStartTopLeft) {
            newBorderWidth = `${startY}px ${windowWidth - endX}px ${windowHeight - endY}px ${startX}px`
            cropWidth = endX - startX
            cropHeigth = endY - startY
          }
    
          if (isStartTopRight) {
            newBorderWidth = `${startY}px ${windowWidth - startX}px ${windowHeight - endY}px ${endX}px`
            cropWidth = startX - endX
            cropHeigth = endY - startY
            cropPositionLeft = endX
          }
    
          if (isStartBottomLeft) {
            newBorderWidth = `${endY}px ${windowWidth - endX}px ${windowHeight - startY}px ${startX}px`
            cropWidth = endX - startX
            cropHeigth = startY - endY
            cropPositionTop = endY
          }
    
          if (isStartBottomRight) {
            newBorderWidth = `${endY}px ${windowWidth - startX}px ${windowHeight - startY}px ${endX}px`
            cropWidth = startX - endX
            cropHeigth = startY - endY
            cropPositionLeft = endX
            cropPositionTop = endY
          }
        }
    
        this.setState({
            crossHairsTop: e.clientY,
            crossHairsLeft: e.clientX,
            borderWidth: newBorderWidth,
            cropWidth,
            cropHeigth,
            cropPositionTop: cropPositionTop,
            cropPositionLeft: cropPositionLeft
        })
    }

    handleMouseDown = (e : any) => {
        const startX : any = e.clientX
        const startY : any = e.clientY
    
        // this.setState((prevState : any) => ({
        //   startX,
        //   startY,
        //   cropPositionTop: startY,
        //   cropPositionLeft: startX,
        //   isMouseDown: true,
        //   borderWidth: `${prevState.windowWidth}px ${prevState.windowHeight}px`
        // }))
      }


    handleMouseUp = (e : any) => {
        this.handleClickTakeScreenShot()
        this.setState({
            on: false,
            isMouseDown: false,
            borderWidth: 0
        })
    }

    handleClickTakeScreenShot = () => {
        const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = this.state
        const body : any = document.querySelector('body')
    
        html2canvas(body).then(canvas => {
            let croppedCanvas : any = document.createElement('canvas')
            let croppedCanvasContext : any = croppedCanvas.getContext('2d')

            croppedCanvas.width = cropWidth;
            croppedCanvas.height = cropHeigth;

            croppedCanvasContext.drawImage(canvas, cropPositionLeft, cropPositionTop, cropWidth, cropHeigth, 0, 0, cropWidth, cropHeigth);

            this.props.onEndCapture(croppedCanvas.toDataURL());
            // this.props.onEndCapture();
        });
    }

    renderChild = () => {
        const { children } = this.props
    
        const props = {
          onStartCapture: this.handStartCapture
        }
    
        if (typeof children === 'function') return children(this.props)
        // return children
        return []
    }

    render() {
        const {
          on,
          crossHairsTop,
          crossHairsLeft,
          borderWidth,
          isMouseDown,
          imageURL
        } = this.state
    
        // if (!on) return this.renderChild()
    
        return (
          <div
            onMouseMove={this.handleMouseMove}
            // onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            {this.renderChild()}
            <div
              className={`overlay ${isMouseDown && 'highlighting'}`}
              style={{ borderWidth }}
            />
            <div
              className="crosshairs"
              style={{ left: crossHairsLeft + 'px', top: crossHairsTop + 'px' }}
            />
          </div>
        )
    }
}

export default ScreenCapture;