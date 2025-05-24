import Instrument from './instrument.js';
import Option from './option.js';
import format from './data/format.js';
import type from './data/type.js';
import Channels from './channels.js';
import ZeroDBFS from './0dbfs.js';
import Score from './score.js';
import Calculator from 'ahmadmoosa/calculator'

export default class Synthesizer extends Map {

constructor ( details ) {

super ();

this .path = typeof details ?.path === 'string' ? details .path : '.';
this .calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

};

$options ( $ ) {

const options = [];
const output = [];
const sample = [];
const file = $ ( 'title' ) || 'dac';
const format = $ ( 'format' );
const type = $ ( 'type' );

if ( file !== undefined )
output .push ( file );

if ( format !== undefined )
output .push ( format ),
sample .push ( format );

if ( type !== undefined )
sample .push ( type );

if ( output .length )
options .push (

`-o ${ output .join ( '.' ) }`,
`--logfile=${ output [ 0 ] }.csl`

);

if ( sample .length )
options .push ( '--format=' + sample .join ( ':' ) );

return options .join ( '\n' );

};

$orchestra ( $ ) {

return [

[

`sr = ${ $ ( 'rate' ) }`,
`ksmps = ${ $ ( 'control' ) }`,
`nchnls = ${ $ ( 'channels' ) }`,
`0dbfs = ${ $ ( '0dbfs' ) }`,

] .join ( '\n' ),

'gaNote [] init nchnls',

new Array ( $ ( 'channels' ) ) .fill ( true ) .map ( ( _, channel, mixer ) => {

mixer .instance = (

mixer .instance = mixer .instance === undefined ? 0 : ++mixer .instance

) % 10 === 0 ? ++mixer .instance : mixer .instance;

return `alwayson 1.${ mixer .instance }, ${ channel }`;

} ) .join ( '\n' ),

`instr 1

aNote clip gaNote [ p4 ], 1, 0dbfs

outch p4 + 1, aNote

gaNote [ p4 ] = 0

endin`,

... this .code

] .join ( '\n\n' );

};

$format = new Option ( format );

$type = new Option ( type );

rate = 48000;

$rate ( $, rate = this .rate ) {

if ( isNaN ( rate ) || rate < 0 )
throw "Sample rate must be a positive number";

return this .rate = parseFloat ( rate );

};

control = 32;

$control ( $, control = this .control ) {

if ( isNaN ( control ) || ( control = parseInt ( control ) ) < 0 )
throw "Number of Samples in Control Period must be a positive integer";

return this .control = control;

};

$channels = new Channels;

$0dbfs = new ZeroDBFS;

$score = new Score;

$document ( $, ... score ) {

return [

'<CsoundSynthesizer>',

'<CsOptions>',

$ ( 'options' ),

'</CsOptions>',

'<CsInstruments>',

$ ( 'orchestra' ),

'</CsInstruments>',

'<CsScore>',

$ ( 'score' ),

'</CsScore>',

'</CsoundSynthesizer>'

] .join ( '\n\n' );

};

code = [];

async get ( instrument ) {

if ( ! this .has ( instrument ) )
await this .set ( instrument );

return super .get ( instrument ) .produce ();

};

async set ( instrument ) {

let { controller, header, body, mix } = await import ( `${ this .path }/${ instrument }.instr.js` );
const code = [];
const name = instrument .replace ( '/', '_' );
const number = this .code .length + 2;

if ( typeof header === 'string' && ( header = header .trim () ) .length )
code .push ( header );

code .push ( `instr ${ number }, ${ name }` );

if ( mix === true && typeof controller === 'object' )
controller = Object .assign ( {

channel: 0,
amplitude: 0

}, controller );

if ( typeof controller === 'object' && Object .keys ( controller ) .length )
code .push ( Object .keys ( controller ) .map (

( control, index ) => `iP${ control [ 0 ] .toUpperCase () + control .slice ( 1 ) } init p ( ${ index + 4 } )`

) .join ( '\n' ) );

if ( typeof body === 'string' && ( body = body .trim () ) .length )
code .push ( body );

if ( mix === true )
code .push ( Synthesizer .mixer );

code .push ( 'endin' );

this .code .push ( code .join ( '\n\n' ) );

return super .set ( instrument, new Instrument ( {

name,
number,
controller,
calculator: this .calculator

} ) );

};

static mixer = `

aNote clip aNote, 1, 0dbfs

gaNote [ p4 ] = gaNote [ p4 ] + aNote * iPAmplitude

` .trim ();

};
