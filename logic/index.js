import Tarabaiza from 'ahmadmoosa/tarabaiza'
import Calculator from 'ahmadmoosa/calculator'

export default class AhmadMoosa extends Array {

constructor ( details ) {

super ();

this .path = typeof details ?.path === 'string' ? details .path : '.';
this .calculator = this [ '$#' ] = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

this .$_director = new Tarabaiza ( {

path: this .path,
calculator: this .calculator

} );

};

$_producer ( $ ) {

[

'# tempo = 112.5',
'# measure = 4',
'# steps = 4',
'# duration = 60',
'# delay = 0',
'# length = 1'

] .forEach ( line => $ [ '#' ] ( ... line .trim () .split ( /\s+/ ) ) );

};

introduced = false;

$_prompt () {

if ( ! this .introduced )
return this .introduced = true, `Hi there, this is Shaikh Faddy's Ahmad Moosa!
All I can do in life is drumming for you, how may I assist?`;

};

$on ( $, ... argv ) {

if ( ! argv .length )
return this .map ( ( { band }, step ) => `${ step } ${ band }` );

const step = argv .shift ();

if ( isNaN ( step ) )
throw "Note step is required to be a number";

this [ parseInt ( Math .abs ( step ) ) ] = $ ( 'band' );

return $ .on ( ... argv );

};

$cut ( $, cut = 2 ) {

const pattern = this .splice ( 0 );

this .length = $ [ '#' ] ( 'steps', '*', ( cut = parseFloat ( cut ) ) );

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

const score = $ [ Symbol .for ( 'director' ) ] .synthesizer .score;
const band = $ ( 'band' );

score .clear ();

score ( 't 0', $ [ '#' ] ( 'tempo' ) );
score ( 'v', $ [ '#' ] ( 'measure' ) );
score ( '{', $ [ '#' ] ( 'duration' ), 'measure' );

this .forEach (

( band, step ) => {

$ ( 'band', band );

score ( $ ( 'note', step + '/' + this .length ) );

} );

score ( '}' );

$ ( 'band', band );

return score ();

};

};
