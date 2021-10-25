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

function isScriptAlreadyIncluded(src) {
  let scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) if (scripts[i].getAttribute('src') === src) return true;
  return false;
}

function isLinkAlreadyIncluded(href) {
  let links = document.getElementsByTagName('link');
  for (let i = 0; i < links.length; i++) if (links[i].getAttribute('href') === href) return true;
  return false;
}

script = document.createElement('script');

if (!isScriptAlreadyIncluded('https://code.jquery.com/jquery-3.2.1.slim.min.js')) {
  script.src = 'https://code.jquery.com/jquery-3.2.1.slim.min.js';
  script.crossorigin = 'anonymous';
  script.type = 'text/javascript';
  script.setAttribute('async', 'async');
  document.head.appendChild(script);
}

if (!isScriptAlreadyIncluded('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js')) {
  script = document.createElement('script');
  script.src = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js';
  script.crossorigin = 'anonymous';
  script.type = 'text/javascript';
  script.setAttribute('async', 'async');
  document.head.appendChild(script);
}

if (!isScriptAlreadyIncluded('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js')) {
  script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js';
  script.crossorigin = 'anonymous';
  script.type = 'text/javascript';
  script.setAttribute('async', 'async');
  document.head.appendChild(script);
}

link = document.createElement('link');
// if (!isLinkAlreadyIncluded('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css')) {
//   link.rel = 'stylesheet';
//   link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';
//   document.head.prepend(link);
// }

if (!isLinkAlreadyIncluded('https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css')) {
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css';
  document.head.appendChild(link);
}

if (!isLinkAlreadyIncluded('https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha.1/cropper.min.css')) {
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha.1/cropper.min.css';
  document.head.appendChild(link);
}

// button = document.createElement('button');
// button.setAttribute('class', 'btn btn-primary');
// button.setAttribute('style', 'display : none');
// button.setAttribute('type', 'exampleModalLong');
// button.setAttribute('id', 'cropDialogue');
// button.setAttribute('data-toggle', 'modal');
// button.setAttribute('data-target', '#exampleModalLong');
// button.setAttribute('data-backdrop', 'static');
// button.setAttribute('data-keyboard', 'false');
// button.append('Launch demo modal');
// document.body.prepend(button);

button = document.createElement('button');
button.setAttribute('class', 'trigger_popup_fricc');
button.setAttribute('id', 'cropDialogue');
button.setAttribute('style', 'display : none');
button.append('Launch demo modal');
document.body.prepend(button);

