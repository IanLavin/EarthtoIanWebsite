document.addEventListener("DOMContentLoaded", function() {
    var grid = document.querySelector('.grid');
    new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });
});

// init Masonry
var $grid = $('.grid').masonry({
    // options...
  });
  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });