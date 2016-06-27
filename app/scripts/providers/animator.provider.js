'use strict';
/*jshint unused:false*/
/**
 * Based in http://javascript.info/tutorial/animation
 * Thanks Kantor! ( Ilya Kantor, 2011. ) - It's works...
 */
angular.module('rbApp')
    .provider('Animator', [function(){

            this.$get = function() {

                function elastic(progress) {
                    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress);
                }

                function linear(progress) {
                    return progress;
                }

                function quad(progress) {
                    return Math.pow(progress, 2);
                }

                function quint(progress) {
                    return Math.pow(progress, 5);
                }

                function circ(progress) {
                    return 1 - Math.sin(Math.acos(progress));
                }

                function back(progress) {
                    return Math.pow(progress, 2) * ((1.5 + 1) * progress - 1.5);
                }

                function bounce(progress) {
                    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                        if (progress >= (7 - 4 * a) / 11) {
                            return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                        }
                    }
                }

                function makeEaseInOut(delta) {
                    return function (progress) {
                        if (progress < 0.5){
                            return delta(2 * progress) / 2;
                        }else{
                            return (2 - delta(2 * (1 - progress))) / 2;
                        }
                    };
                }

                function makeEaseOut(delta) {
                    return function (progress) {
                        return 1 - delta(1 - progress);
                    };
                }

                var quadEaseOut = makeEaseOut(quint);


                function animate(opts) {

                    var start = new Date();
                    var intervalId = setInterval(function () {

                        var timePassed = new Date() - start;
                        var progress = timePassed / opts.duration;

                        if (progress > 1) {
                            progress = 1;
                        }

                        var delta = opts.delta(progress);

                        opts.step(delta);

                        if (progress === 1) {
                            clearInterval(intervalId);
                        }

                    }, opts.delay || 10);

                }


                function scrollToTabTop(){

                    var trueWindow = document.getElementById('ngview-container'),
                        windowWidth = window.screen.width,
                        to,
                        startedScroll = trueWindow.scrollTop;

                    if( windowWidth >= 960 ){
                        to = 400;
                    }

                    if( windowWidth >= 1200 ){
                        to = 430;
                    }

                    if( windowWidth < 960 ){
                        to = 290;
                    }

                    if( startedScroll === to ){
                        return false;
                    }

                    animate({

                        delay : 10,
                        duration : 666,
                        delta : quadEaseOut,

                        step : function(delta) {
                            var finalTo = ( to * delta );
                            if( finalTo > startedScroll ){
                                trueWindow.scrollTop = Math.ceil(finalTo);
                            }
                        }

                    });

                }


                function scrollTo(element, to, duration) {
                    if (duration <= 0) {
                        return;
                    }
                    var difference = to - element.scrollTop;
                    var perTick = difference / duration * 10;

                    setTimeout(function() {
                        element.scrollTop = element.scrollTop + perTick;
                        if (element.scrollTop === to) {
                            return;
                        }
                        scrollTo(element, to, duration - 10);
                    }, 10);
                }


                return {
                    scrollToTabTop : scrollToTabTop,
                    scrollTo : scrollTo
                };

            };


    }]
);
