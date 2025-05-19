import Sound from './sound.mjs';
import Calculator from './calculator.mjs';

export default class AhmadMoosa extends Array {

constructor ( details ) {

super ();

this .path = typeof details ?.path === 'string' ? details .path : '.';
this .calculator = this [ '$#' ] = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

this .$_director = new Sound ( {

path: this .path,
calculator: this .calculator

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

$on ( $, step, length = `1/${ this .length }` ) {

if ( step === undefined )
return this .map ( ( { kit }, step ) => `${ step } ${ kit }` );

if ( isNaN ( step ) )
throw "Note step is required to be a number";

this [ parseInt ( Math .abs ( step ) ) ] = {

kit: $ ( 'kit' ),
length

};

return true;

};

$cut ( $, cut = 2 ) {

const pattern = this .splice ( 0 );

this .$steps = this .length = this .$steps * ( cut = parseFloat ( cut ) );

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

( note, step ) => {

const { kit, length } = note;

$ ( 'kit', kit );

score ( $ ( 'note', step + '/' + this .length, length ) );

} );

score ( '}' );

$ ( 'kit', kit );

return score ();

};

};
