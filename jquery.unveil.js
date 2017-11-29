/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load imagess
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;
(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
      th = threshold || 0,
      retina = window.devicePixelRatio > 1,
      attrib = retina ? "data-src-retina" : "data-src",
      items = this,
      loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      var className = this.getAttribute("data-class");
      if (className) {
         this.classList.add(className);
      } else {
        source = source || this.getAttribute("data-src");
        if (source) {
          this.setAttribute("src", source);
          if (typeof callback === "function") callback.call(this);
        }
      }
    });

    //Check item array and see if items are inview,
    //if so,
    function unveil() {
      var inview = items.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
          wb = wt + $w.height(),
          et = $e.offset().top,
          eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      items = items.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    //run on init
    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
