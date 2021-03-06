jQuery(function($){

    $('#widgets-right').on('click', '.arcw-accordion .accordion-section:not(.open)', function(){
        console.log('click');
        if($(this).parent().find('.accordion-section.open').length)
            $(this).parent().find('.accordion-section.open .accordion-section-content').slideUp('fast', function(){$(this).parent().removeClass('open')});
        $(this).find('.accordion-section-content').slideDown('fast', function(){$(this).parent().addClass('open')});
    })
    .on('click', '.arcw-accordion .accordion-section.open .accordion-section-title', function(){
        $(this).parent().find('.accordion-section-content').slideUp('fast', function(){$(this).parent().removeClass('open')});
    });

    $('#widgets-right').on('change', '#arw-view', function(){
        var monthOpt = $(this).parents('.widget-content').find('.monthOpt');
        var yearOpt = $(this).parents('.widget-content').find('.yearOpt');
        console.log($(this).val());
        if($(this).val()==1)
        {
            monthOpt.css('display', 'inline-block');
            yearOpt.hide();
            yearOpt.find('#arw-year_view-option').attr('checked', false);
        }
        else
        {
            monthOpt.hide();
            yearOpt.css('display', 'inline-block');
        }
    });

    $('body').on('change', 'input:checkbox', function () {
        if($(this).attr('id') == "arw-theme-option"){
            var widget = $(this).parents('.archives-calendar');
            var themes = widget.find(".arw-theme-list");
            if( widget.find('#arw-theme-option').is(':checked'))
                $(themes).show();
            else
                $(themes).hide();
        }
    });
});
