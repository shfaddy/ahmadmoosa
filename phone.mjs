export default class Phone {

constructor ( details ) {

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

$delay = 0;
length = '1/4';

$length ( $, length = this .length ) {

if ( isNaN ( length [ 0 ] ) )
throw "Note length is required to be a number";

return this .length = length;

};

$note ( $, step = 0 ) {

return [

`i ${ this .number }`,
`[$measure + ${ step } + ${ $ .delay }]`,
`[${ $ ( 'length' ) }]`,
... $ ( 'parameters' )

] .join ( ' ' );

};

};
