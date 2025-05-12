export default class Calculator extends Set {

constructor ( descriptor = {} ) {

super ();

this .descriptor = descriptor;

};

$_producer ( $ ) {

switch ( typeof this .descriptor ) {

case 'object':

return Object .entries ( this .descriptor ) .forEach ( ( [ calculator, descriptor ] ) => {

switch ( typeof descriptor ) {

case 'string':

return $ .$ ( calculator, ... descriptor .trim () .split ( /\s+/ ) );

default:

return $ [ '#' ] ( calculator, new this .constructor ( descriptor ) );

}



} );

case 'string':
case 'number':

return $ [ '=' ] ( this .descriptor .toString () );

}

};

result = 0;

$_director ( $, ... argv ) {

if ( ! argv .length )
return this .result;

if ( ! this .has ( argv [ 0 ] ) )
throw "Unknown calculator";

return $ [ Symbol .for ( 'calculator/' + argv .shift () ) ] ( ... argv );

};

[ '$=' ] ( $, ... argv ) {

this .result = $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

$_parse ( $, input ) {

if ( input === '$' )
return this .result;

if ( input .startsWith ( '#' ) )
return $ ( ... input .slice ( 1 ) .split ( '/' ) );

if ( input .startsWith ( '$' ) )
return $ .$ ( input .slice ( 1 ) );

if ( isNaN ( input ) )
throw "Invalid numeric input";

return parseFloat ( input );

};

[ '$#' ] ( $, ... argv ) {

if ( ! argv .length )
throw "New calculator name is missing";

const calculator = argv .shift ();

this [ '$_calculator/' + calculator ] = argv [ 0 ] instanceof this .constructor ? argv .shift () : new this .constructor;

this .add ( calculator );

return $ [ Symbol .for ( 'calculator/' + calculator ) ] ( ... argv );

};

[ '$+' ] ( $, ... argv ) {

this .result += $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

[ '$-' ] ( $, ... argv ) {

this .result -= $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

[ '$*' ] ( $, ... argv ) {

this .result *= $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

[ '$/' ] ( $, ... argv ) {

this .result /= $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

[ '$**' ] ( $, ... argv ) {

this .result **= $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

[ '$%' ] ( $, ... argv ) {

this .result %= $ [ Symbol .for ( 'parse' ) ] ( argv .shift () );

return $ ( ... argv );

};

static #binder = Symbol ();

$fetch ( $, ... argv ) {

if ( argv .length && argv .shift () !== this .constructor .#binder )
argv .splice ( 0 );

return [

this .result,
... [ ... this ] .map (

calculator => `#${ [ ... argv, calculator ] .join ( '/' ) } = ${ $ [ Symbol .for ( 'calculator/' + calculator ) ] .fetch ( this .constructor .#binder, ... argv, calculator ) .join ( '\n' ) }`

),
... $ .$ ()

];

};

formula = new Map;

$$ ( $, formula, ... equation ) {

if ( formula === undefined )
return [ ... this .formula ] .map (

( [ formula, equation ] ) => `$${ formula } = ${ equation .join ( ' ' ) }`

);

if ( ! equation .length && ! this .formula .has ( formula ) )
throw "Unknown formula";

if ( ! equation .length )
return $ [ '=' ] ( ... this .formula .get ( formula ) );

this .formula .set ( formula, equation );

return true;

};

};
