(function ($) {

    function Tiler(container, nblocks, svg) {

        var block_size = container.height() / nblocks;
        var half_block = block_size / 2;
        var x_center, y_center, radius=(block_size * 0.25);

        return {

            drawVertex: function(x, y) {
                x_center = (x * block_size) + half_block;
                y_center = (y * block_size) - half_block;

                svg.circle( x_center
                          , y_center
                          , radius
                          , {fill: 'yellow'}
                           );
            }

        }
    }

    $.fn.learningMap = function(dag, options) {

        var options = $.extend({}, $.fn.learningMap.defaults, options);

        this.addClass('learning-map');
        this.svg();
        var svg = this.svg('get');

        var queue = Object.keys(dag);
        for (var v in dag) {
            for (var i=0, z=dag[v].length; i < z; i++) {
                var idx = queue.indexOf(dag[v][i]);
                if (idx > -1)
                    queue.splice(idx, 1);
            }
        }
        // At this point queue is populated with all and only root vertices.


        /* Set up layout variables.
         *
         * We want a side-scrolling layout, with no vertical scrolling. We set
         * the number of blocks high we want the layout to be, and then compute
         * a square size for blocks based on the height of the container. Then
         * we use x and y as the position in our grid.
         *
         */

        var nblocks = 11;
        var x = 0;                      // start on the left
        var y = Math.ceil(nblocks / 2); // start in the middle

        function column() { return new Array(nblocks) }

        var map = [column()];
        var tiler = Tiler(this, nblocks, svg);
        var seen = {};

        while (queue.length) {
            var v = queue.shift();

            if (seen[v]) return;
            seen[v] = true;

            tiler.drawVertex(x, y);
            map[x][y] = true;

            if (x === map.length-1)
                map.push(column());
            x = x + 1;

            Array.prototype.push.apply(queue, dag[v]);
        }

        return this;
    };

}(jQuery));

jQuery.fn.learningMap.defaults = {
};
