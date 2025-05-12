export default class Parameters extends Map {

$_director ( $, key, value ) {

if ( key === undefined )
return $ .list ();

if ( value === undefined )

if ( ! this .has ( key ) )
throw "Unknown parameter";

else
return this .get ( key );

this .set ( key, isNaN ( value ?.[ 0 ] ) ? `"${ value }"` : `[${ value }]` );

return $ ( key );

};

$list ( $ ) {

const list = {};

for ( const [ key, value ] of this )
list [ key ] = value;

return list;

};

};
