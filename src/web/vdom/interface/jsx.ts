import { IAttributes } from "./iattributes";

declare global {
  namespace JSX {

    interface ElementAttributesProperty {
      attrs: {};
    }

    /*
    interface ElementChildrenAttribute {
      children: {};
    }
    */

    export interface SVGAttributes extends HTMLAttributes {
      accentHeight?: number | string;
      accumulate?: "none" | "sum";
      additive?: "replace" | "sum";
      alignmentBaseline?:
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit";
      allowReorder?: "no" | "yes";
      alphabetic?: number | string;
      amplitude?: number | string;
      arabicForm?: "initial" | "medial" | "terminal" | "isolated";
      ascent?: number | string;
      attributeName?: string;
      attributeType?: string;
      autoReverse?: number | string;
      azimuth?: number | string;
      baseFrequency?: number | string;
      baselineShift?: number | string;
      baseProfile?: number | string;
      bbox?: number | string;
      begin?: number | string;
      bias?: number | string;
      by?: number | string;
      calcMode?: number | string;
      capHeight?: number | string;
      clip?: number | string;
      clipPath?: string;
      clipPathUnits?: number | string;
      clipRule?: number | string;
      colorInterpolation?: number | string;
      colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit";
      colorProfile?: number | string;
      colorRendering?: number | string;
      contentScriptType?: number | string;
      contentStyleType?: number | string;
      cursor?: number | string;
      cx?: number | string;
      cy?: number | string;
      d?: string;
      decelerate?: number | string;
      descent?: number | string;
      diffuseConstant?: number | string;
      direction?: number | string;
      display?: number | string;
      divisor?: number | string;
      dominantBaseline?: number | string;
      dur?: number | string;
      dx?: number | string;
      dy?: number | string;
      edgeMode?: number | string;
      elevation?: number | string;
      enableBackground?: number | string;
      end?: number | string;
      exponent?: number | string;
      externalResourcesRequired?: number | string;
      fill?: string;
      fillOpacity?: number | string;
      fillRule?: "nonzero" | "evenodd" | "inherit";
      filter?: string;
      filterRes?: number | string;
      filterUnits?: number | string;
      floodColor?: number | string;
      floodOpacity?: number | string;
      focusable?: number | string;
      fontFamily?: string;
      fontSize?: number | string;
      fontSizeAdjust?: number | string;
      fontStretch?: number | string;
      fontStyle?: number | string;
      fontVariant?: number | string;
      fontWeight?: number | string;
      format?: number | string;
      from?: number | string;
      fx?: number | string;
      fy?: number | string;
      g1?: number | string;
      g2?: number | string;
      glyphName?: number | string;
      glyphOrientationHorizontal?: number | string;
      glyphOrientationVertical?: number | string;
      glyphRef?: number | string;
      gradientTransform?: string;
      gradientUnits?: string;
      hanging?: number | string;
      horizAdvX?: number | string;
      horizOriginX?: number | string;
      ideographic?: number | string;
      imageRendering?: number | string;
      in2?: number | string;
      in?: string;
      intercept?: number | string;
      k1?: number | string;
      k2?: number | string;
      k3?: number | string;
      k4?: number | string;
      k?: number | string;
      kernelMatrix?: number | string;
      kernelUnitLength?: number | string;
      kerning?: number | string;
      keyPoints?: number | string;
      keySplines?: number | string;
      keyTimes?: number | string;
      lengthAdjust?: number | string;
      letterSpacing?: number | string;
      lightingColor?: number | string;
      limitingConeAngle?: number | string;
      local?: number | string;
      markerEnd?: string;
      markerHeight?: number | string;
      markerMid?: string;
      markerStart?: string;
      markerUnits?: number | string;
      markerWidth?: number | string;
      mask?: string;
      maskContentUnits?: number | string;
      maskUnits?: number | string;
      mathematical?: number | string;
      mode?: number | string;
      numOctaves?: number | string;
      offset?: number | string;
      opacity?: number | string;
      operator?: number | string;
      order?: number | string;
      orient?: number | string;
      orientation?: number | string;
      origin?: number | string;
      overflow?: number | string;
      overlinePosition?: number | string;
      overlineThickness?: number | string;
      paintOrder?: number | string;
      panose1?: number | string;
      pathLength?: number | string;
      patternContentUnits?: string;
      patternTransform?: number | string;
      patternUnits?: string;
      pointerEvents?: number | string;
      points?: string;
      pointsAtX?: number | string;
      pointsAtY?: number | string;
      pointsAtZ?: number | string;
      preserveAlpha?: number | string;
      preserveAspectRatio?: string;
      primitiveUnits?: number | string;
      r?: number | string;
      radius?: number | string;
      refX?: number | string;
      refY?: number | string;
      renderingIntent?: number | string;
      repeatCount?: number | string;
      repeatDur?: number | string;
      requiredExtensions?: number | string;
      requiredFeatures?: number | string;
      restart?: number | string;
      result?: string;
      rotate?: number | string;
      rx?: number | string;
      ry?: number | string;
      scale?: number | string;
      seed?: number | string;
      shapeRendering?: number | string;
      slope?: number | string;
      spacing?: number | string;
      specularConstant?: number | string;
      specularExponent?: number | string;
      speed?: number | string;
      spreadMethod?: string;
      startOffset?: number | string;
      stdDeviation?: number | string;
      stemh?: number | string;
      stemv?: number | string;
      stitchTiles?: number | string;
      stopColor?: string;
      stopOpacity?: number | string;
      strikethroughPosition?: number | string;
      strikethroughThickness?: number | string;
      string?: number | string;
      stroke?: string;
      strokeDasharray?: string | number;
      strokeDashoffset?: string | number;
      strokeLinecap?: "butt" | "round" | "square" | "inherit";
      strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
      strokeMiterlimit?: string;
      strokeOpacity?: number | string;
      strokeWidth?: number | string;
      surfaceScale?: number | string;
      systemLanguage?: number | string;
      tableValues?: number | string;
      targetX?: number | string;
      targetY?: number | string;
      textAnchor?: string;
      textDecoration?: number | string;
      textLength?: number | string;
      textRendering?: number | string;
      to?: number | string;
      transform?: string;
      u1?: number | string;
      u2?: number | string;
      underlinePosition?: number | string;
      underlineThickness?: number | string;
      unicode?: number | string;
      unicodeBidi?: number | string;
      unicodeRange?: number | string;
      unitsPerEm?: number | string;
      vAlphabetic?: number | string;
      values?: string;
      vectorEffect?: number | string;
      version?: string;
      vertAdvY?: number | string;
      vertOriginX?: number | string;
      vertOriginY?: number | string;
      vHanging?: number | string;
      vIdeographic?: number | string;
      viewBox?: string;
      viewTarget?: number | string;
      visibility?: number | string;
      vMathematical?: number | string;
      widths?: number | string;
      wordSpacing?: number | string;
      writingMode?: number | string;
      x1?: number | string;
      x2?: number | string;
      x?: number | string;
      xChannelSelector?: string;
      xHeight?: number | string;
      xlinkActuate?: string;
      xlinkArcrole?: string;
      xlinkHref?: string;
      xlinkRole?: string;
      xlinkShow?: string;
      xlinkTitle?: string;
      xlinkType?: string;
      xmlBase?: string;
      xmlLang?: string;
      xmlns?: string;
      xmlnsXlink?: string;
      xmlSpace?: string;
      y1?: number | string;
      y2?: number | string;
      y?: number | string;
      yChannelSelector?: string;
      z?: number | string;
      zoomAndPan?: string;
    }

    export interface PathAttributes {
      d: string;
    }

    export interface EventHandler<E extends Event> {
      (event: E): void;
    }

    export type ClipboardEventHandler = EventHandler<ClipboardEvent>;
    export type CompositionEventHandler = EventHandler<CompositionEvent>;
    export type DragEventHandler = EventHandler<DragEvent>;
    export type FocusEventHandler = EventHandler<FocusEvent>;
    export type KeyboardEventHandler = EventHandler<KeyboardEvent>;
    export type MouseEventHandler = EventHandler<MouseEvent>;
    export type TouchEventHandler = EventHandler<TouchEvent>;
    export type UIEventHandler = EventHandler<UIEvent>;
    export type WheelEventHandler = EventHandler<WheelEvent>;
    export type AnimationEventHandler = EventHandler<AnimationEvent>;
    export type TransitionEventHandler = EventHandler<TransitionEvent>;
    export type GenericEventHandler = EventHandler<Event>;
    export type PointerEventHandler = EventHandler<PointerEvent>;

    export interface DOMAttributeEventHandlersLowerCase {

      // Image Events
      onload?: GenericEventHandler;
      onloadcapture?: GenericEventHandler;
      onerror?: GenericEventHandler;
      onerrorcapture?: GenericEventHandler;

      // Clipboard Events
      oncopy?: ClipboardEventHandler;
      oncopycapture?: ClipboardEventHandler;
      oncut?: ClipboardEventHandler;
      oncutcapture?: ClipboardEventHandler;
      onpaste?: ClipboardEventHandler;
      onpastecapture?: ClipboardEventHandler;

      // Composition Events
      oncompositionend?: CompositionEventHandler;
      oncompositionendcapture?: CompositionEventHandler;
      oncompositionstart?: CompositionEventHandler;
      oncompositionstartcapture?: CompositionEventHandler;
      oncompositionupdate?: CompositionEventHandler;
      oncompositionupdatecapture?: CompositionEventHandler;

      // Focus Events
      onfocus?: FocusEventHandler;
      onfocuscapture?: FocusEventHandler;
      onblur?: FocusEventHandler;
      onblurcapture?: FocusEventHandler;

      // Form Events
      onchange?: GenericEventHandler;
      onchangecapture?: GenericEventHandler;
      oninput?: GenericEventHandler;
      oninputcapture?: GenericEventHandler;
      onsearch?: GenericEventHandler;
      onsearchcapture?: GenericEventHandler;
      onsubmit?: GenericEventHandler;
      onsubmitcapture?: GenericEventHandler;
      oninvalid?: GenericEventHandler;
      oninvalidcapture?: GenericEventHandler;

      // Keyboard Events
      onkeydown?: KeyboardEventHandler;
      onkeydowncapture?: KeyboardEventHandler;
      onkeypress?: KeyboardEventHandler;
      onkeypresscapture?: KeyboardEventHandler;
      onkeyup?: KeyboardEventHandler;
      onkeyupcapture?: KeyboardEventHandler;

      // Media Events
      onabort?: GenericEventHandler;
      onabortcapture?: GenericEventHandler;
      oncanplay?: GenericEventHandler;
      oncanplaycapture?: GenericEventHandler;
      oncanplaythrough?: GenericEventHandler;
      oncanplaythroughcapture?: GenericEventHandler;
      ondurationchange?: GenericEventHandler;
      ondurationchangecapture?: GenericEventHandler;
      onemptied?: GenericEventHandler;
      onemptiedcapture?: GenericEventHandler;
      onencrypted?: GenericEventHandler;
      onencryptedcapture?: GenericEventHandler;
      onended?: GenericEventHandler;
      onendedcapture?: GenericEventHandler;
      onloadeddata?: GenericEventHandler;
      onloadeddatacapture?: GenericEventHandler;
      onloadedmetadata?: GenericEventHandler;
      onloadedmetadatacapture?: GenericEventHandler;
      onloadstart?: GenericEventHandler;
      onloadstartcapture?: GenericEventHandler;
      onpause?: GenericEventHandler;
      onpausecapture?: GenericEventHandler;
      onplay?: GenericEventHandler;
      onplaycapture?: GenericEventHandler;
      onplaying?: GenericEventHandler;
      onplayingcapture?: GenericEventHandler;
      onprogress?: GenericEventHandler;
      onprogresscapture?: GenericEventHandler;
      onratechange?: GenericEventHandler;
      onratechangecapture?: GenericEventHandler;
      onseeked?: GenericEventHandler;
      onseekedcapture?: GenericEventHandler;
      onseeking?: GenericEventHandler;
      onseekingcapture?: GenericEventHandler;
      onstalled?: GenericEventHandler;
      onstalledcapture?: GenericEventHandler;
      onsuspend?: GenericEventHandler;
      onsuspendcapture?: GenericEventHandler;
      ontimeupdate?: GenericEventHandler;
      ontimeupdatecapture?: GenericEventHandler;
      onvolumechange?: GenericEventHandler;
      onvolumechangecapture?: GenericEventHandler;
      onwaiting?: GenericEventHandler;
      onwaitingcapture?: GenericEventHandler;

      // MouseEvents
      onclick?: MouseEventHandler;
      onclickcapture?: MouseEventHandler;
      oncontextmenu?: MouseEventHandler;
      oncontextmenucapture?: MouseEventHandler;
      ondblclick?: MouseEventHandler;
      ondblclickcapture?: MouseEventHandler;
      ondrag?: DragEventHandler;
      ondragcapture?: DragEventHandler;
      ondragend?: DragEventHandler;
      ondragendcapture?: DragEventHandler;
      ondragenter?: DragEventHandler;
      ondragentercapture?: DragEventHandler;
      ondragexit?: DragEventHandler;
      ondragexitcapture?: DragEventHandler;
      ondragleave?: DragEventHandler;
      ondragleavecapture?: DragEventHandler;
      ondragover?: DragEventHandler;
      ondragovercapture?: DragEventHandler;
      ondragstart?: DragEventHandler;
      ondragstartcapture?: DragEventHandler;
      ondrop?: DragEventHandler;
      ondropcapture?: DragEventHandler;
      onmousedown?: MouseEventHandler;
      onmousedowncapture?: MouseEventHandler;
      onmouseenter?: MouseEventHandler;
      onmouseentercapture?: MouseEventHandler;
      onmouseleave?: MouseEventHandler;
      onmouseleavecapture?: MouseEventHandler;
      onmousemove?: MouseEventHandler;
      onmousemovecapture?: MouseEventHandler;
      onmouseout?: MouseEventHandler;
      onmouseoutcapture?: MouseEventHandler;
      onmouseover?: MouseEventHandler;
      onmouseovercapture?: MouseEventHandler;
      onmouseup?: MouseEventHandler;
      onmouseupcapture?: MouseEventHandler;

      // Selection Events
      onselect?: GenericEventHandler;
      onselectcapture?: GenericEventHandler;

      // Touch Events
      ontouchcancel?: TouchEventHandler;
      ontouchcancelcapture?: TouchEventHandler;
      ontouchend?: TouchEventHandler;
      ontouchendcapture?: TouchEventHandler;
      ontouchmove?: TouchEventHandler;
      ontouchmovecapture?: TouchEventHandler;
      ontouchstart?: TouchEventHandler;
      ontouchstartcapture?: TouchEventHandler;

      // Pointer Events
      onpointerover?: PointerEventHandler;
      onpointerovercapture?: PointerEventHandler;
      onpointerenter?: PointerEventHandler;
      onpointerentercapture?: PointerEventHandler;
      onpointerdown?: PointerEventHandler;
      onpointerdowncapture?: PointerEventHandler;
      onpointermove?: PointerEventHandler;
      onpointermovecapture?: PointerEventHandler;
      onpointerup?: PointerEventHandler;
      onpointerupcapture?: PointerEventHandler;
      onpointercancel?: PointerEventHandler;
      onpointercancelcapture?: PointerEventHandler;
      onpointerout?: PointerEventHandler;
      onpointeroutcapture?: PointerEventHandler;
      onpointerleave?: PointerEventHandler;
      onpointerleavecapture?: PointerEventHandler;
      ongotpointercapture?: PointerEventHandler;
      ongotpointercapturecapture?: PointerEventHandler;
      onlostpointercapture?: PointerEventHandler;
      onlostpointercapturecapture?: PointerEventHandler;

      // UI Events
      onscroll?: UIEventHandler;
      onscrollcapture?: UIEventHandler;

      // Wheel Events
      onwheel?: WheelEventHandler;
      onwheelcapture?: WheelEventHandler;

      // Animation Events
      onanimationstart?: AnimationEventHandler;
      onanimationstartcapture?: AnimationEventHandler;
      onanimationend?: AnimationEventHandler;
      onanimationendcapture?: AnimationEventHandler;
      onanimationiteration?: AnimationEventHandler;
      onanimationiterationcapture?: AnimationEventHandler;

      // Transition Events
      ontransitionend?: TransitionEventHandler;
      ontransitionendcapture?: TransitionEventHandler;
    }

    export interface DOMAttributes extends IAttributes, DOMAttributeEventHandlersLowerCase {

      // Image Events
      onLoad?: GenericEventHandler;
      onLoadCapture?: GenericEventHandler;
      onError?: GenericEventHandler;
      onErrorCapture?: GenericEventHandler;

      // Clipboard Events
      onCopy?: ClipboardEventHandler;
      onCopyCapture?: ClipboardEventHandler;
      onCut?: ClipboardEventHandler;
      onCutCapture?: ClipboardEventHandler;
      onPaste?: ClipboardEventHandler;
      onPasteCapture?: ClipboardEventHandler;

      // Composition Events
      onCompositionEnd?: CompositionEventHandler;
      onCompositionEndCapture?: CompositionEventHandler;
      onCompositionStart?: CompositionEventHandler;
      onCompositionStartCapture?: CompositionEventHandler;
      onCompositionUpdate?: CompositionEventHandler;
      onCompositionUpdateCapture?: CompositionEventHandler;

      // Focus Events
      onFocus?: FocusEventHandler;
      onFocusCapture?: FocusEventHandler;
      onBlur?: FocusEventHandler;
      onBlurCapture?: FocusEventHandler;

      // Form Events
      onChange?: GenericEventHandler;
      onChangeCapture?: GenericEventHandler;
      onInput?: GenericEventHandler;
      onInputCapture?: GenericEventHandler;
      onSearch?: GenericEventHandler;
      onSearchCapture?: GenericEventHandler;
      onSubmit?: GenericEventHandler;
      onSubmitCapture?: GenericEventHandler;
      onInvalid?: GenericEventHandler;
      onInvalidCapture?: GenericEventHandler;

      // Keyboard Events
      onKeyDown?: KeyboardEventHandler;
      onKeyDownCapture?: KeyboardEventHandler;
      onKeyPress?: KeyboardEventHandler;
      onKeyPressCapture?: KeyboardEventHandler;
      onKeyUp?: KeyboardEventHandler;
      onKeyUpCapture?: KeyboardEventHandler;

      // Media Events
      onAbort?: GenericEventHandler;
      onAbortCapture?: GenericEventHandler;
      onCanPlay?: GenericEventHandler;
      onCanPlayCapture?: GenericEventHandler;
      onCanPlayThrough?: GenericEventHandler;
      onCanPlayThroughCapture?: GenericEventHandler;
      onDurationChange?: GenericEventHandler;
      onDurationChangeCapture?: GenericEventHandler;
      onEmptied?: GenericEventHandler;
      onEmptiedCapture?: GenericEventHandler;
      onEncrypted?: GenericEventHandler;
      onEncryptedCapture?: GenericEventHandler;
      onEnded?: GenericEventHandler;
      onEndedCapture?: GenericEventHandler;
      onLoadedData?: GenericEventHandler;
      onLoadedDataCapture?: GenericEventHandler;
      onLoadedMetadata?: GenericEventHandler;
      onLoadedMetadataCapture?: GenericEventHandler;
      onLoadStart?: GenericEventHandler;
      onLoadStartCapture?: GenericEventHandler;
      onPause?: GenericEventHandler;
      onPauseCapture?: GenericEventHandler;
      onPlay?: GenericEventHandler;
      onPlayCapture?: GenericEventHandler;
      onPlaying?: GenericEventHandler;
      onPlayingCapture?: GenericEventHandler;
      onProgress?: GenericEventHandler;
      onProgressCapture?: GenericEventHandler;
      onRateChange?: GenericEventHandler;
      onRateChangeCapture?: GenericEventHandler;
      onSeeked?: GenericEventHandler;
      onSeekedCapture?: GenericEventHandler;
      onSeeking?: GenericEventHandler;
      onSeekingCapture?: GenericEventHandler;
      onStalled?: GenericEventHandler;
      onStalledCapture?: GenericEventHandler;
      onSuspend?: GenericEventHandler;
      onSuspendCapture?: GenericEventHandler;
      onTimeUpdate?: GenericEventHandler;
      onTimeUpdateCapture?: GenericEventHandler;
      onVolumeChange?: GenericEventHandler;
      onVolumeChangeCapture?: GenericEventHandler;
      onWaiting?: GenericEventHandler;
      onWaitingCapture?: GenericEventHandler;

      // MouseEvents
      onClick?: MouseEventHandler;
      onClickCapture?: MouseEventHandler;
      onContextMenu?: MouseEventHandler;
      onContextMenuCapture?: MouseEventHandler;
      onDblClick?: MouseEventHandler;
      onDblClickCapture?: MouseEventHandler;
      onDrag?: DragEventHandler;
      onDragCapture?: DragEventHandler;
      onDragEnd?: DragEventHandler;
      onDragEndCapture?: DragEventHandler;
      onDragEnter?: DragEventHandler;
      onDragEnterCapture?: DragEventHandler;
      onDragExit?: DragEventHandler;
      onDragExitCapture?: DragEventHandler;
      onDragLeave?: DragEventHandler;
      onDragLeaveCapture?: DragEventHandler;
      onDragOver?: DragEventHandler;
      onDragOverCapture?: DragEventHandler;
      onDragStart?: DragEventHandler;
      onDragStartCapture?: DragEventHandler;
      onDrop?: DragEventHandler;
      onDropCapture?: DragEventHandler;
      onMouseDown?: MouseEventHandler;
      onMouseDownCapture?: MouseEventHandler;
      onMouseEnter?: MouseEventHandler;
      onMouseEnterCapture?: MouseEventHandler;
      onMouseLeave?: MouseEventHandler;
      onMouseLeaveCapture?: MouseEventHandler;
      onMouseMove?: MouseEventHandler;
      onMouseMoveCapture?: MouseEventHandler;
      onMouseOut?: MouseEventHandler;
      onMouseOutCapture?: MouseEventHandler;
      onMouseOver?: MouseEventHandler;
      onMouseOverCapture?: MouseEventHandler;
      onMouseUp?: MouseEventHandler;
      onMouseUpCapture?: MouseEventHandler;

      // Selection Events
      onSelect?: GenericEventHandler;
      onSelectCapture?: GenericEventHandler;

      // Touch Events
      onTouchCancel?: TouchEventHandler;
      onTouchCancelCapture?: TouchEventHandler;
      onTouchEnd?: TouchEventHandler;
      onTouchEndCapture?: TouchEventHandler;
      onTouchMove?: TouchEventHandler;
      onTouchMoveCapture?: TouchEventHandler;
      onTouchStart?: TouchEventHandler;
      onTouchStartCapture?: TouchEventHandler;

      // Pointer Events
      onPointerOver?: PointerEventHandler;
      onPointerOverCapture?: PointerEventHandler;
      onPointerEnter?: PointerEventHandler;
      onPointerEnterCapture?: PointerEventHandler;
      onPointerDown?: PointerEventHandler;
      onPointerDownCapture?: PointerEventHandler;
      onPointerMove?: PointerEventHandler;
      onPointerMoveCapture?: PointerEventHandler;
      onPointerUp?: PointerEventHandler;
      onPointerUpCapture?: PointerEventHandler;
      onPointerCancel?: PointerEventHandler;
      onPointerCancelCapture?: PointerEventHandler;
      onPointerOut?: PointerEventHandler;
      onPointerOutCapture?: PointerEventHandler;
      onPointerLeave?: PointerEventHandler;
      onPointerLeaveCapture?: PointerEventHandler;
      onGotPointerCapture?: PointerEventHandler;
      onGotPointerCaptureCapture?: PointerEventHandler;
      onLostPointerCapture?: PointerEventHandler;
      onLostPointerCaptureCapture?: PointerEventHandler;

      // UI Events
      onScroll?: UIEventHandler;
      onScrollCapture?: UIEventHandler;

      // Wheel Events
      onWheel?: WheelEventHandler;
      onWheelCapture?: WheelEventHandler;

      // Animation Events
      onAnimationStart?: AnimationEventHandler;
      onAnimationStartCapture?: AnimationEventHandler;
      onAnimationEnd?: AnimationEventHandler;
      onAnimationEndCapture?: AnimationEventHandler;
      onAnimationIteration?: AnimationEventHandler;
      onAnimationIterationCapture?: AnimationEventHandler;

      // Transition Events
      onTransitionEnd?: TransitionEventHandler;
      onTransitionEndCapture?: TransitionEventHandler;
    }

    export interface HTMLAttributesLowerCase {
      // Standard HTML Attributes
      accept?: string;
      acceptcharset?: string;
      accesskey?: string;
      action?: string;
      allowfullscreen?: boolean;
      allowtransparency?: boolean;
      alt?: string;
      async?: boolean;
      autocomplete?: string;
      autocorrect?: string;
      autofocus?: boolean | string;
      autoplay?: boolean;
      capture?: boolean;
      cellpadding?: number | string;
      cellspacing?: number | string;
      charset?: string;
      challenge?: string;
      checked?: boolean | string;
      class?: string | Array<string>;
      classname?: string | Array<string>;
      cols?: number;
      children?: any;
      colspan?: number;
      content?: string;
      contenteditable?: boolean;
      contextmenu?: string;
      controls?: boolean;
      controlslist?: string;
      coords?: string;
      crossorigin?: string;
      data?: string;
      datetime?: string;
      default?: boolean;
      defer?: boolean;
      dir?: string;
      disabled?: boolean;
      download?: any;
      draggable?: boolean;
      enctype?: string;
      form?: string;
      formaction?: string;
      formenctype?: string;
      formmethod?: string;
      novalidate?: boolean | string;
      formnovalidate?: boolean;
      formtarget?: string;
      frameborder?: number | string;
      headers?: string;
      height?: number | string;
      hidden?: boolean;
      high?: number;
      href?: string;
      hreflang?: string;
      for?: string;
      htmlfor?: string;
      httpequiv?: string;
      icon?: string;
      id?: string;
      inputmode?: string;
      integrity?: string;
      is?: string;
      keyparams?: string;
      keytype?: string;
      kind?: string;
      label?: string;
      lang?: string;
      list?: string;
      loop?: boolean;
      low?: number;
      manifest?: string;
      marginheight?: number;
      marginwidth?: number;
      max?: number | string;
      maxlength?: number;
      media?: string;
      mediagroup?: string;
      method?: string;
      min?: number | string;
      minlength?: number;
      multiple?: boolean;
      muted?: boolean;
      name?: string;
      open?: boolean;
      optimum?: number;
      pattern?: string;
      placeholder?: string;
      playsinline?: boolean;
      poster?: string;
      preload?: string;
      radiogroup?: string;
      readonly?: boolean;
      rel?: string;
      required?: boolean | string;
      role?: string;
      rows?: number;
      rowspan?: number;
      sandbox?: string;
      scope?: string;
      scoped?: boolean;
      scrolling?: string;
      seamless?: boolean;
      selected?: boolean;
      shape?: string;
      size?: number;
      sizes?: string;
      slot?: string;
      span?: number;
      spellcheck?: boolean;
      src?: string;
      srcset?: string;
      srcdoc?: string;
      srclang?: string;
      start?: number;
      step?: number | string;
      style?: string | Partial<CSSStyleDeclaration>;
      summary?: string;
      tabindex?: number|string;
      target?: string;
      title?: string;
      type?: string;
      usemap?: string;
      value?: string | string[] | number;
      width?: number | string;
      wmode?: string;
      wrap?: string;

      // RDFa Attributes
      about?: string;
      datatype?: string;
      inlist?: any;
      prefix?: string;
      property?: string;
      resource?: string;
      typeof?: string;
      vocab?: string;

      // Microdata Attributes
      itemprop?: string;
      itemscope?: boolean;
      itemtype?: string;
      itemid?: string;
      itemref?: string;
    }

    // TODO: All should allow for string (full HTML support)
    export interface HTMLAttributes extends HTMLAttributesLowerCase, DOMAttributes {

      // allow for map type attribute passing like:
      // <div attrs={{ disabled: true, ... }}>...</div>
      attrs?: Partial<HTMLAttributes>;

      // Standard HTML Attributes
      accept?: string;
      acceptCharset?: string;
      accessKey?: string;
      action?: string;
      allowFullScreen?: boolean;
      allowTransparency?: boolean;
      alt?: string;
      async?: boolean;
      autoComplete?: string;
      autoCorrect?: string;
      autofocus?: boolean | string;
      autoFocus?: boolean;
      autoPlay?: boolean;
      capture?: boolean;
      cellPadding?: number | string;
      cellSpacing?: number | string;
      charSet?: string;
      challenge?: string;
      checked?: boolean | string;
      class?: string | Array<string>;
      className?: string | Array<string>;
      cols?: number;
      children?: any;
      colSpan?: number;
      content?: string;
      contentEditable?: boolean;
      contextMenu?: string;
      controls?: boolean;
      controlsList?: string;
      coords?: string;
      crossOrigin?: string;
      data?: string;
      dateTime?: string;
      default?: boolean;
      defer?: boolean;
      dir?: string;
      disabled?: boolean;
      download?: any;
      draggable?: boolean;
      encType?: string;
      form?: string;
      formAction?: string;
      formEncType?: string;
      formMethod?: string;
      formNoValidate?: boolean;
      formTarget?: string;
      frameBorder?: number | string;
      headers?: string;
      height?: number | string;
      hidden?: boolean;
      high?: number;
      href?: string;
      hrefLang?: string;
      for?: string;
      htmlFor?: string;
      httpEquiv?: string;
      icon?: string;
      id?: string;
      inputMode?: string;
      integrity?: string;
      is?: string;
      keyParams?: string;
      keyType?: string;
      kind?: string;
      label?: string;
      lang?: string;
      list?: string;
      loop?: boolean;
      low?: number;
      manifest?: string;
      marginHeight?: number;
      marginWidth?: number;
      max?: number | string;
      maxLength?: number;
      media?: string;
      mediaGroup?: string;
      method?: string;
      min?: number | string;
      minLength?: number;
      multiple?: boolean;
      muted?: boolean;
      name?: string;
      open?: boolean;
      optimum?: number;
      pattern?: string;
      placeholder?: string;
      playsInline?: boolean;
      poster?: string;
      preload?: string;
      radioGroup?: string;
      readOnly?: boolean;
      rel?: string;
      required?: boolean | string;
      role?: string;
      rows?: number;
      rowSpan?: number;
      sandbox?: string;
      scope?: string;
      scoped?: boolean;
      scrolling?: string;
      seamless?: boolean;
      selected?: boolean;
      shape?: string;
      size?: number;
      sizes?: string;
      slot?: string;
      span?: number;
      spellcheck?: boolean;
      src?: string;
      srcDoc?: string;
      srcLang?: string;
      srcSet?: string;
      start?: number;
      step?: number | string;
      style?: string | Partial<CSSStyleDeclaration>;
      summary?: string;
      tabIndex?: number|string;
      target?: string;
      title?: string;
      type?: string;
      useMap?: string;
      value?: string | string[] | number;
      width?: number | string;
      wmode?: string;
      wrap?: string;

      // RDFa Attributes
      about?: string;
      datatype?: string;
      inlist?: any;
      prefix?: string;
      property?: string;
      resource?: string;
      typeof?: string;
      vocab?: string;

      // Microdata Attributes
      itemProp?: string;
      itemScope?: boolean;
      itemType?: string;
      itemID?: string;
      itemRef?: string;
    }

    export interface IVirtualIntrinsicElements {
      //some-custom-element-name: HTMLAttributes;
    }

    export interface IntrinsicElements extends IVirtualIntrinsicElements {
      // HTML
      a: HTMLAttributes;
      abbr: HTMLAttributes;
      address: HTMLAttributes;
      area: HTMLAttributes;
      article: HTMLAttributes;
      aside: HTMLAttributes;
      audio: HTMLAttributes;
      b: HTMLAttributes;
      base: HTMLAttributes;
      bdi: HTMLAttributes;
      bdo: HTMLAttributes;
      big: HTMLAttributes;
      blockquote: HTMLAttributes;
      body: HTMLAttributes;
      br: HTMLAttributes;
      button: HTMLAttributes;
      canvas: HTMLAttributes;
      caption: HTMLAttributes;
      cite: HTMLAttributes;
      code: HTMLAttributes;
      col: HTMLAttributes;
      colgroup: HTMLAttributes;
      data: HTMLAttributes;
      datalist: HTMLAttributes;
      dd: HTMLAttributes;
      del: HTMLAttributes;
      details: HTMLAttributes;
      dfn: HTMLAttributes;
      dialog: HTMLAttributes;
      div: HTMLAttributes;
      dl: HTMLAttributes;
      dt: HTMLAttributes;
      em: HTMLAttributes;
      embed: HTMLAttributes;
      fieldset: HTMLAttributes;
      figcaption: HTMLAttributes;
      figure: HTMLAttributes;
      footer: HTMLAttributes;
      form: HTMLAttributes;
      h1: HTMLAttributes;
      h2: HTMLAttributes;
      h3: HTMLAttributes;
      h4: HTMLAttributes;
      h5: HTMLAttributes;
      h6: HTMLAttributes;
      head: HTMLAttributes;
      header: HTMLAttributes;
      hgroup: HTMLAttributes;
      hr: HTMLAttributes;
      html: HTMLAttributes;
      i: HTMLAttributes;
      iframe: HTMLAttributes;
      img: HTMLAttributes;
      input: HTMLAttributes;
      ins: HTMLAttributes;
      kbd: HTMLAttributes;
      keygen: HTMLAttributes;
      label: HTMLAttributes;
      legend: HTMLAttributes;
      li: HTMLAttributes;
      link: HTMLAttributes;
      main: HTMLAttributes;
      map: HTMLAttributes;
      mark: HTMLAttributes;
      menu: HTMLAttributes;
      menuitem: HTMLAttributes;
      meta: HTMLAttributes;
      meter: HTMLAttributes;
      nav: HTMLAttributes;
      noscript: HTMLAttributes;
      object: HTMLAttributes;
      ol: HTMLAttributes;
      optgroup: HTMLAttributes;
      option: HTMLAttributes;
      output: HTMLAttributes;
      p: HTMLAttributes;
      param: HTMLAttributes;
      picture: HTMLAttributes;
      pre: HTMLAttributes;
      progress: HTMLAttributes;
      q: HTMLAttributes;
      rp: HTMLAttributes;
      rt: HTMLAttributes;
      ruby: HTMLAttributes;
      s: HTMLAttributes;
      samp: HTMLAttributes;
      script: HTMLAttributes;
      section: HTMLAttributes;
      select: HTMLAttributes;
      slot: HTMLAttributes;
      small: HTMLAttributes;
      source: HTMLAttributes;
      span: HTMLAttributes;
      strong: HTMLAttributes;
      style: HTMLAttributes;
      sub: HTMLAttributes;
      summary: HTMLAttributes;
      sup: HTMLAttributes;
      table: HTMLAttributes;
      tbody: HTMLAttributes;
      td: HTMLAttributes;
      textarea: HTMLAttributes;
      tfoot: HTMLAttributes;
      th: HTMLAttributes;
      thead: HTMLAttributes;
      time: HTMLAttributes;
      title: HTMLAttributes;
      tr: HTMLAttributes;
      track: HTMLAttributes;
      u: HTMLAttributes;
      ul: HTMLAttributes;
      var: HTMLAttributes;
      video: HTMLAttributes & Partial<{
        autoplay: boolean
      }>;
      wbr: HTMLAttributes;

      //SVG
      svg: SVGAttributes;
      animate: SVGAttributes;
      circle: SVGAttributes;
      clipPath: SVGAttributes;
      defs: SVGAttributes;
      desc: SVGAttributes;
      ellipse: SVGAttributes;
      feBlend: SVGAttributes;
      feColorMatrix: SVGAttributes;
      feComponentTransfer: SVGAttributes;
      feComposite: SVGAttributes;
      feConvolveMatrix: SVGAttributes;
      feDiffuseLighting: SVGAttributes;
      feDisplacementMap: SVGAttributes;
      feFlood: SVGAttributes;
      feGaussianBlur: SVGAttributes;
      feImage: SVGAttributes;
      feMerge: SVGAttributes;
      feMergeNode: SVGAttributes;
      feMorphology: SVGAttributes;
      feOffset: SVGAttributes;
      feSpecularLighting: SVGAttributes;
      feTile: SVGAttributes;
      feTurbulence: SVGAttributes;
      filter: SVGAttributes;
      foreignObject: SVGAttributes;
      g: SVGAttributes;
      image: SVGAttributes;
      line: SVGAttributes;
      linearGradient: SVGAttributes;
      marker: SVGAttributes;
      mask: SVGAttributes;
      path: SVGAttributes;
      pattern: SVGAttributes;
      polygon: SVGAttributes;
      polyline: SVGAttributes;
      radialGradient: SVGAttributes;
      rect: SVGAttributes;
      stop: SVGAttributes;
      symbol: SVGAttributes;
      text: SVGAttributes;
      tspan: SVGAttributes;
      use: SVGAttributes;
    }

    interface CSSStyleDeclaration {
      alignContent: number | string | null;
      alignItems: number | string | null;
      alignSelf: number | string | null;
      alignmentBaseline: number | string | null;
      animation: string;
      animationDelay: string;
      animationDirection: string;
      animationDuration: string;
      animationFillMode: string;
      animationIterationCount: string;
      animationName: string;
      animationPlayState: string;
      animationTimingFunction: string;
      backfaceVisibility: number | string | null;
      background: number | string | null;
      backgroundAttachment: number | string | null;
      backgroundClip: number | string | null;
      backgroundColor: number | string | null;
      backgroundImage: number | string | null;
      backgroundOrigin: number | string | null;
      backgroundPosition: number | string | null;
      backgroundPositionX: number | string | null;
      backgroundPositionY: number | string | null;
      backgroundRepeat: number | string | null;
      backgroundSize: number | string | null;
      baselineShift: number | string | null;
      border: number | string | null;
      borderBottom: number | string | null;
      borderBottomColor: number | string | null;
      borderBottomLeftRadius: number | string | null;
      borderBottomRightRadius: number | string | null;
      borderBottomStyle: number | string | null;
      borderBottomWidth: number | string | null;
      borderCollapse: number | string | null;
      borderColor: number | string | null;
      borderImage: number | string | null;
      borderImageOutset: number | string | null;
      borderImageRepeat: number | string | null;
      borderImageSlice: number | string | null;
      borderImageSource: number | string | null;
      borderImageWidth: number | string | null;
      borderLeft: number | string | null;
      borderLeftColor: number | string | null;
      borderLeftStyle: number | string | null;
      borderLeftWidth: number | string | null;
      borderRadius: number | string | null;
      borderRight: number | string | null;
      borderRightColor: number | string | null;
      borderRightStyle: number | string | null;
      borderRightWidth: number | string | null;
      borderSpacing: number | string | null;
      borderStyle: number | string | null;
      borderTop: number | string | null;
      borderTopColor: number | string | null;
      borderTopLeftRadius: number | string | null;
      borderTopRightRadius: number | string | null;
      borderTopStyle: number | string | null;
      borderTopWidth: number | string | null;
      borderWidth: number | string | null;
      bottom: number | string | null;
      boxShadow: number | string | null;
      boxSizing: number | string | null;
      breakAfter: number | string | null;
      breakBefore: number | string | null;
      breakInside: number | string | null;
      captionSide: number | string | null;
      clear: number | string | null;
      clip: number | string | null;
      clipPath: number | string | null;
      clipRule: number | string | null;
      color: number | string | null;
      colorInterpolationFilters: number | string | null;
      columnCount: any;
      columnFill: number | string | null;
      columnGap: any;
      columnRule: number | string | null;
      columnRuleColor: any;
      columnRuleStyle: number | string | null;
      columnRuleWidth: any;
      columnSpan: number | string | null;
      columnWidth: any;
      columns: number | string | null;
      content: number | string | null;
      counterIncrement: number | string | null;
      counterReset: number | string | null;
      cssFloat: number | string | null;
      cssText: string;
      cursor: number | string | null;
      direction: number | string | null;
      display: number | string | null;
      dominantBaseline: number | string | null;
      emptyCells: number | string | null;
      enableBackground: number | string | null;
      fill: number | string | null;
      fillOpacity: number | string | null;
      fillRule: number | string | null;
      filter: number | string | null;
      flex: number | string | null;
      flexBasis: number | string | null;
      flexDirection: number | string | null;
      flexFlow: number | string | null;
      flexGrow: number | string | null;
      flexShrink: number | string | null;
      flexWrap: number | string | null;
      floodColor: number | string | null;
      floodOpacity: number | string | null;
      font: number | string | null;
      fontFamily: number | string | null;
      fontFeatureSettings: number | string | null;
      fontSize: number | string | null;
      fontSizeAdjust: number | string | null;
      fontStretch: number | string | null;
      fontStyle: number | string | null;
      fontVariant: number | string | null;
      fontWeight: number | string | null;
      gap: number | string | null;
      glyphOrientationHorizontal: number | string | null;
      glyphOrientationVertical: number | string | null;
      grid: number | string | null;
      gridArea: number | string | null;
      gridAutoColumns: number | string | null;
      gridAutoFlow: number | string | null;
      gridAutoRows: number | string | null;
      gridColumn: number | string | null;
      gridColumnEnd: number | string | null;
      gridColumnGap: number | string | null;
      gridColumnStart: number | string | null;
      gridGap: number | string | null;
      gridRow: number | string | null;
      gridRowEnd: number | string | null;
      gridRowGap: number | string | null;
      gridRowStart: number | string | null;
      gridTemplate: number | string | null;
      gridTemplateAreas: number | string | null;
      gridTemplateColumns: number | string | null;
      gridTemplateRows: number | string | null;
      height: number | string | null;
      imeMode: number | string | null;
      justifyContent: number | string | null;
      justifyItems: number | string | null;
      justifySelf: number | string | null;
      kerning: number | string | null;
      layoutGrid: number | string | null;
      layoutGridChar: number | string | null;
      layoutGridLine: number | string | null;
      layoutGridMode: number | string | null;
      layoutGridType: number | string | null;
      left: number | string | null;
      readonly length: number;
      letterSpacing: number | string | null;
      lightingColor: number | string | null;
      lineBreak: number | string | null;
      lineHeight: number | string | null;
      listStyle: number | string | null;
      listStyleImage: number | string | null;
      listStylePosition: number | string | null;
      listStyleType: number | string | null;
      margin: number | string | null;
      marginBottom: number | string | null;
      marginLeft: number | string | null;
      marginRight: number | string | null;
      marginTop: number | string | null;
      marker: number | string | null;
      markerEnd: number | string | null;
      markerMid: number | string | null;
      markerStart: number | string | null;
      mask: number | string | null;
      maskImage: number | string | null;
      maxHeight: number | string | null;
      maxWidth: number | string | null;
      minHeight: number | string | null;
      minWidth: number | string | null;
      msContentZoomChaining: number | string | null;
      msContentZoomLimit: number | string | null;
      msContentZoomLimitMax: any;
      msContentZoomLimitMin: any;
      msContentZoomSnap: number | string | null;
      msContentZoomSnapPoints: number | string | null;
      msContentZoomSnapType: number | string | null;
      msContentZooming: number | string | null;
      msFlowFrom: number | string | null;
      msFlowInto: number | string | null;
      msFontFeatureSettings: number | string | null;
      msGridColumn: any;
      msGridColumnAlign: number | string | null;
      msGridColumnSpan: any;
      msGridColumns: number | string | null;
      msGridRow: any;
      msGridRowAlign: number | string | null;
      msGridRowSpan: any;
      msGridRows: number | string | null;
      msHighContrastAdjust: number | string | null;
      msHyphenateLimitChars: number | string | null;
      msHyphenateLimitLines: any;
      msHyphenateLimitZone: any;
      msHyphens: number | string | null;
      msImeAlign: number | string | null;
      msOverflowStyle: number | string | null;
      msScrollChaining: number | string | null;
      msScrollLimit: number | string | null;
      msScrollLimitXMax: any;
      msScrollLimitXMin: any;
      msScrollLimitYMax: any;
      msScrollLimitYMin: any;
      msScrollRails: number | string | null;
      msScrollSnapPointsX: number | string | null;
      msScrollSnapPointsY: number | string | null;
      msScrollSnapType: number | string | null;
      msScrollSnapX: number | string | null;
      msScrollSnapY: number | string | null;
      msScrollTranslation: number | string | null;
      msTextCombineHorizontal: number | string | null;
      msTextSizeAdjust: any;
      msTouchAction: number | string | null;
      msTouchSelect: number | string | null;
      msUserSelect: number | string | null;
      msWrapFlow: string;
      msWrapMargin: any;
      msWrapThrough: string;
      objectFit: number | string | null;
      objectPosition: number | string | null;
      opacity: number | string | null;
      order: number | string | null;
      orphans: number | string | null;
      outline: number | string | null;
      outlineColor: number | string | null;
      outlineOffset: number | string | null;
      outlineStyle: number | string | null;
      outlineWidth: number | string | null;
      overflow: number | string | null;
      overflowX: number | string | null;
      overflowY: number | string | null;
      padding: number | string | null;
      paddingBottom: number | string | null;
      paddingLeft: number | string | null;
      paddingRight: number | string | null;
      paddingTop: number | string | null;
      pageBreakAfter: number | string | null;
      pageBreakBefore: number | string | null;
      pageBreakInside: number | string | null;
      readonly parentRule: CSSRule;
      penAction: number | string | null;
      perspective: number | string | null;
      perspectiveOrigin: number | string | null;
      pointerEvents: number | string | null;
      position: number | string | null;
      quotes: number | string | null;
      resize: number | string | null;
      right: number | string | null;
      rotate: number | string | null;
      rowGap: number | string | null;
      rubyAlign: number | string | null;
      rubyOverhang: number | string | null;
      rubyPosition: number | string | null;
      scale: number | string | null;
      scrollBehavior: string;
      stopColor: number | string | null;
      stopOpacity: number | string | null;
      stroke: number | string | null;
      strokeDasharray: number | string | null;
      strokeDashoffset: number | string | null;
      strokeLinecap: number | string | null;
      strokeLinejoin: number | string | null;
      strokeMiterlimit: number | string | null;
      strokeOpacity: number | string | null;
      strokeWidth: number | string | null;
      tableLayout: number | string | null;
      textAlign: number | string | null;
      textAlignLast: number | string | null;
      textAnchor: number | string | null;
      textCombineUpright: number | string | null;
      textDecoration: number | string | null;
      textIndent: number | string | null;
      textJustify: number | string | null;
      textKashida: number | string | null;
      textKashidaSpace: number | string | null;
      textOverflow: number | string | null;
      textShadow: number | string | null;
      textTransform: number | string | null;
      textUnderlinePosition: number | string | null;
      top: number | string | null;
      touchAction: string;
      transform: number | string | null;
      transformOrigin: number | string | null;
      transformStyle: number | string | null;
      transition: string;
      transitionDelay: string;
      transitionDuration: string;
      transitionProperty: string;
      transitionTimingFunction: string;
      translate: number | string | null;
      unicodeBidi: number | string | null;
      userSelect: number | string | null;
      verticalAlign: number | string | null;
      visibility: number | string | null;
      /** @deprecated */
      webkitAlignContent: string;
      /** @deprecated */
      webkitAlignItems: string;
      /** @deprecated */
      webkitAlignSelf: string;
      /** @deprecated */
      webkitAnimation: string;
      /** @deprecated */
      webkitAnimationDelay: string;
      /** @deprecated */
      webkitAnimationDirection: string;
      /** @deprecated */
      webkitAnimationDuration: string;
      /** @deprecated */
      webkitAnimationFillMode: string;
      /** @deprecated */
      webkitAnimationIterationCount: string;
      /** @deprecated */
      webkitAnimationName: string;
      /** @deprecated */
      webkitAnimationPlayState: string;
      /** @deprecated */
      webkitAnimationTimingFunction: string;
      /** @deprecated */
      webkitAppearance: string;
      /** @deprecated */
      webkitBackfaceVisibility: string;
      /** @deprecated */
      webkitBackgroundClip: string;
      /** @deprecated */
      webkitBackgroundOrigin: string;
      /** @deprecated */
      webkitBackgroundSize: string;
      /** @deprecated */
      webkitBorderBottomLeftRadius: string;
      /** @deprecated */
      webkitBorderBottomRightRadius: string;
      webkitBorderImage: number | string | null;
      /** @deprecated */
      webkitBorderRadius: string;
      /** @deprecated */
      webkitBorderTopLeftRadius: string;
      /** @deprecated */
      webkitBorderTopRightRadius: string;
      /** @deprecated */
      webkitBoxAlign: string;
      webkitBoxDirection: number | string | null;
      /** @deprecated */
      webkitBoxFlex: string;
      /** @deprecated */
      webkitBoxOrdinalGroup: string;
      webkitBoxOrient: number | string | null;
      /** @deprecated */
      webkitBoxPack: string;
      /** @deprecated */
      webkitBoxShadow: string;
      /** @deprecated */
      webkitBoxSizing: string;
      webkitColumnBreakAfter: number | string | null;
      webkitColumnBreakBefore: number | string | null;
      webkitColumnBreakInside: number | string | null;
      webkitColumnCount: any;
      webkitColumnGap: any;
      webkitColumnRule: number | string | null;
      webkitColumnRuleColor: any;
      webkitColumnRuleStyle: number | string | null;
      webkitColumnRuleWidth: any;
      webkitColumnSpan: number | string | null;
      webkitColumnWidth: any;
      webkitColumns: number | string | null;
      /** @deprecated */
      webkitFilter: string;
      /** @deprecated */
      webkitFlex: string;
      /** @deprecated */
      webkitFlexBasis: string;
      /** @deprecated */
      webkitFlexDirection: string;
      /** @deprecated */
      webkitFlexFlow: string;
      /** @deprecated */
      webkitFlexGrow: string;
      /** @deprecated */
      webkitFlexShrink: string;
      /** @deprecated */
      webkitFlexWrap: string;
      /** @deprecated */
      webkitJustifyContent: string;
      /** @deprecated */
      webkitMask: string;
      /** @deprecated */
      webkitMaskBoxImage: string;
      /** @deprecated */
      webkitMaskBoxImageOutset: string;
      /** @deprecated */
      webkitMaskBoxImageRepeat: string;
      /** @deprecated */
      webkitMaskBoxImageSlice: string;
      /** @deprecated */
      webkitMaskBoxImageSource: string;
      /** @deprecated */
      webkitMaskBoxImageWidth: string;
      /** @deprecated */
      webkitMaskClip: string;
      /** @deprecated */
      webkitMaskComposite: string;
      /** @deprecated */
      webkitMaskImage: string;
      /** @deprecated */
      webkitMaskOrigin: string;
      /** @deprecated */
      webkitMaskPosition: string;
      /** @deprecated */
      webkitMaskRepeat: string;
      /** @deprecated */
      webkitMaskSize: string;
      /** @deprecated */
      webkitOrder: string;
      /** @deprecated */
      webkitPerspective: string;
      /** @deprecated */
      webkitPerspectiveOrigin: string;
      webkitTapHighlightColor: number | string | null;
      /** @deprecated */
      webkitTextFillColor: string;
      /** @deprecated */
      webkitTextSizeAdjust: string;
      /** @deprecated */
      webkitTextStroke: string;
      /** @deprecated */
      webkitTextStrokeColor: string;
      /** @deprecated */
      webkitTextStrokeWidth: string;
      /** @deprecated */
      webkitTransform: string;
      /** @deprecated */
      webkitTransformOrigin: string;
      /** @deprecated */
      webkitTransformStyle: string;
      /** @deprecated */
      webkitTransition: string;
      /** @deprecated */
      webkitTransitionDelay: string;
      /** @deprecated */
      webkitTransitionDuration: string;
      /** @deprecated */
      webkitTransitionProperty: string;
      /** @deprecated */
      webkitTransitionTimingFunction: string;
      webkitUserModify: number | string | null;
      webkitUserSelect: number | string | null;
      webkitWritingMode: number | string | null;
      whiteSpace: number | string | null;
      widows: number | string | null;
      width: number | string | null;
      wordBreak: number | string | null;
      wordSpacing: number | string | null;
      wordWrap: number | string | null;
      writingMode: number | string | null;
      zIndex: number | string | null;
      zoom: number | string | null;
    }

    // addition for <template slot="$name">
    interface IntrinsicElements {
      template: HTMLAttributes;
    }

    // addition for <fragment unwrap>
    interface IntrinsicElements {
      fragment: HTMLAttributes;
    }
  }
}
