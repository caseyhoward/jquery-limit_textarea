// Written by Casey Howard

(function($){  
    $.fn.limit_textarea = function(options){
        return this.each(function() { 
            options = $.extend({}, $.textarea_limiter.defaults, options);
            var textarea_limiter = new $.textarea_limiter($(this), options)
            
            if (options['show_immediately']) {
                textarea_limiter.update_description();
            }
            $(this).keyup(function() {
                textarea_limiter.update_description();
            });
            $(this).keypress(function(e) {
                return textarea_limiter.check_character(e);
            });
        });
        return this;
    }
    
    $.textarea_limiter = function(textarea_jquery, options) {
        this.textarea_jquery = textarea_jquery;
        this.options = options;
        
        this.update_description = function() {
            var description_id = this.textarea_jquery[0].id + "_limit_description";
            var existing_descriptions = jQuery('#' + description_id);
            var description_string;
            if (existing_descriptions.length == 0) {
                if (options['placement'] == 'after') {
                    this.textarea_jquery.after('<div id="' + description_id + '"></div>');
                } else if (options['placement'] == 'before') {
                    this.textarea_jquery.before('<div id="' + description_id + '"></div>');
                } else {
                    alert("limit_textarea: Invalid placement");
                }
            }
            var count = this.get_count();
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
        };
        this.check_character = function(e) {
            var count = this.get_count();
            if (e.charCode == 0) {
                return true;
            }
            if (count > this.options['max'] && e.which != 8 && e.which != 46) {
                return false;
            } else {
                // If we're limiting by words, using strict, and at the max and the user tries to enter a space then don't let them
                if (this.options['type'] == 'word' && count == this.options['max'] && this.options['strict'] && e.charcode != 0) {
                    return false;
                } else if (this.options['type'] == 'character' && count == this.options['max'] && this.options['strict']) {
                    return false;
                }

            }
            return true;
        };
        this.get_count = function () {
            if (this.options['type'] == 'character') {
                return this.textarea_jquery.val().length;
            } else if (this.options['type'] == 'word') {
                return jQuery.grep(this.textarea_jquery.val().split(/\s+/), function(value) {
                    return value != "";
                }).length;
            } else {
                alert('limit_textarea: Invalid type');
                return;
            }
        };
    };
    
    $.textarea_limiter.defaults = {
            type: 'character',
            max: 255,
            warning_max: 25,
            success_class: 'success',
            warning_class: 'warning',
            error_class: 'error',
            placement: 'after',
            show_immediately: true,
            strict: false
    };
    
    

        

})(jQuery);





