/* eslint-disable no-loop-func */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-const-assign */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

button = document.createElement('button');
button.setAttribute('class', 'trigger_popup_fricc');
button.setAttribute('id', 'cropDialogue');
button.setAttribute('style', 'display : none');
button.append('Launch demo modal');
document.body.prepend(button);

setTimeout(() => {
  chrome.storage.local.get({ screenshot: null }, (data) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'bootstrap-iso"');
    div.setAttribute('id', 'mainExampleModalLong');
    const innerHTML = `<div class="hover_bkgr_fricc" id="hover_bkgr_fricc">
        <span class="helper"></span>
        <div>
            <div class="popupCloseButtonNetvyne">&times;</div>
            <h5 id="exampleModalLongTitle">Cropping Tool</h5>
            <div class="center-crop-tool-netvyne">
              <div class="box-wrapper" id="box-wrapper">
                  <div class="netvyneCropBox box" id="box">
                      <div class="dot left-top" id="left-top"></div>
                      <div class="dot left-bottom" id="left-bottom"></div>
                      <div class="dot top-mid" id="top-mid"></div>
                      <div class="dot bottom-mid" id="bottom-mid"></div>
                      <div class="dot left-mid" id="left-mid"></div>
                      <div class="dot right-mid" id="right-mid"></div>
                      <div class="dot right-bottom" id="right-bottom"></div>
                      <div class="dot right-top" id="right-top"></div>
                  </div>
              </div>
              <img crossorigin="Anonymous" src="${data.screenshot}" class="crop-image-netvyne" alt=""/>
            </div>
            <div class="btns-container-crop-tool">
              <button type="button" class="btn-close-tool" data-dismiss="modal">Close</button>
              <button type="button" class="btn-crop-tool btn-crop" data-dismiss="modal">Crop</button>
            </div>
        </div>
    </div>`;
    document.body.prepend(div);
    document.getElementById('mainExampleModalLong').innerHTML = innerHTML;
    (function () {
      let box = document.getElementById('box');
      let boxWrapper = document.getElementById('box-wrapper');
      const minWidth = 40;
      const minHeight = 40;

      let initX; let initY; let mousePressX; let mousePressY; let initW; let initH; let
        initRotate;
      let parentCropContainer = document.getElementsByClassName('center-crop-tool-netvyne')[0];
      let leftBoundary = 10;
      let topBoundary = 42;
      let righBoundary = (parentCropContainer.offsetWidth + 30) - (initW + leftBoundary);
      let bottomBoundary = (parentCropContainer.offsetHeight + topBoundary + 65) - (initW + 65);

      function repositionElement(x, y) {
        boxWrapper.style.left = `${x}px`;
        boxWrapper.style.top = `${y}px`;
      }

      function resize(w, h) {
        box.style.width = `${w}px`;
        box.style.height = `${h}px`;
      }

      // function getCurrentRotation(el) {
      //   let st = window.getComputedStyle(el, null);
      //   let tm = st.getPropertyValue('-webkit-transform')
      //       || st.getPropertyValue('-moz-transform')
      //       || st.getPropertyValue('-ms-transform')
      //       || st.getPropertyValue('-o-transform')
      //       || st.getPropertyValue('transform');
      //   // eslint-disable-next-line no-unused-expressions
      //   'none';
      //   if (tm !== 'none') {
      //     let values = tm.split('(')[1].split(')')[0].split(',');
      //     let angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
      //     return (angle < 0 ? angle + 360 : angle);
      //   }
      //   return 0;
      // }

      // function rotateBox(deg) {
      //   boxWrapper.style.transform = `rotate(${deg}deg)`;
      // }

      boxWrapper.addEventListener('mousedown', function (event) {
        if (event.target.className.indexOf('dot') > -1) {
          return;
        }

        initX = this.offsetLeft;
        initY = this.offsetTop;
        mousePressX = event.clientX;
        mousePressY = event.clientY;

        function eventMoveHandler(event1) {
          let newLeft = (initX + (event1.clientX - mousePressX)) - boxWrapper.offsetWidth / 2;
          let newTop = (initY + (event1.clientY - mousePressY)) - boxWrapper.offsetHeight / 2;

          righBoundary = (parentCropContainer.offsetWidth + 30) - (boxWrapper.offsetWidth + leftBoundary);
          bottomBoundary = (parentCropContainer.offsetHeight + topBoundary + 65) - (boxWrapper.offsetHeight + 65);
          if (newLeft >= leftBoundary && newTop >= topBoundary && newLeft <= righBoundary && newTop <= bottomBoundary) {
            repositionElement(initX + (event1.clientX - mousePressX),
              initY + (event1.clientY - mousePressY));
          }
        }

        boxWrapper.addEventListener('mousemove', eventMoveHandler, false);
        window.addEventListener('mouseup', function eventEndHandler() {
          boxWrapper.removeEventListener('mousemove', eventMoveHandler, false);
          window.removeEventListener('mouseup', eventEndHandler);
        }, false);
      }, false);

      // handle resize
      let rightMid = document.getElementById('right-mid');
      let leftMid = document.getElementById('left-mid');
      let topMid = document.getElementById('top-mid');
      let bottomMid = document.getElementById('bottom-mid');

      let leftTop = document.getElementById('left-top');
      let rightTop = document.getElementById('right-top');
      let rightBottom = document.getElementById('right-bottom');
      let leftBottom = document.getElementById('left-bottom');

      function resizeHandler(event, left = false, top = false, xResize = false, yResize = false) {
        initX = boxWrapper.offsetLeft;
        initY = boxWrapper.offsetTop;
        mousePressX = event.clientX;
        mousePressY = event.clientY;

        initW = box.offsetWidth;
        initH = box.offsetHeight;

        // initRotate = getCurrentRotation(boxWrapper);
        initRotate = 0;
        let initRadians = initRotate * Math.PI / 180;
        let cosFraction = Math.cos(initRadians);
        let sinFraction = Math.sin(initRadians);
        function eventMoveHandler(event2) {
          let wDiff = (event2.clientX - mousePressX);
          let hDiff = (event2.clientY - mousePressY);
          let rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
          let rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

          let newW = initW; let newH = initH; let newX = initX; let
            newY = initY;

          if (xResize) {
            if (left) {
              newW = initW - rotatedWDiff;
              if (newW < minWidth) {
                newW = minWidth;
                rotatedWDiff = initW - minWidth;
              }
            } else {
              newW = initW + rotatedWDiff;
              if (newW < minWidth) {
                newW = minWidth;
                rotatedWDiff = minWidth - initW;
              }
            }
            newX += 0.5 * rotatedWDiff * cosFraction;
            newY += 0.5 * rotatedWDiff * sinFraction;
          }

          if (yResize) {
            if (top) {
              newH = initH - rotatedHDiff;
              if (newH < minHeight) {
                newH = minHeight;
                rotatedHDiff = initH - minHeight;
              }
            } else {
              newH = initH + rotatedHDiff;
              if (newH < minHeight) {
                newH = minHeight;
                rotatedHDiff = minHeight - initH;
              }
            }
            newX -= 0.5 * rotatedHDiff * sinFraction;
            newY += 0.5 * rotatedHDiff * cosFraction;
          }
          righBoundary = (parentCropContainer.offsetWidth + 30) - (newW + leftBoundary);
          bottomBoundary = (parentCropContainer.offsetHeight + topBoundary + 65) - (newH + 65);
          if ((newX - newW / 2) >= leftBoundary && (newY - newH / 2) >= topBoundary && (newX - newW / 2) <= righBoundary && (newY - newH / 2) <= bottomBoundary) {
            resize(newW, newH);
            repositionElement(newX, newY);
          }
        }

        window.addEventListener('mousemove', eventMoveHandler, false);
        window.addEventListener('mouseup', function eventEndHandler() {
          window.removeEventListener('mousemove', eventMoveHandler, false);
          window.removeEventListener('mouseup', eventEndHandler);
        }, false);
      }

      rightMid.addEventListener('mousedown', (e) => resizeHandler(e, false, false, true, false));
      leftMid.addEventListener('mousedown', (e) => resizeHandler(e, true, false, true, false));
      topMid.addEventListener('mousedown', (e) => resizeHandler(e, false, true, false, true));
      bottomMid.addEventListener('mousedown', (e) => resizeHandler(e, false, false, false, true));
      leftTop.addEventListener('mousedown', (e) => resizeHandler(e, true, true, true, true));
      rightTop.addEventListener('mousedown', (e) => resizeHandler(e, false, true, true, true));
      rightBottom.addEventListener('mousedown', (e) => resizeHandler(e, false, false, true, true));
      leftBottom.addEventListener('mousedown', (e) => resizeHandler(e, true, false, true, true));

      resize(300, 200);
      repositionElement(200, 200);
      let resize_canvas = null;
      let image_target = document.querySelector('.crop-image-netvyne');
      let heightratio = 1.0;
      let widthratio = 1.0;

      function crop() {
        widthratio = (image_target.naturalWidth / image_target.offsetWidth);
        heightratio = (image_target.naturalHeight / image_target.offsetHeight);

        let cropWidth = parseInt(box.style.width.replace('px', ''), 10);
        let cropHeight = parseInt(box.style.height.replace('px', ''), 10);
        const cropLeft = (parseInt(boxWrapper.style.left.replace('px', ''), 10) - (cropWidth / 2) - 10) * widthratio;
        const cropTop = (parseInt(boxWrapper.style.top.replace('px', ''), 10) - (cropHeight / 2) - 47) * heightratio;
        cropWidth *= widthratio;
        cropHeight *= heightratio;
        resize_canvas = document.createElement('canvas');
        resize_canvas.width = cropWidth;
        resize_canvas.height = cropHeight;

        let ctx = resize_canvas.getContext('2d');
        ctx.drawImage(image_target, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      }

      function openCropCanvasImg() {
        crop();

        try {
          let base64Img = resize_canvas.toDataURL('image/png', 1.0);
          chrome.storage.local.set({ screenshot: base64Img }, () => {
            console.log('Stored screenshot!');
          });
          chrome.runtime.sendMessage({ message: 'cropped' }, (response) => {
            console.log(response.message);
            closeCropPopUp();
          });
        } catch (e) {
          console.log(e);
        } finally {
          // removeHandlers();
        }
      }
      document.querySelector('.btn-crop').addEventListener('click', openCropCanvasImg);

      openPopUp();

      function openPopUp() {
        document.getElementById('hover_bkgr_fricc').style.display = 'block';
      }
      document.querySelector('.popupCloseButtonNetvyne').addEventListener('click', closePopUp, false);
      document.querySelector('.btn-close-tool').addEventListener('click', closePopUp, false);

      function closePopUp(e) {
        e.preventDefault();
        document.body.style.overflow = 'auto';
        document.getElementById('hover_bkgr_fricc').style.display = 'none';
        chrome.runtime.sendMessage({ message: 'closeDialogue' }, (response) => {
          console.log(response.message);
        });
      }

      function closeCropPopUp() {
        document.body.style.overflow = 'auto';
        document.getElementById('hover_bkgr_fricc').style.display = 'none';
      }
    }());
  });
}, 500);