setTimeout(() => {
  chrome.storage.local.get({ screenshot: null }, (data) => {
    // document.getElementById('cropDialogue').style.visibility = 'hidden';
    const div = document.createElement('div');
    div.setAttribute('class', 'bootstrap-iso"');
    div.setAttribute('id', 'mainExampleModalLong');

    // const innerHTML = `<div class="modal fade" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" id="exampleModalLong">
    //   <div class="modal-dialog modal-xl" style="max-width: 1200px;">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title" id="exampleModalLongTitle">Cropping Tool</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div class="modal-body">
    //         <div class="center-crop-tool">
    //           <img crossorigin="Anonymous" src="${data.screenshot}" class="crop-image" alt=""/>
    //         </div>
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-primary btn-crop" data-dismiss="modal">Crop</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>`;
    const innerHTML = `<div class="hover_bkgr_fricc" id="hover_bkgr_fricc">
        <span class="helper"></span>
        <div>
            <div class="popupCloseButton">&times;</div>
            <h5 id="exampleModalLongTitle">Cropping Tool</h5>
            <div class="center-crop-tool">
              <img crossorigin="Anonymous" src="${data.screenshot}" class="crop-image" alt=""/>
            </div>
            <div class="btns-container-crop-tool">
              <button type="button" class="btn-close-tool" data-dismiss="modal">Close</button>
              <button type="button" class="btn-crop-tool btn-crop" data-dismiss="modal">Crop</button>
            </div>
        </div>
    </div>`;
    // div.innerText(innerHTML);
    document.body.prepend(div);
    document.getElementById('mainExampleModalLong').innerHTML = innerHTML;
    // document.getElementById('croppedImage').src = data.screenshot;

    (function () {
      function resizeableImage(image_target) {
        let cropComponent;
        let container;
        let crop_img;
        let event_state = {};
        let ratio = 1.0;
        let keyZoomValue = 4.0;
        let MINWIDTH = 50;
        let MINHEIGHT = 50;
        let CROPWIDTH = 200;
        let CROPHEIGHT = 200;
        let cropLeft = 0;
        let cropTop = 0;
        let cropWidth = 0;
        let cropHeight = 0;
        let resize_canvas = null;

        if (image_target && image_target.complete) {
          init();
        } else {
          image_target.onload = function () {
            init();
          };
        }

        function removeHandlers() {
          container.removeEventListener('mousedown', startMoving);
          container.removeEventListener('touchstart', startMoving);
          container.removeEventListener('wheel', resizing);

          document.removeEventListener('mouseup', endMoving);
          document.removeEventListener('touchend', endMoving);
          document.removeEventListener('mousemove', moving);
          document.removeEventListener('touchmove', moving);
          document.removeEventListener('keypress', keyHandler);
        }

        function addHandlers() {
          document.addEventListener('mousedown', startMoving, false);
          document.addEventListener('touchstart', startMoving, false);
          document.addEventListener('wheel', resizing, false);

          document.querySelector('.overlay').addEventListener('click', resizing, false);
          document.addEventListener('keypress', keyHandler, false);
          document.querySelector('.btn-crop').addEventListener('click', openCropCanvasImg);
        }

        function init() {
          let wraper; let left; let
            top;

          if (image_target.dataset.isCrop) {
            // eslint-disable-next-line no-throw-literal
            throw 'image is already crop';
          }

          image_target.dataset.isCrop = 'true';
          // image_target.classList.add('crop-blur');
          image_target.draggable = false;

          crop_img = new Image();
          crop_img.crossOrigin = image_target.crossOrigin;
          crop_img.src = image_target.src;
          crop_img.draggable = false;

          resize_canvas = document.createElement('canvas');

          cropComponent = document.createElement('div');
          cropComponent.classList.add('crop-component');

          container = document.createElement('div');
          container.classList.add('overlay');

          cropComponent.appendChild(container);
          wraper = image_target.parentNode;
          wraper.appendChild(cropComponent);
          cropComponent.appendChild(crop_img);
          cropComponent.appendChild(image_target);
          container.appendChild(crop_img);

          left = image_target.offsetWidth / 2 - CROPWIDTH / 2;
          top = image_target.offsetHeight / 2 - CROPHEIGHT / 2;

          updateCropImage(left, top);
          addHandlers();
        }

        function updateCropSize(width, height) {
          container.style.width = `${width}px`;
          container.style.height = `${height}px`;
        }

        function updateCropImage(left, top) {
          cropLeft = -left * ratio;
          cropTop = -top * ratio;
          left = `${-left}px`;
          top = `${-top}px`;

          crop_img.style.top = top;
          crop_img.style.left = left;
        }

        function updateContainer(left, top) {
          top = `${top + (CROPWIDTH / 2)}px`;
          left = `${left + (CROPHEIGHT / 2)}px`;

          container.style.top = top;
          container.style.left = left;
        }

        // Save the initial event details and container state
        function saveEventState(e) {
          event_state.container_width = container.offsetWidth;
          event_state.container_height = container.offsetHeight;

          event_state.container_left = container.offsetLeft;
          event_state.container_top = container.offsetTop;

          event_state.mouse_x = (e.clientX || e.pageX || e.touches && e.touches[0].clientX) + window.scrollX;
          event_state.mouse_y = (e.clientY || e.pageY || e.touches && e.touches[0].clientY) + window.scrollY;
        }

        function imgZoom(zoom) {
          zoom = zoom * Math.PI * 2;
          let newWidth = Math.floor(container.clientWidth + zoom);
          let newHeight = Math.floor(container.clientHeight + zoom);
          let w = crop_img.clientWidth;
          let h = crop_img.clientHeight;
          let left;
          let top;
          let right;
          let bottom;

          if (newWidth < MINWIDTH) {
            return;
          } if (newWidth > w) {
            return;
          }

          left = container.offsetLeft - (zoom / 2);
          top = container.offsetTop - (zoom / 2);
          right = left + newWidth;
          bottom = top + newHeight;

          if (left < 0) {
            left = 0;
          }
          if (top < 0) {
            top = 0;
          }
          if (right > w) {
            return;
          }
          if (bottom > h) {
            return;
          }

          ratio = CROPWIDTH / newWidth;

          updateCropSize(newWidth, newWidth);
          updateCropImage(left, top);
          updateContainer(left, top);
          crop();
        }

        function keyHandler(e) {
          e.preventDefault();

          // eslint-disable-next-line default-case
          switch (String.fromCharCode(e.charCode)) {
            case '+':
              imgZoom(keyZoomValue);
              break;
            case '-':
              imgZoom(-keyZoomValue);
              break;
          }
        }

        function resizing(e) {
          e.preventDefault();
          imgZoom(e.deltaY > 0 ? 1 : -1);
        }

        function startMoving(e) {
          e.preventDefault();
          e.stopPropagation();

          saveEventState(e);

          document.addEventListener('mousemove', moving);
          document.addEventListener('touchmove', moving);
          document.addEventListener('mouseup', endMoving);
          document.addEventListener('touchend', endMoving);
        }

        function endMoving(e) {
          e.preventDefault();

          document.removeEventListener('mouseup', endMoving);
          document.removeEventListener('touchend', endMoving);
          document.removeEventListener('mousemove', moving);
          document.removeEventListener('touchmove', moving);
        }

        function moving(e) {
          let curuntTouch = {};
          let left;
          let top;
          let w;
          let h;

          e.preventDefault();
          e.stopPropagation();

          curuntTouch.x = e.pageX || e.touches && e.touches[0].pageX;
          curuntTouch.y = e.pageY || e.touches && e.touches[0].pageY;

          left = curuntTouch.x - (event_state.mouse_x - event_state.container_left);
          top = curuntTouch.y - (event_state.mouse_y - event_state.container_top);
          w = container.offsetWidth;
          h = container.offsetHeight;

          if (left < 0) {
            left = 0;
          } else if (left > crop_img.offsetWidth - w) {
            left = crop_img.offsetWidth - w;
          }
          if (top < 0) {
            top = 0;
          } else if (top > crop_img.offsetHeight - h) {
            top = crop_img.offsetHeight - h;
          }

          updateCropImage(left, top);
          updateContainer(left, top);
        }

        function crop() {
          cropWidth = crop_img.width * ratio;
          cropHeight = crop_img.height * ratio;

          resize_canvas.width = CROPWIDTH;
          resize_canvas.height = CROPHEIGHT;

          let ctx = resize_canvas.getContext('2d');
          ctx.drawImage(crop_img,
            cropLeft, cropTop,
            cropWidth, cropHeight);
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
        // console.log(document.getElementsByTagName('body'));
        document.body.style.overflow = 'hidden';
        // document.getElementsByClassName('bootstrap-iso"').style.overflow = 'hidden';
        document.body.addEventListener('wheel DOMMouseScroll', (event) => {
          console.log('hello here');
          if (event.ctrlKey === true) {
            // alert('disabling zooming11');
            console.log('disabling zooming11');
            event.preventDefault();
          }
        });
        document.body.addEventListener('keypress', (event) => {
          if (event.ctrlKey === true && (event.which === '61' || event.which === '107' || event.which === '173' || event.which === '109' || event.which === '187' || event.which === '189')) {
            event.preventDefault();
          }
        });
      }

      resizeableImage(document.querySelector('.crop-image'));

      openPopUp();

      function openPopUp() {
        document.getElementById('hover_bkgr_fricc').style.display = 'block';
      }

      document.querySelector('.popupCloseButton').addEventListener('click', closePopUp, false);
      // document.querySelector('.btn-crop-tool').addEventListener('click', closeCropPopUp, false);
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

      // window.addEventListener('mousewheel DOMMouseScroll', (event) => {
      //   if (event.ctrlKey === true) {
      //     // alert('disabling zooming11');
      //     console.log('disabling zooming11');
      //     event.preventDefault();
      //   }
      // }, false);
      // $(window).bind('mousewheel DOMMouseScroll', (event) => {
      //   if (event.ctrlKey === true) {
      //     // alert('disabling zooming11');
      //     event.preventDefault();
      //   }
      // });
    }());
  });
}, 500);
