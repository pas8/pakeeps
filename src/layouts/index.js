import LayoutHeader from 'components/Header';
import React from 'react';
import Head from 'next/head';

const HeaderLayout = ({ children }) => {
  return (
    <>
    <Head>
        {/* <script src={'../scripts/onLongPress/index.js'}/> */}

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `!function(e,t){"use strict";var n=null,a="ontouchstart"in e||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0,i=a?"touchstart":"mousedown",o=a?"touchend":"mouseup",m=a?"touchmove":"mousemove",r=0,u=0,s=10,c=10;function l(e){var n;d(),n=e,e=a&&n.touches&&n.touches[0]?n.touches[0]:n,this.dispatchEvent(new CustomEvent("long-press",{bubbles:!0,cancelable:!0,detail:{clientX:e.clientX,clientY:e.clientY},clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY}))||t.addEventListener("click",function e(n){t.removeEventListener("click",e,!0),function(e){e.stopImmediatePropagation(),e.preventDefault(),e.stopPropagation()}(n)},!0)}function v(a){d(a);var i=a.target,o=parseInt(function(e,n,a){for(;e&&e!==t.documentElement;){var i=e.getAttribute(n);if(i)return i;e=e.parentNode}return a}(i,"data-long-press-delay","1500"),10);n=function(t,n){if(!(e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame&&e.mozCancelRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame))return e.setTimeout(t,n);var a=(new Date).getTime(),i={},o=function(){(new Date).getTime()-a>=n?t.call():i.value=requestAnimFrame(o)};return i.value=requestAnimFrame(o),i}(l.bind(i,a),o)}function d(t){var a;(a=n)&&(e.cancelAnimationFrame?e.cancelAnimationFrame(a.value):e.webkitCancelAnimationFrame?e.webkitCancelAnimationFrame(a.value):e.webkitCancelRequestAnimationFrame?e.webkitCancelRequestAnimationFrame(a.value):e.mozCancelRequestAnimationFrame?e.mozCancelRequestAnimationFrame(a.value):e.oCancelRequestAnimationFrame?e.oCancelRequestAnimationFrame(a.value):e.msCancelRequestAnimationFrame?e.msCancelRequestAnimationFrame(a.value):clearTimeout(a)),n=null}"function"!=typeof e.CustomEvent&&(e.CustomEvent=function(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=t.createEvent("CustomEvent");return a.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),a},e.CustomEvent.prototype=e.Event.prototype),e.requestAnimFrame=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},t.addEventListener(o,d,!0),t.addEventListener(m,function(e){var t=Math.abs(r-e.clientX),n=Math.abs(u-e.clientY);(t>=s||n>=c)&&d()},!0),t.addEventListener("wheel",d,!0),t.addEventListener("scroll",d,!0),t.addEventListener(i,function(e){r=e.clientX,u=e.clientY,v(e)},!0)}(window,document);`
          }}
        /> */}

      </Head>
      
    <LayoutHeader>
      
      {children}
    </LayoutHeader>
    </>
  );
};

export default HeaderLayout;
