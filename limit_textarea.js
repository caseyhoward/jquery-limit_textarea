// Written by Casey Howard

(function($){  
    $.fn.limit_textarea = function(options){
        return this.each(function() { 
            options = $.extend({}, $.textarea_limiter.defaults, options);
            var textarea_limiter = new $.textarea_limiter($(this), options);
            if (options['show_immediately']) {
                textarea_limiter.fix_text();
                textarea_limiter.update_description();
            }
            $(this).keyup(function() {
                textarea_limiter.fix_text();
                textarea_limiter.update_description();
            });
            $(this).keypress(function(e) {
                textarea_limiter.fix_text();
                textarea_limiter.update_description();
            });
            $(this).keydown(function(e) {
                textarea_limiter.store_old_state();
            });
        });
        return this;
    }
    
    $.textarea_limiter = function(textarea_jquery, options) {
        this.options = options;
        this.textarea_jquery = textarea_jquery;
        this.description_id = this.textarea_jquery[0].id + "_limit_description";
        this.last_good_text = this.textarea_jquery.val();
        
        var existing_descriptions = jQuery('#' + this.description_id);
        if (existing_descriptions.length == 0) {
            var description_div = '<div id="' + this.description_id + '"></div>';
            if (options['placement'] == 'after') {
                this.textarea_jquery.after(description_div);
            } else if (options['placement'] == 'before') {
                this.textarea_jquery.before(description_div);
            } else {
                alert("limit_textarea: Invalid placement");
            }
        }
        
        this.description_jquery = $('#' + this.description_id);
        
        this.store_old_state = function() {
            if ($.textarea_limiter.get_count(this.textarea_jquery.val(), this.options['type']) <= this.options['max']) {
                this.last_good_text = this.textarea_jquery.val();
            }
            if (this.textarea_jquery[0].selectionStart && this.textarea_jquery[0].selectionEnd) {
                this.last_selection_start = this.textarea_jquery[0].selectionStart;
                this.last_selection_end = this.textarea_jquery[0].selectionEnd;
            }
        }
        
        this.fix_text = function() {
            // We only want to fix the text when the strict option is enabled
            if (this.options['strict']) {
                var count = $.textarea_limiter.get_count(this.textarea_jquery.val(), this.options['type']);
                if (count > options['max']) {
                    this.textarea_jquery.val(this.last_good_text);
                    if (this.textarea_jquery[0].selectionStart && this.textarea_jquery[0].selectionEnd) {
                        this.textarea_jquery[0].selectionStart = this.last_selection_start;
                        this.textarea_jquery[0].selectionEnd = this.last_selection_end;
                    }
                }
            }
        }
        
        this.update_description = function() {
            var description_string;
            var count = $.textarea_limiter.get_count(this.textarea_jquery.val(), this.options['type']);
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
    
    $.textarea_limiter.get_count = function (text, type) {
        if (type == 'character') {
            return text.length;
        } else if (type == 'word') {
            return $.grep(text.split(/\s+/), function(value) {
                return value != "";
            }).length;
        } else {
            alert('limit_textarea: Invalid type');
            return;
        }
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





