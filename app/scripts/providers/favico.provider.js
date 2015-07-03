'use strict';

angular.module('rbApp')
    .provider('favicoProvider', [
        function() {

            this.$get = function() {

                var favico = new Favico({
                    animation : 'none'
                });

                var badge = function(num) {
                    favico.badge(num);
                };

                var reset = function() {
                    favico.reset();
                };

                var setImage = function(image) {
                    favico.image(image);
                };


                var faviconManager = {

                    faviconEvenOdd : false,

                    blow : function(){

                        var faviconInterval = setInterval( faviconManager.reloadFavicon, 200 );

                        setTimeout( function(){
                            clearInterval( faviconInterval);
                        }, 2000 ) ;

                    },

                    reloadFavicon : function(){

                        var image;
                        faviconManager.faviconEvenOdd = !faviconManager.faviconEvenOdd;

                        if( faviconManager.faviconEvenOdd ){
                            image = document.getElementById('cock1');
                        }else{
                            image = document.getElementById('cock2');
                        }

                        setImage(image);

                    }

                };

                return {
                    badge : badge,
                    reset : reset,
                    setImage : setImage,
                    blow : faviconManager.blow
                };

            };

        }
    ]
);
