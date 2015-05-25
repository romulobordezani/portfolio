'use strict';
angular.module('rbApp').factory(
    'transformRequestAsFormPost',
    function() {

        function serializeData( data ) {

            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data === null ) ? '' : data.toString() );
            }

            var buffer = [];

            // Serialize each key in the object.
            for ( var name in data ) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[ name ];

                buffer.push(
                    encodeURIComponent( name ) +
                    '=' +
                    encodeURIComponent( ( value === null ) ? '' : value )
                );

            }

            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                    .join( '&' )
                    .replace( /%20/g, '+' )
                ;

            return( source );

        }

        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=iso-8859-1';
            return( serializeData( data ) );
        }

        return( transformRequest );

    }
);
