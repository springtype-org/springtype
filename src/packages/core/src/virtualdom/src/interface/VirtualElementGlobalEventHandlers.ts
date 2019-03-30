export interface ErrorEventHandler {
    (event: Event, source?: string, fileno?: number, columnNumber?: number): void;
    (event: string, source?: string, fileno?: number, columnNumber?: number): void;
}

export interface VirtualElementGlobalEventHandlers {

    onencrypted: string | ((this: HTMLMediaElement, ev: MediaEncryptedEvent) => any) | null;
    onmsneedkey: string | ((this: HTMLMediaElement, ev: Event) => any) | null;

    /**
     * Fires when the user aborts the download.
     * @param ev The event.
     */
    onabort: string | ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    onanimationcancel: string | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationend: string | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationiteration: string | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onanimationstart: string | ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
    onauxclick: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the object loses the input focus.
     * @param ev The focus event.
     */
    onblur: string | ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    oncancel: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when playback is possible, but would require further buffering.
     * @param ev The event.
     */
    oncanplay: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oncanplaythrough: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the contents of the object or selection have changed.
     * @param ev The event.
     */
    onchange: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user clicks the left mouse button on the object
     * @param ev The mouse event.
     */
    onclick: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onclose: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user clicks the right mouse button in the client area, opening the context menu.
     * @param ev The mouse event.
     */
    oncontextmenu: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    oncuechange: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user double-clicks the object.
     * @param ev The mouse event.
     */
    ondblclick: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires on the source object continuously during a drag operation.
     * @param ev The event.
     */
    ondrag: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user releases the mouse at the close of a drag operation.
     * @param ev The event.
     */
    ondragend: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target element when the user drags the object to a valid drop target.
     * @param ev The drag event.
     */
    ondragenter: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondragexit: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
     * @param ev The drag event.
     */
    ondragleave: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the target element continuously while the user drags the object over a valid drop target.
     * @param ev The event.
     */
    ondragover: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user starts to drag a text selection or selected object.
     * @param ev The event.
     */
    ondragstart: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    ondrop: string | ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
    /**
     * Occurs when the duration attribute is updated.
     * @param ev The event.
     */
    ondurationchange: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the media element is reset to its initial state.
     * @param ev The event.
     */
    onemptied: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the end of playback is reached.
     * @param ev The event
     */
    onended: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when an error occurs during object loading.
     * @param ev The event.
     */
    onerror: string | ErrorEventHandler;
    /**
     * Fires when the object receives focus.
     * @param ev The event.
     */
    onfocus: string | ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
    ongotpointercapture: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    oninput: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    oninvalid: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user presses a key.
     * @param ev The keyboard event
     */
    onkeydown: string | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user presses an alphanumeric key.
     * @param ev The event.
     */
    onkeypress: string | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user releases a key.
     * @param ev The keyboard event
     */
    onkeyup: string | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
    /**
     * Fires immediately after the browser loads the object.
     * @param ev The event.
     */
    onload: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when media data is loaded at the current playback position.
     * @param ev The event.
     */
    onloadeddata: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the duration and dimensions of the media have been determined.
     * @param ev The event.
     */
    onloadedmetadata: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onloadend: string | ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
    /**
     * Occurs when Internet Explorer begins looking for media data.
     * @param ev The event.
     */
    onloadstart: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onlostpointercapture: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    /**
     * Fires when the user clicks the object with either mouse button.
     * @param ev The mouse event.
     */
    onmousedown: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseenter: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    onmouseleave: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse over the object.
     * @param ev The mouse event.
     */
    onmousemove: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer outside the boundaries of the object.
     * @param ev The mouse event.
     */
    onmouseout: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer into the object.
     * @param ev The mouse event.
     */
    onmouseover: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Fires when the user releases a mouse button while the mouse is over the object.
     * @param ev The mouse event.
     */
    onmouseup: string | ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
    /**
     * Occurs when playback is paused.
     * @param ev The event.
     */
    onpause: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the play method is requested.
     * @param ev The event.
     */
    onplay: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the audio or video has started playing.
     * @param ev The event.
     */
    onplaying: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onpointercancel: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerdown: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerenter: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerleave: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointermove: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerout: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerover: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    onpointerup: string | ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
    /**
     * Occurs to indicate progress while downloading media data.
     * @param ev The event.
     */
    onprogress: string | ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
    /**
     * Occurs when the playback rate is increased or decreased.
     * @param ev The event.
     */
    onratechange: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the user resets a form.
     * @param ev The event.
     */
    onreset: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onresize: string | ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    /**
     * Fires when the user repositions the scroll box in the scroll bar on the object.
     * @param ev The event.
     */
    onscroll: string | ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    onsecuritypolicyviolation: string | ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
    /**
     * Occurs when the seek operation ends.
     * @param ev The event.
     */
    onseeked: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when the current playback position is moved.
     * @param ev The event.
     */
    onseeking: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Fires when the current selection changes.
     * @param ev The event.
     */
    onselect: string | ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
    /**
     * Occurs when the download has stopped.
     * @param ev The event.
     */
    onstalled: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onsubmit: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs if the load operation has been intentionally halted.
     * @param ev The event.
     */
    onsuspend: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs to indicate the current playback position.
     * @param ev The event.
     */
    ontimeupdate: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontoggle: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    ontouchcancel: string | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontouchend: string | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontouchmove: string | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontouchstart: string | ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null;
    ontransitioncancel: string | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionend: string | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionrun: string | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    ontransitionstart: string | ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
    /**
     * Occurs when the volume is changed, or playback is muted or unmuted.
     * @param ev The event.
     */
    onvolumechange: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    /**
     * Occurs when playback stops because the next frame of a video resource is not available.
     * @param ev The event.
     */
    onwaiting: string | ((this: GlobalEventHandlers, ev: Event) => any) | null;
    onwheel: string | ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
}