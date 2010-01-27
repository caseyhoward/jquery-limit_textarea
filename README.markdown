# Limit Textarea jQuery Plugin

This is a plugin that limits the number of characters or words that can be typed into a textarea field. It also creates a description for the user to tell them the status (characters remaining, etc.)



jQuery(text_area_id).limit_textarea({ max: 500, type: 'word'});


## Usage
Simply call limit_textarea on the jQuery object you wish to apply to with any options you want.

    jQuery(text_area_id).limit_textarea(options);
    
### Options


**type:** This is what we are limiting by (the units if you will). Possible values are 'character' (default) or 'word'

**max:** This is the number of either words or characters that we want to restrict the user to. Default: 255

**warning_max:** This is the number of either words or characters that we want to start warning the user that they are near the limit. Default: 25

**success_class:** The css class used on the description when the user isn't near the character limit. Default: 'success'

**warning_class:** The css class used on the description when the user is near the character limit. Default: 'warning'

**error_class:** 'error'

**placement:** 'after'

**show_immediately:** true

**strict:** false