export default class Musician extends Map {

constructor ( details ) {

super ();

this .name = details .name;
this .instrument = details .instrument;
this .number = details .number;
this .$_director = details .controller;

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

$note ( $, step = 0, length = this .length, ... parameters ) {

return [

`i ${ this .number }`,
`[$measure + ${ step } + ${ $ ( 'delay' ) }]`,
`[${ length }]`,
... parameters .length ? parameters : $ ( 'parameters' )

] .join ( ' ' );

};

};
