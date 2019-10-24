import { JSX as IonicJSX } from "@ionic/core/dist/types/components";
import { IElement } from "springtype/web/vdom/interface";

declare global {
  export namespace JSX {
    export interface Clickable {
      onClick: () => Promise<void>;
    }

    export interface IntrinsicElements extends IonicJSX.IntrinsicElements {
      [tagName: string]: any & Partial<IElement>;

      "ion-action-sheet": IonicJSX.IonActionSheet & Partial<IElement>;
      "ion-action-sheet-controller": IonicJSX.IonActionSheetController & Partial<IElement>;
      "ion-alert": IonicJSX.IonAlert & Partial<IElement>;
      "ion-alert-controller": IonicJSX.IonAlertController & Partial<IElement>;
      "ion-anchor": IonicJSX.IonAnchor & Partial<IElement>;
      "ion-app": IonicJSX.IonApp & Partial<IElement>;
      "ion-avatar": IonicJSX.IonAvatar & Partial<IElement>;
      "ion-back-button": IonicJSX.IonBackButton & Partial<IElement>;
      "ion-backdrop": IonicJSX.IonBackdrop & Partial<IElement>;
      "ion-badge": IonicJSX.IonBadge & Partial<IElement>;
      "ion-button": Partial<IonicJSX.IonButton> & Partial<IElement> & Partial<Clickable>;
      "ion-buttons": IonicJSX.IonButtons & Partial<IElement>;
      "ion-card": IonicJSX.IonCard & Partial<IElement>;
      "ion-card-content": IonicJSX.IonCardContent & Partial<IElement>;
      "ion-card-header": IonicJSX.IonCardHeader & Partial<IElement>;
      "ion-card-subtitle": IonicJSX.IonCardSubtitle & Partial<IElement>;
      "ion-card-title": IonicJSX.IonCardTitle & Partial<IElement>;
      "ion-checkbox": IonicJSX.IonCheckbox & Partial<IElement>;
      "ion-chip": IonicJSX.IonChip & Partial<IElement>;
      "ion-col": IonicJSX.IonCol & Partial<IElement>;
      "ion-content": IonicJSX.IonContent & Partial<IElement>;
      "ion-datetime": IonicJSX.IonDatetime & Partial<IElement>;
      "ion-fab": IonicJSX.IonFab & Partial<IElement>;
      "ion-fab-button": IonicJSX.IonFabButton & Partial<IElement>;
      "ion-fab-list": IonicJSX.IonFabList & Partial<IElement>;
      "ion-footer": IonicJSX.IonFooter & Partial<IElement>;
      "ion-grid": IonicJSX.IonGrid & Partial<IElement>;
      "ion-header": IonicJSX.IonHeader & Partial<IElement>;
      "ion-img": IonicJSX.IonImg & Partial<IElement>;
      "ion-infinite-scroll": IonicJSX.IonInfiniteScroll & Partial<IElement>;
      "ion-infinite-scroll-content": IonicJSX.IonInfiniteScrollContent & Partial<IElement>;
      "ion-input": IonicJSX.IonInput & Partial<IElement>;
      "ion-item": IonicJSX.IonItem & Partial<IElement>;
      "ion-item-divider": IonicJSX.IonItemDivider & Partial<IElement>;
      "ion-item-group": IonicJSX.IonItemGroup & Partial<IElement>;
      "ion-item-option": IonicJSX.IonItemOption & Partial<IElement>;
      "ion-item-options": IonicJSX.IonItemOptions & Partial<IElement>;
      "ion-item-sliding": IonicJSX.IonItemSliding & Partial<IElement>;
      "ion-label": IonicJSX.IonLabel & Partial<IElement>;
      "ion-list": IonicJSX.IonList & Partial<IElement>;
      "ion-list-header": IonicJSX.IonListHeader & Partial<IElement>;
      "ion-loading": IonicJSX.IonLoading & Partial<IElement>;
      "ion-loading-controller": IonicJSX.IonLoadingController & Partial<IElement>;
      "ion-menu": IonicJSX.IonMenu & Partial<IElement>;
      "ion-menu-button": IonicJSX.IonMenuButton & Partial<IElement>;
      "ion-menu-controller": IonicJSX.IonMenuController & Partial<IElement>;
      "ion-menu-toggle": IonicJSX.IonMenuToggle & Partial<IElement>;
      "ion-modal": IonicJSX.IonModal & Partial<IElement>;
      "ion-modal-controller": IonicJSX.IonModalController & Partial<IElement>;
      "ion-nav": IonicJSX.IonNav & Partial<IElement>;
      "ion-nav-link": IonicJSX.IonNavLink & Partial<IElement>;
      "ion-nav-pop": IonicJSX.IonNavPop & Partial<IElement>;
      "ion-nav-push": IonicJSX.IonNavPush & Partial<IElement>;
      "ion-nav-set-root": IonicJSX.IonNavSetRoot & Partial<IElement>;
      "ion-note": IonicJSX.IonNote & Partial<IElement>;
      "ion-picker": IonicJSX.IonPicker & Partial<IElement>;
      "ion-picker-column": IonicJSX.IonPickerColumn & Partial<IElement>;
      "ion-picker-controller": IonicJSX.IonPickerController & Partial<IElement>;
      "ion-popover": IonicJSX.IonPopover & Partial<IElement>;
      "ion-popover-controller": IonicJSX.IonPopoverController & Partial<IElement>;
      "ion-progress-bar": IonicJSX.IonProgressBar & Partial<IElement>;
      "ion-radio": IonicJSX.IonRadio & Partial<IElement>;
      "ion-radio-group": IonicJSX.IonRadioGroup & Partial<IElement>;
      "ion-range": IonicJSX.IonRange & Partial<IElement>;
      "ion-refresher": IonicJSX.IonRefresher & Partial<IElement>;
      "ion-refresher-content": IonicJSX.IonRefresherContent & Partial<IElement>;
      "ion-reorder": IonicJSX.IonReorder & Partial<IElement>;
      "ion-reorder-group": IonicJSX.IonReorderGroup & Partial<IElement>;
      "ion-ripple-effect": IonicJSX.IonRippleEffect & Partial<IElement>;
      "ion-route": IonicJSX.IonRoute & Partial<IElement>;
      "ion-route-redirect": IonicJSX.IonRouteRedirect & Partial<IElement>;
      "ion-router": IonicJSX.IonRouter & Partial<IElement>;
      "ion-router-link": IonicJSX.IonRouterLink & Partial<IElement>;
      "ion-router-outlet": IonicJSX.IonRouterOutlet & Partial<IElement>;
      "ion-row": IonicJSX.IonRow & Partial<IElement>;
      "ion-searchbar": IonicJSX.IonSearchbar & Partial<IElement>;
      "ion-segment": IonicJSX.IonSegment & Partial<IElement>;
      "ion-segment-button": IonicJSX.IonSegmentButton & Partial<IElement>;
      "ion-select": IonicJSX.IonSelect & Partial<IElement>;
      "ion-select-option": IonicJSX.IonSelectOption & Partial<IElement>;
      "ion-select-popover": IonicJSX.IonSelectPopover & Partial<IElement>;
      "ion-skeleton-text": IonicJSX.IonSkeletonText & Partial<IElement>;
      "ion-slide": IonicJSX.IonSlide & Partial<IElement>;
      "ion-slides": IonicJSX.IonSlides & Partial<IElement>;
      "ion-spinner": IonicJSX.IonSpinner & Partial<IElement>;
      "ion-split-pane": IonicJSX.IonSplitPane & Partial<IElement>;
      "ion-tab": IonicJSX.IonTab & Partial<IElement>;
      "ion-tab-bar": IonicJSX.IonTabBar & Partial<IElement>;
      "ion-tab-button": IonicJSX.IonTabButton & Partial<IElement>;
      "ion-tabs": IonicJSX.IonTabs & Partial<IElement>;
      "ion-text": IonicJSX.IonText & Partial<IElement>;
      "ion-textarea": IonicJSX.IonTextarea & Partial<IElement>;
      "ion-thumbnail": IonicJSX.IonThumbnail & Partial<IElement>;
      "ion-title": IonicJSX.IonTitle & Partial<IElement>;
      "ion-toast": IonicJSX.IonToast & Partial<IElement>;
      "ion-toast-controller": IonicJSX.IonToastController & Partial<IElement>;
      "ion-toggle": IonicJSX.IonToggle & Partial<IElement>;
      "ion-toolbar": IonicJSX.IonToolbar & Partial<IElement>;
      "ion-virtual-scroll": IonicJSX.IonVirtualScroll & Partial<IElement>;
    }
  }
}
