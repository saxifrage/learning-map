(function ($) {

    function Resource(relsize) {
        return {
            draw: function(svg) {
                var x = Math.random() * 500;
                var y = Math.random() * 500;
                console.log(x, y, relsize)
                svg.circle(x, y, relsize, {fill: 'green'});
            }
        }
    }

    $.fn.resourceMap = function(resources, options) {

        var options = $.extend({}, $.fn.resourceMap.defaults, options);

        this.addClass('resource-map');
        this.svg();
        var svg = this.svg('get');

        for (var i=0, resource; resource = resources[i]; i++)
            Resource(resource).draw(svg);

        return this;
    };

}(jQuery));

jQuery.fn.resourceMap.defaults = {
};
