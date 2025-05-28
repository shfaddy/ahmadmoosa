import Calculator from 'ahmadmoosa/calculator';

export default class Musician extends Map {

constructor ( details ) {

super ();

this .name = details .name;
this .instrument = details .instrument;
this .number = details .number;
this .$_director = details .controller;
this .$_calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

};

get $instrument () {

return this .instrument;

};

get $number () {

return this .number;

};

delay = '0';

$delay ( $, delay = this .delay ) {

if ( isNaN ( delay [ 0 ] ) )
throw this .instrument + " Delay is required to be a number: " + delay .toString ();

return this .delay = delay;

};

length = '1/4';

$length ( $, length = this .length ) {

if ( isNaN ( length [ 0 ] ) )
throw "Note length is required to be a number";

return this .length = length;

};

$note ( $, step = 0 ) {

const delay = `(${ $ ( 'delay' ) } * ${ $ [ Symbol .for ( 'calculator' ) ] ( 'delay' ) })`;
const length = `(${ $ ( 'length' ) } * ${ $ [ Symbol .for ( 'calculator' ) ] ( 'length' ) })`;

return [

`i ${ this .number }`,
`[$measure + ${ step } + ${ delay }]`,
`[${ length }]`,
... $ ( 'parameters' )

] .join ( ' ' );

};

};
