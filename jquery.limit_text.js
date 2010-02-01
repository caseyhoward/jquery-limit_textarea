// Written by Casey Howard

(function($){  
    $.fn.limit_text = function(options){
        this.each(function() { 
            options = $.extend({}, $.text_limiter.defaults, options);
            var text_limiter = new $.text_limiter($(this), options);
            if (options['show_immediately']) {
                text_limiter.restore_old_state();
                text_limiter.update_description();
            }
            $(this).keyup(function() {
                text_limiter.restore_old_state();
                text_limiter.update_description();
            });
            $(this).keypress(function(e) {
                text_limiter.restore_old_state();
                text_limiter.update_description();
            });
            $(this).keydown(function(e) {
                text_limiter.store_old_state();
            });
        });
        return this;
    }
    
    $.text_limiter = function(text_jquery, options) {
        this.options = options;
        this.text_jquery = text_jquery;
        
        if (this.options['description_id']) {
            this.description_id = this.options['description_id'];
        } else {
            this.description_id = this.text_jquery[0].id + "_limit_description";
        }
        
        this.last_good_text = this.text_jquery.val();
        
        var existing_descriptions = jQuery('#' + this.description_id);
        if (existing_descriptions.length == 0) {
            var description_div = '<div id="' + this.description_id + '"></div>';
            if (options['placement'] == 'after') {
                this.text_jquery.after(description_div);
            } else if (options['placement'] == 'before') {
                this.text_jquery.before(description_div);
            } else {
                alert("limit_text: Invalid placement");
            }
        }
        
        this.description_jquery = $('#' + this.description_id);
        
        
        // If the 'strict' option is enabled then we store the current value of the textarea which is assumed to be valid.
        // This string is then used to restore the value to the textarea, if the textarea becomes invalid.
        // We also store the current selection, so that if we end up restoring to text, we can restore the cursor position
        // instead of leaving it at the end which is the default.
        this.store_old_state = function() {
            if (this.options['strict']) {
                if ($.text_limiter.get_count(this.text_jquery.val(), this.options['type']) <= this.options['max']) {
                    this.last_good_text = this.text_jquery.val();
                    if (this.text_jquery[0].selectionStart && this.text_jquery[0].selectionEnd) {
                        this.last_selection_start = this.text_jquery[0].selectionStart;
                        this.last_selection_end = this.text_jquery[0].selectionEnd;
                    }
                }
            }
        }
        
        // If the 'strict' option is enabled and the textarea value becomes too long, we restore the text and cursor position        
        this.restore_old_state = function() {
            // We only want to fix the text when the strict option is enabled
            if (this.options['strict']) {
                var count = $.text_limiter.get_count(this.text_jquery.val(), this.options['type']);
                if (count > options['max']) {
                    this.text_jquery.val(this.last_good_text);
                    if (this.text_jquery[0].selectionStart && this.text_jquery[0].selectionEnd) {
                        this.text_jquery[0].selectionStart = this.last_selection_start;
                        this.text_jquery[0].selectionEnd = this.last_selection_end;
                    }
                }
            }
        }
        
        
        this.update_description = function() {
            var description_string;
            var count = $.text_limiter.get_count(this.text_jquery.val(), this.options['type']);
            if (count > options['max']) {
                description_class = options['error_class'];
                description_string = (count - options['max']) + ' ' + options['type'] + 's over the limit (max: ' + options['max'] + ')';
            } else {
                if ((options['max'] - count) < options['warning_max']) {
                    description_class = options['warning_class'];
                } else {
                    description_class = options['success_class'];
                }
                description_string = (options['max'] - count) + ' ' + options['type'] + 's remaining.';
            }
            var description_jquery = this.description_jquery; // So we can access it in $.each() function, kinda lame
            $.each([this.options['error_class'], this.options['warning_class'], this.options['success_class']], function(index, class_name) {
                description_jquery.removeClass(class_name);
            });
            description_jquery.addClass(description_class);
            description_jquery.html(description_string);
        };
    };
    
    $.text_limiter.get_count = function (text, type) {
        if (type == 'character') {
            return text.length;
        } else if (type == 'word') {
            return $.grep(text.split(/\s+/), function(value) {
                return value != "";
            }).length;
        } else {
            alert('limit_text: Invalid type');
            return;
        }
    };
    
    $.text_limiter.defaults = {
            type: 'character',
            max: 255,
            warning_max: 25,
            success_class: 'success',
            warning_class: 'warning',
            error_class: 'error',
            placement: 'after',
            show_immediately: true,
            strict: false,
            description_id: null
    };
    
})(jQuery);





