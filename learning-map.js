(function ($) {

    $.fn.learningMap = function(options) {

        var options = $.extend({}, $.fn.learningMap.defaults, options);

        this.addClass('learning-map');
        for (var v in options.dag) {
            var node = $('<div>');
            node.addClass('learning-map-node');
            node.css({top: v*60, left: v*60});
            this.append(node);
        }

        return this;
    };

}(jQuery));

jQuery.fn.learningMap.defaults = {
    dag: {}
};
