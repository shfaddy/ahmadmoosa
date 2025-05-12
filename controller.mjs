import Calculator from './calculator.mjs';

export default class Controller extends Map {

constructor ( controls, calculator = new Calculator ) {

super ( Object .entries ( controls ) );

this .$calculator = calculator;

};

$_director ( $ ) {

return [ ... this ] .map (

control => control .join ( ' = ' )

);

};

$control ( $, control, value ) {

if ( control === undefined )
return $ ();

if ( ! this .has ( control ) )
throw "Unknown control";

if ( value !== undefined )
this .set ( control, value );

return this .get ( control );

};

$calculate ( $, control, ... equation ) {

if ( control === undefined )
return $ ();


this .set ( control, equation );

};

$parameters ( $ ) {

return [ ... this ] .map (

( [ control, value ] ) => {

if ( value instanceof Array )
value = $ .calculator ( ... value );

return isNaN ( `${ value }` [ 0 ] ) ? `"${ value }"` : `[${ value }]`

}

);

};

};
