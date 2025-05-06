export default class AhmadMoosa extends Array {

$tempo = 112.5;
$measure = 4;
$steps = this .$measure;
$duration = 3600;

sound = new Map;

$sound ( $, sound = this .sound .on ) {

if ( sound === undefined )
throw "No sound is designed yet";

if ( ! this .sound .has ( sound ) )
this .sound .set ( sound, new this .constructor .Sound ( sound ) );

this .$_director = this .sound .get ( sound );

return this .sound .on = sound;

};

static Sound = class {

#kit = [

'dom', 'tak', 'sak', 'sik',
'claps', 'sagat',
'beep',
'recorder'

];

$_producer ( $ ) {

for ( const instrument of this .#kit )
$ [ instrument ] = Object .defineProperty ( new this .constructor .Instrument, 'name', { value: instrument } );

};

$note ( $, ... argv ) {

const score = [];

for ( const instrument of this .#kit ) {

const note = $ [ instrument ] .note ( ... argv );

if ( note )
score .push ( note );

}

return score .join ( '\n' );

};

$_director ( $ ) {

return Object .keys ( this )
.map ( direction => direction .slice ( 1 ) )
.map (

instrument => `${ instrument } ${ $ ( instrument ) .join ( ' ' ) }`

);

};

static Instrument = class {

$switch = 'off';

$unison = 1;
$delay = 0;

$length = '1/4';
$p = new this .constructor .Parameters;

$note ( $, step = 0 ) {

if ( $ .switch === 'on' )
return [

`{ ${ $ .unison } unison`,

[

`i "${ this .name }"`,
`[$measure + ${ step } + $unison * ${ $ .delay }]`,
`[${ $ .length }]`,
... Object .values ( $ .p () )

] .join ( ' ' ),

'}'

] .join ( '\n' );

};

$_director ( $ ) {

return [ $ .key, $ .left, $ .right ];

};

static Parameters = class Parameters extends Map {

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

};

};

$on ( $, ... argv ) {

if ( ! argv .length )
return this .length = $ .steps, this .join ( '\n' );

this [ parseInt ( argv .shift () ) ] = $ .sound ();

return $ .on ( ... argv );

};

$cut ( $, cut = 2 ) {

const pattern = this .splice ( 0 );

this .$steps = this .length = pattern .length * ( cut = parseFloat ( cut ) );

pattern .forEach (

( instrument, step ) => ( this [ step * cut ] = instrument )

);

return $ .on ();

};

$format ( $, increment = 2 ) {

for ( let step = 0; step < this .length; step += increment )

if ( this [ step ] === undefined )
this [ step ] = $ .sound ();

return $ .on ();

};

$score ( $ ) {

return [

`t 0 ${ $ .tempo }`,
`v ${ $ .measure }`,
`{ ${ $ .duration } measure`,

... this .map (

( sound, step ) => {

$ .sound ( sound );

return $ ( 'note', step / this .length );

} ),

'}'

] .join ( '\n\n' );

};

};
