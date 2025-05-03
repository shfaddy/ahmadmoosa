export default class Nota extends Map {

constructor ( details ) {

super ();

this .binder = details ?.binder;
this .title = details ?.title instanceof Array ? details .title : [];

};

$_prompt ( $ ) { return $ .title () };

separator = '.';

$title ( $, title ) {

if ( title === undefined )
return this .title .join ( this .separator );

this .title .pop ();
this .title .push ( title );

return $ .title ();

};

$_director ( $, ... argv ) {

if ( ! argv .length )
return $;

if ( $ [ Symbol .for ( argv [ 0 ] ) ] )
return $ ( Symbol .for ( argv .shift () ), ... argv );

};

$nota ( $, title ) {

if ( title === undefined )
throw "Nota title is required";

if ( ! this .has ( title ) )
$ [ Symbol .for ( title ) ] = this .set ( title, new this .constructor ( {

binder: $,
title: [ ... this .title, title ],
setup: $ .setup,
clock: $ .clock

} ) ) .get ( title );

return $ [ Symbol .for ( title ) ];

};

[ '$..' ] ( $, ... argv ) {

return this .binder || $;

};

switch = true;

$switch () {

return ( this .switch = ! this .switch ) ? 'on' : 'off';

};

};
