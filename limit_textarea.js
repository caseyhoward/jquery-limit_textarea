// Written by Casey Howard

(function($){  
    $.fn.limit_textarea = function(options){
        return this.each(function() { 
            options = $.extend({}, $.textarea_limiter.defaults, options);
            if (options['show_immediately']) {
                $.textarea_limiter.update_description($(this), options);
            }
            $(this).keyup(function() {
              $.textarea_limiter.update_description($(this), options);
            });
        });
        return this;
    }
    
    $.textarea_limiter = {};
    
    $.textarea_limiter.update_description = function(textarea_jquery, options) {
        var description_id = textarea_jquery[0].id + "_limit_description";
        var existing_descriptions = jQuery('#' + description_id);
        var description_string;
        if (existing_descriptions.length == 0) {
            if (options['placement'] == 'after') {
                textarea_jquery.after('<div id="' + description_id + '"></div>');
            } else if (options['placement'] == 'before') {
                textarea_jquery.before('<div id="' + description_id + '"></div>');
            } else {
                alert("limit_textarea: Invalid placement")
            }
        }
        if (options['type'] == 'character') {
            count = textarea_jquery.val().length;
        } else if (options['type'] == 'word') {
            var count = jQuery.grep(textarea_jquery.val().split(/\s+/), function(value) {
                return value != "";
            }).length;
        } else {
            alert('limit_textarea: Invalid type');
            return;
        }
        if (count > options['max']) {
            description_class = options['error_class'];
            description_string = (count - options['max']) + ' ' + options['type'] + 's over the limit (max: ' + options['max'] + ')';
            return_value = false;
        } else {
            if ((options['max'] - count) < options['warning_max']) {
                description_class = options['warning_class'];
            } else {
                description_class = options['success_class'];
            }
            description_string = (options['max'] - count) + ' ' + options['type'] + 's remaining.';
        }
        description_jquery = jQuery('#' + description_id);
        jQuery.each([options['error_class'], options['warning_class'], options['success_class']], function(index, class_name) {
            description_jquery.removeClass(class_name);
        });
        description_jquery.addClass(description_class);
        description_jquery.html(description_string);
    }
        
    $.textarea_limiter.defaults = {
        type: 'character',
        max: 255,
        warning_max: 25,
        success_class: 'success',
        warning_class: 'notice',
        error_class: 'error',
        placement: 'after',
        show_immediately: true
    };
})(jQuery);





