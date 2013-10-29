'use strict';

angular.module('mm.lazyLoad', [])
  .directive('mmLazyLoad', ['$document', '$window'], function ($document, $window) {
    var addEvent = function (evnt, elem, func) {
      if (elem.addEventListener) {
        elem.addEventListener(evnt, func, false);
      } else if (elem.attachEvent) {
        elem.attachEvent("on" + evnt, func);
      } else {
        elem[evnt] = func;
      }
    };

    var getWindowSize = function () {
      var wWidth, wHeight;
      if (typeof( $window.innerWidth ) === 'number') {
        wWidth = $window.innerWidth;
        wHeight = $window.innerHeight;
      } else if ($document.documentElement && ( $document.documentElement.clientWidth || $document.documentElement.clientHeight )) {
        wWidth = $document.documentElement.clientWidth;
        wHeight = $document.documentElement.clientHeight;
      }
      return {
        width: wWidth,
        height: wHeight
      };
    };

    var link = function (scope, element, attrs) {
      var show = false;
      addEvent('scroll', $window, function () {
        var wSize = getWindowSize();
        var elTop = element[0].getBoundingClientRect().top;
        if (elTop < wSize.height && !show) {
          var mmLazyLoad = attrs.mmLazyLoad;
          if (mmLazyLoad) {
            var tagName = element.prop('tagName');
            if (tagName === 'IMG') {
              element.prop('src', mmLazyLoad);
            } else {
              element.addClass(mmLazyLoad);
            }
          }
          show = true;
        }
      });
    };
    return {
      link: link
    };
  });