import {MwcSlider} from "./mwc-slider";
import {ActiveRenderer} from '@springtype/core';
import "@material/slider/dist/mdc.slider.min.css";

export default (component: MwcSlider) =>{

   return <div class="mdc-dialog"
               role="alertdialog"
               aria-modal="true"
               aria-labelledby="my-dialog-title"
               aria-describedby="my-dialog-content">
       <div class="mdc-dialog__container">
           <div class="mdc-dialog__surface">
               <h2 class="mdc-dialog__title" id="my-dialog-title">
     </h2>
               <div class="mdc-dialog__content" id="my-dialog-content">
                   <ul class="mdc-list mdc-list--avatar-list">
                       <li class="mdc-list-item" tabindex="0" data-mdc-dialog-action="none">
                           <span class="mdc-list-item__text">None</span>
                       </li>
                       <li class="mdc-list-item" data-mdc-dialog-action="callisto">
                           <span class="mdc-list-item__text">Callisto</span>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
       <div class="mdc-dialog__scrim"></div>
   </div>
};

