This fork adds element.classList.add() capability.

Elements need a data-class="" attribute with the class to add on unveil, as well as the class `.unveil` to locate them. Original purpose was to lazy load background images that have complex css, specifically retina media queries. 

Note you also need to alter the unveil() call on documemt.ready to include these .unveil divs. Ex:

```
<style>
.lazy-image {
  background-image: url("path/to/lazy-image.jpg")
}

@media (-webkit-min-device-pixel-ratio:1.5), all and (-o-min-device-pixel-ratio:3/2), all and (min--moz-device-pixel-ratio:1.5), all and (min-device-pixel-ratio:1.5) {
  .lazy-image {
    background-image: url("path/to/lazy-image@2x.jpg")
  }
}
</style>
<div class="unveil" data-class="lazy-loaded-image"></div>

<script>
  $(document).ready(function() {
    $("img, .unveil").unveil();
  });
</script>
```

Visit original unveil's [project page](http://luis-almeida.github.com/unveil/) for more info.
