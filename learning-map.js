(function ($) {

    function Tiler(container, nblocks, svg) {

        var block_size = container.height() / nblocks;
        var half_block = block_size / 2;
        var x_center, y_center, radius=(block_size * 0.25);

        return {

            drawVertex: function(x, y) {
                var x_center = (x * block_size) + half_block;
                var y_center = (y * block_size) - half_block;

                svg.circle( x_center
                          , y_center
                          , radius
                          , {fill: 'yellow'}
                           );
            },

            drawEdge: function(x,y) {
                var x_center = (x * block_size) + half_block;
                var y_center = (y * block_size) - half_block;

                var path = svg.createPath();
                svg.path(path.move(x_center - half_block, y_center)
                             .line( x_center + half_block, y_center)
                                  , {stroke: 'orange', strokeWidth: 4}
                                   );
            }

        }
    }

    $.fn.learningMap = function(dag, options) {

        var options = $.extend({}, $.fn.learningMap.defaults, options);

        this.addClass('learning-map');
        this.svg();
        var svg = this.svg('get');

        var roots = Object.keys(dag);
        for (var v in dag) {
            for (var i=0, z=dag[v].length; i < z; i++) {
                var idx = roots.indexOf(dag[v][i]);
                if (idx > -1)
                    roots.splice(idx, 1);
            }
        }
        // At this point roots is populated with all and only root vertices.


        /* Set up layout variables.
         *
         * We want a side-scrolling layout, with no vertical scrolling. We set
         * the number of blocks high we want the layout to be, and then compute
         * a square size for blocks based on the height of the container. Then
         * we use x and y as the position in our grid.
         *
         */

        var nblocks = 11;
        var x = 0;                          // start on the left
        var seen = {};
        var tiler = Tiler(this, nblocks, svg);

        // Build a map as a matrix by recursing through the generations.
        function mapgen(gen, x) {
            var y = Math.ceil(nblocks / 2); // start in the middle
            var nextgen = [];
            while (gen.length) {
                var v = gen.shift();

                if (seen[v]) continue;
                seen[v] = true;

                tiler.drawVertex(x, y);
                for (var i=0, z=dag[v].length; i < z; i++)
                    tiler.drawEdge(x+1, y+i);

                y = y + 1;

                Array.prototype.push.apply(nextgen, dag[v]);
            }
            if (nextgen.length)
                mapgen(nextgen, x+2);
        }
        mapgen(roots, x);

        return this;
    };

}(jQuery));

jQuery.fn.learningMap.defaults = {
};
