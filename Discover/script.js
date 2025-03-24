document.addEventListener("DOMContentLoaded", function() {
    var grid = document.querySelector('.grid');
    new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });
});

