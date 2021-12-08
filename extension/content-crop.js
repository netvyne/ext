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
              <div class="popup-netvyne">
                <div class="popup-header-netvyne noselect">&nbsp;</div>
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
      let resize_canvas = null;
      let image_target = document.querySelector('.crop-image-netvyne');
      let heightratio = 1.0;
      let widthratio = 1.0;
      let cropLeft = 0;
      let cropTop = 0;
      let cropWidth = 0;
      let cropHeight = 0;
      function initDragElement() {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
        let popups = document.getElementsByClassName('popup-netvyne');
        let parentCropContainer = document.getElementsByClassName('center-crop-tool-netvyne')[0];
        let elmnt = null;
        let currentZIndex = 100; // TODO reset z index when a threshold is passed

        for (let i = 0; i < popups.length; i++) {
          let popup = popups[i];
          let header = getHeader(popup);

          popup.onmousedown = function () {
            this.style.zIndex = `${++currentZIndex}`;
          };

          if (header) {
            header.parentPopup = popup;
            header.onmousedown = dragMouseDown;
          }
        }

        function dragMouseDown(e) {
          console.log('dragMouseDown func');
          elmnt = this.parentPopup;
          elmnt.style.zIndex = `${++currentZIndex}`;

          e = e || window.event;
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          console.log('elementDrag func');
          if (!elmnt) {
            return;
          }

          e = e || window.event;
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          let leftBoundary = 15;
          let topBoundary = 42;
          let righBoundary = (parentCropContainer.offsetWidth + 30) - (elmnt.offsetWidth + 15);
          let bottomBoundary = (parentCropContainer.offsetHeight + 42 + 65) - (elmnt.offsetHeight + 65);
          // set the element's new position:
          if (elmnt.offsetTop < topBoundary && elmnt.offsetLeft < leftBoundary) {
            elmnt.style.top = `${topBoundary}px`;
            elmnt.style.left = `${leftBoundary}px`;
          } else if (elmnt.offsetTop < topBoundary) {
            elmnt.style.top = `${topBoundary}px`;
            elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
          } else if (elmnt.offsetLeft < leftBoundary) {
            elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
            elmnt.style.left = `${leftBoundary}px`;
          } else if (elmnt.offsetTop > bottomBoundary && elmnt.offsetLeft > righBoundary) {
            elmnt.style.top = `${bottomBoundary}px`;
            elmnt.style.left = `${righBoundary}px`;
          } else if (elmnt.offsetTop > bottomBoundary) {
            elmnt.style.top = `${bottomBoundary}px`;
            elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
          } else if (elmnt.offsetLeft > righBoundary) {
            elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
            elmnt.style.left = `${righBoundary}px`;
          } else {
            elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
            elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
          }
        }

        function closeDragElement() {
          console.log('closeDragElement func');
          /* stop moving when mouse button is released: */
          document.onmouseup = null;
          document.onmousemove = null;
        }

        function getHeader(element) {
          console.log('getHeader func');
          let headerItems = element.getElementsByClassName('popup-header-netvyne');

          if (headerItems.length === 1) {
            return headerItems[0];
          }

          return null;
        }
      }

      function initResizeElement() {
        console.log('initResizeElement func');
        let popups = document.getElementsByClassName('popup-netvyne');
        let element = null;
        let startX; let startY; let startWidth; let
          startHeight;

        for (let i = 0; i < popups.length; i++) {
          let p = popups[i];

          let right = document.createElement('div');
          right.className = 'resizer-right';
          p.appendChild(right);
          right.addEventListener('mousedown', initDrag, false);
          right.parentPopup = p;

          let bottom = document.createElement('div');
          bottom.className = 'resizer-bottom';
          p.appendChild(bottom);
          bottom.addEventListener('mousedown', initDrag, false);
          bottom.parentPopup = p;

          let both = document.createElement('div');
          both.className = 'resizer-both';
          p.appendChild(both);
          both.addEventListener('mousedown', initDrag, false);
          both.parentPopup = p;
        }

        function initDrag(e) {
          console.log('initDrag func');
          element = this.parentPopup;
          startX = e.clientX;
          startY = e.clientY;
          startWidth = parseInt(
            document.defaultView.getComputedStyle(element).width,
            10
          );
          startHeight = parseInt(
            document.defaultView.getComputedStyle(element).height,
            10
          );
          document.documentElement.addEventListener('mousemove', doDrag, false);
          document.documentElement.addEventListener('mouseup', stopDrag, false);
        }

        function doDrag(e) {
          element.style.width = `${startWidth + e.clientX - startX}px`;
          element.style.height = `${startHeight + e.clientY - startY}px`;
        }

        function stopDrag() {
          document.documentElement.removeEventListener('mousemove', doDrag, false);
          document.documentElement.removeEventListener('mouseup', stopDrag, false);
        }
      }

      function crop() {
        let cropBox = document.querySelector('.popup-netvyne');
        resize_canvas = document.createElement('canvas');

        widthratio = (image_target.naturalWidth / image_target.offsetWidth);
        heightratio = (image_target.naturalHeight / image_target.offsetHeight);

        cropWidth = cropBox.offsetWidth * widthratio;
        cropHeight = cropBox.offsetHeight * heightratio;
        cropLeft = (cropBox.offsetLeft - 15) * widthratio;
        cropTop = (cropBox.offsetTop - 42) * heightratio;

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

      initDragElement();
      initResizeElement();
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
