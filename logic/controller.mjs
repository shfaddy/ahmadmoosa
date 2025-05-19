import Calculator from './calculator.mjs';

export default class Controller extends Map {

constructor ( details ) {

super ( typeof details ?.controls === 'object' ? Object .entries ( details .controls ) : undefined );

this .calculator = this .$_calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

};

$_director ( $ ) {

return [ ... this ] .map (

control => control .join ( ' = ' )

);

};

$control ( $, control, ... value ) {

if ( control === undefined )
return $ ();

if ( ! this .has ( control ) )
throw "Unknown control";

if ( value .length )
this .set ( control, value .join ( ' ' ) );

return this .get ( control );

};

$parameters ( $ ) {

return [ ... this ]
.map ( ( [ control, value ] ) => {

if ( typeof value === 'string' && value .startsWith ( '# ' ) )
value = $ [ Symbol .for ( 'calculator' ) ] ( ... value .slice ( 2 ) .split ( ' ' ) );

return isNaN ( `${ value }` [ 0 ] ) ? `"${ value }"` : `[${ value }]`

} );

};

};
