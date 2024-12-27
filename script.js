
var positions = [.7, .8625, 1.15, 1.3, 1.5, 1.7, 1.8625, 2.15];
var scaleValues = [.8, .6, .6, .8, 1.7, .8, .6, .6, .8]
// var scaleValues = [.6, .8, 1.7, .8, .6]

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function setOuterIcons() {
    var currentActive = $('[data-rev-position="2"]').attr('data-rev-name');
    // reset 3
    gsap.utils.toArray('[data-outer-3-active="true"]').forEach((icons) => {
        gsap.to(icons, 0.5, { 
            motionPath: {
                path: '#outer-ring-3',
                align: '#outer-ring-3',
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                start: function() {
                    return $(this._targets[0]).attr('data-outer-end');
                },
                end: 1.65
            },
            onStart: function() {
                $(this._targets[0]).attr('data-outer-3-active', 'false');
            }
        }, 0.125);
    });
    // $('[data-outer-3-active="true"]').each(function() {
    //     gsap.to($(this), 0.5, { 
    //         motionPath: {
    //             path: '#outer-ring-3',
    //             align: '#outer-ring-3',
    //             autoRotate: false,
    //             alignOrigin: [0.5, 0.5],
    //             start: function() {
    //                 return $(this._targets[0]).attr('data-outer-end');
    //             },
    //             end: 2.25
    //         },
    //         onStart: function() {
    //             $(this._targets[0]).attr('data-outer-3-active', 'false');
    //         }
    //     }, 0.125);
    // });
    // reset 4
    $('[data-outer-4-active="true"]').each(function() {
        gsap.to($(this), 0.5, { 
            motionPath: {
                path: '#outer-ring-4',
                align: '#outer-ring-4',
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                start: function() {
                    return $(this._targets[0]).attr('data-outer-end');
                },
                end: 1.4
            },
            onStart: function() {
                $(this._targets[0]).attr('data-outer-4-active', 'false');
            }
        }, 0.125);
    });
    // set 3
    $('.outer-ring-3-icon[data-outer-parent="'+ currentActive +'"]').each(function(i) {
        var thisEnd = (i == 0) ? 1.55 : 1.475;
        var thisDuration = (i == 0) ? 0.575 : 0.675;
        gsap.to( $(this), thisDuration, { 
            motionPath: {
                path: '#outer-ring-3',
                align: '#outer-ring-3',
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                start: 1.25,
                end: thisEnd
            },
            onStart: function() {
                $(this._targets[0]).attr('data-outer-3-active', 'true');
                $(this._targets[0]).attr('data-outer-end', thisEnd);
            }
        }, 0.125);
    });
    // set 4
    $('.outer-ring-4-icon[data-outer-parent="'+ currentActive +'"]').each(function(i) {
        var thisEnd = (i == 0) ? 1.575 : 1.46;
        var thisDuration = (i == 0) ? 0.575 : 0.675;
        gsap.to( $(this), thisDuration, { 
            motionPath: {
                path: '#outer-ring-4',
                align: '#outer-ring-4',
                autoRotate: false,
                alignOrigin: [0.5, 0.5],
                start: 1.75,
                end: thisEnd
            },
            onStart: function() {
                $(this._targets[0]).attr('data-outer-4-active', 'true');
                $(this._targets[0]).attr('data-outer-end', thisEnd);
            }
        }, 0.125);
    });
}
function getArrPositions(next, distance = 1, currentPosition, positionsArr) {
    if ( next == true ) { 
        let newPosition = ( parseInt(currentPosition) + 2 + parseInt(distance) );
        return positionsArr[newPosition];
    } else {
        let newPosition = ( parseInt(currentPosition) + 2 - parseInt(distance) );
        return positionsArr[newPosition];
    }
}
function setIconData($el, next = true) {
    let $tar = $el;
    let currentRevPosition = $tar.attr('data-rev-position');
    if (next == true) {
        let newRevPosition = (parseInt(currentRevPosition) + 1);
        if ( newRevPosition > 4 ) {
            newRevPosition = 1;
            $tar.attr('data-rev-position', '0');
        } else {
            $tar.attr('data-rev-position', (parseInt(currentRevPosition) + 1));
        }
    } else {
        let newRevPosition = (parseInt(currentRevPosition) - 1);
        if ( newRevPosition < 0 ) { 
            newRevPosition = 4;
            $tar.attr('data-rev-position', '4');
        } else {
            $tar.attr('data-rev-position', (parseInt(currentRevPosition) - 1));
        }
    }
}
function setBlurb(){
    var currentActive = $('[data-rev-position="2"]').attr('data-rev-name');
    var activeBlurb = $('[data-blurb-active="true"]');
    var targetBlurb =  $('[data-blurb-parent="'+ currentActive +'"]');
    if( !!activeBlurb.length ){
        gsap.to(activeBlurb, .625, {
            y:-50,
            onStart: function(){
                $(this._targets[0]).attr('data-blurb-active', 'false');
            }
        })
    }
    gsap.set(targetBlurb, {
        y:50,
    })
    gsap.to(targetBlurb, 1, {
        y:0,
        onStart: function() {
            $(this._targets[0]).attr('data-blurb-active', 'true');
        }
    });
}
function revolutionSlide(selector, i, next, distance, fin = 'test786876876') {
    gsap.to('[data-rev-position="' + i + '"]', 0.825, { 
        motionPath: {
            path: '#rev-path',
            align: '#rev-path',
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: positions[(i + 2)],
            end: function() {
                return getArrPositions(next, distance, i, positions);
            }
        },
        scaleX: function() {
            return getArrPositions(next, distance, i, scaleValues);
        }, 
        scaleY: function() {
            return getArrPositions(next, distance, i, scaleValues);
        },
        onStart: function() {
            setIconData($(this._targets[0]), next);
            if (i == 4) {
                setOuterIcons(true);
                setBlurb();
                window.revolutionSliderAnimating = false;
            }
        }
    });
}
function revolveSlides(next = true, distance = 1){
    // revolutionSlide('[data-rev-position="0"]', 0, next, distance);
    // revolutionSlide('[data-rev-position="1"]', 1, next, distance);
    // revolutionSlide('[data-rev-position="2"]', 2, next, distance);
    // revolutionSlide('[data-rev-position="3"]', 3, next, distance);
    // revolutionSlide('[data-rev-position="4"]', 4, next, distance);

    gsap.to('[data-rev-position="0"]', 0.825, { 
        motionPath: {
            path: '#rev-path',
            align: '#rev-path',
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: positions[2],
            end: function() {
                return getArrPositions(next, distance, 0, positions);
            }
        },
        scaleX: function() {
            return getArrPositions(next, distance, 0, scaleValues);
        }, 
        scaleY: function() {
            return getArrPositions(next, distance, 0, scaleValues);
        },
        onStart: function() {
            setIconData($(this._targets[0]), next);
        }
    });
    gsap.to('[data-rev-position="1"]', 0.825, { 
        motionPath: {
            path: '#rev-path',
            align: '#rev-path',
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: positions[3],
            end: function() {
                return getArrPositions(next, distance, 1, positions);
            }
        },
        scaleX: function() {
            return getArrPositions(next, distance, 1, scaleValues);
        }, 
        scaleY: function() {
            return getArrPositions(next, distance, 1, scaleValues);
        },
        onStart: function() {
            setIconData($(this._targets[0]), next);
        }
    });
    gsap.to('[data-rev-position="2"]', 0.825, { 
        motionPath: {
            path: '#rev-path',
            align: '#rev-path',
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: positions[4],
            end: function() {
                return getArrPositions(next, distance, 2, positions);
            }
        },
        scaleX: function() {
            return getArrPositions(next, distance, 2, scaleValues);
        }, 
        scaleY: function() {
            return getArrPositions(next, distance, 2, scaleValues);
        },
        onStart: function() {
            setIconData($(this._targets[0]), next);
        }
    });
    gsap.to('[data-rev-position="3"]', 0.825, { 
        motionPath: {
            path: '#rev-path',
            align: '#rev-path',
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: positions[5],
            end: function() {
                return getArrPositions(next, distance, 3, positions);
            }
        },
        scaleX: function() {
            return getArrPositions(next, distance, 3, scaleValues);
        }, 
        scaleY: function() {
            return getArrPositions(next, distance, 3, scaleValues);
        },
        onStart: function() {
            setIconData($(this._targets[0]), next);
        }
    }, 0.15);
    gsap.to('[data-rev-position="4"]', 0.825, { 
        motionPath: {
            path: '#rev-path',
            align: '#rev-path',
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: positions[6],
            end: function() {
                return getArrPositions(next, distance, 4, positions);
            }
        },
        scaleX: function() {
            return getArrPositions(next, distance, 4, scaleValues);
        }, 
        scaleY: function() {
            return getArrPositions(next, distance, 4, scaleValues);
        },
        onStart: function() {
            setIconData($(this._targets[0]), next);
            setOuterIcons(true);
            setBlurb();
            window.revolutionSliderAnimating = false;
        }
    }, 0);
}
$( document ).ready(function() {
    // run rev slider on init
    revolveSlides(true, 1);
    // start rev slider autoplay
    var revSlider = $('.rev-slider');
    const autoplayRevSlider = setInterval(function() {
        if ( !document.hidden && revSlider.isInViewport() ) {
            window.revolutionSliderAnimating = true;
            revolveSlides(false, 1);
        }
    }, 4500);
    // bind rev slider controls
    var nextControl = document.getElementById('rev-slider-control-up');
    var prevControl = document.getElementById('rev-slider-control-down');
    nextControl.addEventListener('click', function(){
        clearInterval(autoplayRevSlider);
        if(!window.revolutionSliderAnimating == true) {
            revolveSlides(true, 1);
        }
    });
    prevControl.addEventListener('click', function(){
        clearInterval(autoplayRevSlider);
        if(!window.revolutionSliderAnimating == true) {
            revolveSlides(false, 1);
        }
    });
});
// $(document).on({
//     scroll: function () {
        
//     },
// });
