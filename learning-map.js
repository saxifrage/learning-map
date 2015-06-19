(function ($) {

    $.fn.learningMap = function(options) {

        var options = $.extend({
            color: "green"
        }, options);

        this.each(function() {
            $(this).css('background', options.color);
        });

        return this;
    };

}(jQuery));
