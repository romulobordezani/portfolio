'use strict';
angular.module('mdParallax', []).directive('mdParallax', [
    '$window', 'Utils', function ($window, Utils) {

        return {

            restrict: 'A',

            scope: {
                parallaxCss: '@',
                parallaxInitVal: '@',
                parallaxInitValXs: '@',
                parallaxInitValSm: '@',
                parallaxInitValMd: '@',
                parallaxInitValLg: '@',
                parallaxMaxVal: '@',
                parallaxRatio: '@',
                parallaxScroller: '@'
            },

            link: function(iScope, iElem) {

                var cssKey,
                    cssValue,
                    isSpecialVal,
                    parallaxCssVal,
                    parallaxRatio,
                    parallaxScroller,
                    parallaxInitVal,
                    parallaxMaxVal,
                    cssValArray,
                    toFirefoxParallaxInitVal,
                    pureCssVal,
                    width;

                parallaxCssVal = iScope.parallaxCss ? iScope.parallaxCss : 'top';
                cssValArray = parallaxCssVal.split(':');
                pureCssVal = iScope.parallaxCss;
                cssKey = cssValArray[0];
                cssValue = cssValArray[1];
                width = Utils.getBootstrapGridSize();

                isSpecialVal = cssValue ? true : false;

                if (!cssValue) {
                    cssValue = cssKey;
                }

                parallaxRatio = iScope.parallaxRatio ? +iScope.parallaxRatio : 1.1;

                if( iScope.parallaxInitValXs && width === 'xs' ){
                    parallaxInitVal = +iScope.parallaxInitValXs;
                }else if(iScope.parallaxInitValSm && width === 'sm'  ){
                    parallaxInitVal = +iScope.parallaxInitValSm;
                }else if(iScope.parallaxInitValMd && width === 'md' ){
                    parallaxInitVal = +iScope.parallaxInitValMd;
                }else if( iScope.parallaxInitValLg && width === 'lg' ){
                    parallaxInitVal = +iScope.parallaxInitValLg;
                }else{
                    parallaxInitVal = +iScope.parallaxInitVal || 0;

                }

                parallaxMaxVal  = iScope.parallaxMaxVal ? parseInt( iScope.parallaxMaxVal, 10 ) : null;
                parallaxScroller = iScope.parallaxScroller;
                var trueWindow = document.getElementById(parallaxScroller) || $window ;

                if( pureCssVal === 'background-position-y' ) {
                    cssKey = 'background-position';
                    toFirefoxParallaxInitVal = 'center ' + parallaxInitVal + 'px';

                }else if(pureCssVal === 'opacity'){
                    toFirefoxParallaxInitVal = parallaxInitVal;
                }else{
                    toFirefoxParallaxInitVal = parallaxInitVal + 'px';
                }

                iElem.css( cssKey, toFirefoxParallaxInitVal );



                function _onScroll() {

                    var resultVal;

                    var calcVal = trueWindow.scrollTop * parallaxRatio + parallaxInitVal;

                    if ( calcVal >= parallaxMaxVal && parallaxMaxVal !== null ){
                        calcVal = parallaxMaxVal;
                    }

                    if (isSpecialVal) {
                        resultVal = '' + cssValue + '(' + calcVal + 'px)';
                    } else {
                        resultVal = calcVal + 'px';
                    }

                    if( pureCssVal === 'background-position-y' ){
                        cssKey = 'background-position';
                        resultVal = 'center ' + resultVal;
                    }else if( pureCssVal === 'opacity' ) {
                        resultVal = 1 - ( calcVal / 500 ) ;
                    }

                    iElem.css(cssKey, resultVal);

                }



                if( window.screen.width > 768 ){
                    trueWindow.addEventListener('scroll', _onScroll);
                }

            }
        };
    }
]);
