$(document).ready(function () {
    $(".intro__left_btn_txt").click(function () {
        $(".sysreqpopup").addClass("show");
    });
    $(".sysreqpopup__bg").click(function () {
        $(".sysreqpopup").removeClass("show");
    });
    $(".sysreqpopup__window_close").click(function () {
        $(".sysreqpopup").removeClass("show");
    });
    $(".ham.ham6").click(function () {
        $(this).toggleClass('active'); 
        $('.header__list').slideToggle(500);
    });

    $(".intro__right_more").click(function () {

        if ($("div").is(".intro__right_note.show:nth-last-child(2)")) {
            $(this).addClass("hide");

            $(".intro__right_note:not(.show):first").addClass("show"); 
        }
        else {
            $(".intro__right_note:not(.show):first").addClass("show"); 
        }

        if ($("div").is(".intro__right_note.show:nth-child(10)") && $("div").is(".intro__right_note:not(.show):nth-child(11)")) {
            $(".intro__right_airplane").addClass("hide");
        }
        
    });
});