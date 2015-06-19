(function ($) {

    $.fn.learningMap = function(options) {

        var options = $.extend({}, $.fn.learningMap.defaults, options);

        this.addClass('learning-map');
        this.svg();
        var svg = this.svg('get');

        var dag = options.dag;
        var queue = [0];

        while (queue.length) {
            var i = queue.shift();
            svg.circle(i*60, i*60, 50, {fill: 'none', stroke: 'yellow', strokeWidth: 3});

            Array.prototype.push.apply(queue, dag[i]);
            console.log(queue);
        }

        return this;
    };

}(jQuery));

jQuery.fn.learningMap.defaults = {
    dag: {}
};
