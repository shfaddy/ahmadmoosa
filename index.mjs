import Tarabaiza from './tarabaiza.mjs';

export default class AhmadMoosa extends Array {

$tarabaiza = new Tarabaiza;

$tempo = 112.5;
$measure = 4;
$divisions = this .$measure;
$duration = 3600;
$play = 'dom';

$score () {

return [

`t 0 ${ this .$tempo }`,
`v ${ this .$measure }`,
`{ ${ this .$duration } measure`,

... this .map (

( section, step ) => section .split ( '+' ) .map (

instrument => instrument .split ( ':' )

) .map (

( [ instrument, distance ] ) => [

`i "${ instrument }"`,
`[ $measure + ${ step }/${ this .length } ] 1`,
isNaN ( distance ) ? 1 : distance

] .join ( ' ' )

) .join ( '\n' )

),

'}'

] .join ( '\n\n' );

};

$on ( ... argv ) {

if ( ! argv .length )
return this .length = this .$divisions, this .join ( ' / ' );

this [ parseInt ( argv .shift () ) ] = this .$play;

return this .$ ( 'on', ... argv );

};

$cut ( cut = 2 ) {

const pattern = this .splice ( 0 );

this .$divisions = this .length = pattern .length * ( cut = parseFloat ( cut ) );

pattern .forEach (

( instrument, step ) => ( this [ step * cut ] = instrument )

);

return this .join ( ' / ' );

};

$form ( increment = 2 ) {

for ( let step = 0; step < this .length; step += increment )

if ( this [ step ] === undefined )
this [ step ] = this .$play;

};

$mix = new AhmadMoosa .Mixer;

static Mixer = class Mixer {

$_director ( ... argv ) {

if ( ! argv .length )
throw "What do you want to mix?";

const instrument = argv .shift ();
const direction = '$' + instrument;


if ( ! Object .hasOwn ( direction ) )
this [ direction ] = 1;

return this .$ ( instrument, ... argv );

};

};

};
