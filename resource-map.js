(function ($) {

    var drawn = [];
    var W=0, H=0, area=0, demand=0;

    function Resource(relsize) {
        return {
            draw: function(svg) {

                var area_target = (relsize / demand) * area;
                var root = Math.sqrt(area_target);

                var previous = drawn[drawn.length - 1] || {x: 0, y: 0, w: 0, h: 0};

                this.x = previous.x + previous.w;
                this.y = previous.y;
                this.w = Math.max((root * 2) * Math.random(), 50);
                this.h = (area_target / this.w) - 10;

                console.log(relsize, demand, area, area_target, this.w, this.h);

                svg.rect(this.x, this.y, this.w, this.h, 0, 0,
                         {fill: '#0099FF', stroke: 'white', strokeWidth: 10});
                svg.circle(this.x + (this.w / 2), this.y + (this.h / 2), 10,
                           {fill: '#0099FF', stroke: 'white', strokeWidth: 2});

                drawn.push(this);
            }
        }
    }

    $.fn.resourceMap = function(resources, options) {

        var options = $.extend({}, $.fn.resourceMap.defaults, options);

        W = this.width();
        H = this.height();
        area = W * H;

        this.addClass('resource-map');
        this.svg();
        var svg = this.svg('get');

        // Randomize sort order of resources.
        resources.sort(function(a, b) {return Math.random() - 0.5});

        // Determine demand for space.
        demand = resources.reduce(function(prev, b) {return prev + b.duration}, 0);

        console.log(W, H, area, demand);

        for (var i=0, resource; resource = resources[i]; i++)
            Resource(resource.duration).draw(svg);

        return this;
    };

}(jQuery));

jQuery.fn.resourceMap.defaults = {
};
