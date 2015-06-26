(function ($) {

    function Resource(relsize) {
        return {
            draw: function(svg) {
                svg.circle(0, 0, 100, {fill: 'green'});
            }
        }
    }

    $.fn.resourceMap = function(resources, options) {

        var options = $.extend({}, $.fn.resourceMap.defaults, options);

        this.addClass('resource-map');
        this.svg();
        var svg = this.svg('get');

        Resource(1).draw(svg);

        return this;
    };

}(jQuery));

jQuery.fn.resourceMap.defaults = {
};
