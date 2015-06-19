(function ($) {

    $.fn.learningMap = function(options) {

        var options = $.extend({}, $.fn.learningMap.defaults, options);

        this.addClass('learning-map');
        this.svg();
        var svg = this.svg('get');

        var dag = options.dag;
        var queue = [0];
        var seen = {};

        /* Set up layout variables.
         *
         * We want a side-scrolling layout, with no vertical scrolling. We set
         * the number of blocks high we want the layout to be, and then compute
         * a square size for blocks based on the height of the container. Then
         * we use x and y as the position in our grid.
         *
         */

        var nblocks = 5;
        var canvas_height = this.height();
        var block_size = canvas_height / nblocks;
        var half_block = block_size / 2;
        var x_center, y_center, radius=(block_size * 0.40);
        var x = 0;                      // start on the left
        var y = Math.ceil(nblocks / 2); // start in the middle

        while (queue.length) {
            var v = queue.shift();

            if (seen[v]) return;
            seen[v] = true;

            x = v;

            x_center = (x * block_size) + half_block;
            y_center = (y * block_size) - half_block;

            svg.circle( x_center
                      , y_center
                      , radius
                      , {fill: 'yellow'}
                       );

            Array.prototype.push.apply(queue, dag[v]);
        }

        return this;
    };

}(jQuery));

jQuery.fn.learningMap.defaults = {
};
