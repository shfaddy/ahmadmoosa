import Sound from './sound.mjs';
import Calculator from './calculator.mjs';

export default class AhmadMoosa extends Array {

constructor ( path = '.' ) {

super ();

this .$_director = new Sound ( path );

this .calculator = this [ '$#' ] = new Calculator ( {

x: 13,
y: 23,
sum: '#x + #y'

} );

};

introduced = false;

$_prompt () {

if ( ! this .introduced )
return this .introduced = true, `Hi there, this is Shaikh Faddy's Ahmad Moosa!
All I can do in life is drumming for you, how may I assist?`;

};

$tempo = 112.5;
$measure = 4;
$steps = this .$measure;
$duration = 3600;

$on ( $, ... argv ) {

if ( ! argv .length )
return this .length = $ .steps, this .join ( '\n' );

this [ parseInt ( argv .shift () ) ] = $ ( 'kit' );

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

$fill ( $, increment = 2 ) {

for ( let step = 0; step < this .length; step += increment )
if ( this [ step ] === undefined )
$ .on ( step );

return $ .on ();

};

$score ( $ ) {

const score = $ [ Symbol .for ( 'director' ) ] .setup .score;
const kit = $ ( 'kit' );

score .clear ();

score ( 't 0', $ .tempo );
score ( 'v', $ .measure );
score ( '{', $ .duration, 'measure' );

this .forEach (

( kit, step ) => {

$ ( 'kit', kit );

score ( $ ( 'note', step / this .length ) );

} );

score ( '}' );

$ ( 'kit', kit );

return score ();

};

};
