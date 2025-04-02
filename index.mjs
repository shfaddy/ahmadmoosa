new class Rhythm extends Array {

depth = 0;
increment = 2;
octave = 2;
range = 4;

tempo = 105;
measure = 4;
duration = 3600;

constructor ( ... argv ) {

super ();

this .argv = argv;

this .setup ();

this .form = this .argv .join ( ' ' ) .split ( ' / ' );
this .length = 2 ** ( this .form .length + 1 );
this .base = this .measure;

this .structure ();

this .unshift (

`t 0 ${ this .tempo }`,
`v ${ this .measure }`,
`{ ${ this .duration } measure`

);

this .push ( '}' );

console .log ( this .join ( '\n' ) );

};

setup () {

if ( ! Object .hasOwn ( this, this .argv [ 0 ] ) )
return;

this [ this .argv .shift () ] = parseFloat ( this .argv .shift () );

return this .setup ();

};

structure ( ... argv ) {

if ( ! this .form .length )
return;

const note = this .form .shift () .split ( ' ' );

this .instrument = note .shift () .split ( '+' );
this .steps = note .length ? note .join ( ' ' ) .split ( ' + ' ) : [];

if ( ! this .steps .length )
for ( let step = 0; step < this .base; step += 2 )
if ( this [ step * this .length / this .base ] === undefined )
this .steps .push ( '' + step );

this .level ();

this .base *= 2;

return this .structure ();

};

level () {

if ( ! this .steps .length )
return;

const note = this .steps .shift () .split ( ' ' );
const step = parseFloat ( note .shift () ) * this .length / this .base;

this [ step ] = [];

for ( const instrument of this .instrument )
this [ step ] .push ( [

`i "${ instrument }"`,
`[ $measure + ${ step }/${ this .length } ] 1`,
... note

] .join ( ' ' ) );

this [ step ] = this [ step ] .join ( '\n' );

return this .level ();

};

} ( ... process .argv .slice ( 2 ) );
