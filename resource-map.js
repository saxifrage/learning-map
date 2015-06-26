(function ($) {

    var drawn = [];

    function Resource(relsize) {
        return {
            draw: function(svg) {

                var previous = drawn[drawn.length - 1] || {x: 0, y: 0, w: 0, h: 0};

                this.x = previous.x + previous.w;
                this.y = previous.y;
                this.w = relsize * 50;
                this.h = relsize * 50;
                this.ell = Math.random() <= 0.2; // 20% of shapes should be ells

                svg.rect(this.x, this.y, this.w, this.h, 0, 0,
                         {fill: '#0099FF', stroke: 'white', strokeWidth: 10});

                drawn.push(this);
            }
        }
    }

    $.fn.resourceMap = function(resources, options) {

        var options = $.extend({}, $.fn.resourceMap.defaults, options);
        var W=this.width(), H=this.height();

        this.addClass('resource-map');
        this.svg();
        var svg = this.svg('get');

        // Randomize sort order of resources.
        resources.sort(function() {return Math.random() - 0.5});

        for (var i=0, resource; resource = resources[i]; i++)
            Resource(resource.duration).draw(svg);

        return this;
    };

}(jQuery));

jQuery.fn.resourceMap.defaults = {
};
