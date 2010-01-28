# Limit Textarea jQuery Plugin

This is a plugin that limits the number of characters or words that can be typed into a textarea field. It also creates a description for the user to tell them the status (characters remaining, etc.)

## Usage

Simply call limit_textarea on the jQuery object you wish to apply to with any options you want.

    jQuery(text_area_id).limit_textarea(options);
    
### Options


**type:** This is what we are limiting by (the units if you will). Possible values are 'character' (default) or 'word'

**max:** This is the number of either words or characters that we want to restrict the user to. Default: 255

**warning_max:** This is the number of either words or characters that we want to start warning the user that they are near the limit. Default: 25

**success_class:** The css class used on the description when the user isn't near the character limit. Default: 'success'

**warning_class:** The css class used on the description when the user is near the character limit. Default: 'warning'

**error_class:** The css class used on the description when the user is over the character limit. Default: 'error'

**placement:** Where the description div will be places. Possible values are 'before' and 'after'. Default: 'after'

**show_immediately:** Whether or not the description will be shown on page load or after the user makes a change to the field. Default: true

**strict:** Whether or not we allow the user to go over the limit. Notice: if this is set to true, then the error_class will never be used. Default: false


## Examples

Restrict a textarea to 500 words:
    jQuery(text_area_id).limit_textarea({ max: 500, type: 'word'});