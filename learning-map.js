(function ($) {

    $.fn.learningMap = function(options) {

        var options = $.extend({}, $.fn.learningMap.defaults, options);

        this.each(function() {
            $(this).css('background', options.color);
        });

        return this;
    };

}(jQuery));

jQuery.fn.learningMap.defaults = {
    color: 'green'
};
