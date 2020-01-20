$(document).ready(function($) {

    var accordion = $(".accordion");

    $(".accordion > a").click(function() {
        var ul = $(this).next(),
            clone = ul.clone().css({"height":"auto"}).appendTo(".mini-menu"),
            height = ul.css("height") === "0px" ? ul[0].scrollHeight + "px" : "0px";
        clone.remove();
        ul.animate({"height":height});
        if(!$(this).next().hasClass('active')){
            $(this).next().addClass('active');
        } else {
            $(".accordion > div ").removeClass('active');
        }
        return false;
    });


    /* ------------- sliders ------------- */

    $(".slider").each(function() {
        if ($(this).is(".hero-slider")) {
            $(this).slick({
                dots: false,
                infinite: true,
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 769,
                        settings: {
                            arrows: false,
                            autoplay: true
                        }
                    }
                ]
            });
        }

        else if ($(this).is(".categories-slider")){

            var $statusCurrent = $('.slider-counter-current');
            var $statusNext = $('.slider-counter-next');
            var $slickElement = $('.categories-slider');

            $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                $statusCurrent.text(i);
                $statusNext.text(slick.slideCount);
            });

            $(this).slick({
                arrows: true,
                dots: false,
                infinite: true,
                speed: 1000,
                slidesToShow: 2,
                customPaging: function (slider, i) {
                    return slider.slickCurrentSlide + '/' + (i + 1);
                },
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            autoplay: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

        }

        else if ($(this).is(".history-slider")) {
            $(this).slick({
                dots: true,
                customPaging: function(slider, i) {
                    return '<button class="tab">' + $(slider.$slides[i]).find('.slick-item').attr('title') + '</button>';
                },
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 3,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            autoplay: true
                        }
                    }
                ]
            });
        }

        else if ($(this).is(".product-slider")){

            var $statusCurrent = $('.slider-counter-current');
            var $statusNext = $('.slider-counter-next');
            var $slickElement = $('.product-slider');

            $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                $statusCurrent.text(i);
                $statusNext.text(slick.slideCount);
            });

            $(this).slick({
                arrows: true,
                dots: false,
                infinite: true,
                speed: 1000,
                slidesToShow: 2,
                customPaging: function (slider, i) {
                    return slider.slickCurrentSlide + '/' + (i + 1);
                },
                responsive: [
                    {
                        breakpoint: 1441,
                        settings: {
                            slidesToShow: 1
                        }
                    },

                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            autoplay: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }

        else if ($(this).is(".slider-top-products")) {
            $(this).slick({
                arrows: true,
                dots: false,
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            autoplay: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            arrows: false,
                            variableWidth: false,
                            autoplay: true
                        }
                    }
                ]
            });
        }

        else {
            $(this).slick();
        }
    });



    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 50) {
            $("#header, .logo, .content-menu").addClass("scrolled");
        } else {
            $("#header, .logo, .content-menu").removeClass("scrolled");
        }
    });


    $('.hamburger').click(function(){
        $(this).toggleClass("is-active");
        $(".nav-mobile").animate({width:'toggle'}, 600);
    });



    $('.btn-search, .close-search').click(function (e) {
        e.preventDefault();
        $('.search-bar').slideToggle();
    });

    $(document).ready(function(){
        $(".scroll-dowm, .scroll-up, .footer-menu").on("click","a", function (event) {
            //отменяем стандартную обработку нажатия по ссылке
            event.preventDefault();

            //забираем идентификатор бока с атрибута href
            var id  = $(this).attr('href'),

                //узнаем высоту от начала страницы до блока на который ссылается якорь
                top = $(id).offset().top;

            //анимируем переход на расстояние - top за 1500 мс
            $('body,html').animate({scrollTop: top}, 1500);
        });
    });

    /* form validation */

    jQuery('input#phone').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    $('#home-contact-form').submit(function(e) {
        e.preventDefault();
        var first_name = $('#first-name').val();
        var email = $('.form-email').val();
        var phone = $('#phone').val();
        var select = $('#select').val();
        var message = $('#message').val();

        $(".error").remove();

        if (first_name.length < 1) {
            $('#first-name').after('<span class="error">This field is required</span>');
        }

        if (email.length < 1) {
            $(this).find('.form-email').after('<span class="error">This field is required</span>');
        } else {
            var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $(this).find('#email').after('<span class="error">Enter a valid email</span>');
            }
        }

        if (phone.length < 1) {
            $('#phone').after('<span class="error">This field is required</span>');
        } else if (phone.length > 10) {
            $('#phone').after('<span class="error">Enter a valid number phone</span>');
        }

        if (select == 0) {
            $('#select').after('<span class="error">Please select option</span>');
        }

        if (message.length < 1) {
            $('#message').after('<span class="error">This field is required</span>');
        }

    });

    $('#home-footer-form').submit(function(e) {
        e.preventDefault();
        var footerEmail = $(this).find('#footer-email').val();

        $(this).find(".error").remove();

        if (footerEmail.length < 1 ) {
            $(this).find('.form-email').after('<span class="error">Enter email please</span>');
        } else {
            var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
            var validEmail = regEx.test(email);
            if (!validEmail) {
                $(this).find('#footer-email').after('<span class="error">Enter a valid email</span>');
            }
        }
    })


    $(document).ready(function() {
        $(".fancybox").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
        });
    });


    /* tabs */

    $('.tabs__caption').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
            .closest('.tabs')
            .find('.tabs__content')
            .removeClass('active')
            .eq($(this).index())
            .addClass('active');
    });


    /* ------------- video ------------- */


        $('#play').click(function(e){
            e.preventDefault();
            $('#frame').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/anZlq1mjemo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen id="video"></iframe>');
            $('#main-video').css('display', 'block');
            $('#main-video').css('position', 'fixed');
            $('#close').css('position', 'fixed');
            $('#close').css('display', 'block');
            $('#play').css('opacity', '0.5');
        });



        $('#close').click(function(){
            $('#frame').html('');
            $('#play').data('clicked', 'no');
            $('#main-video').css('display', 'none');
            $('#close').css('display', 'none');
            $('#play').css('opacity', '1');
        });


});