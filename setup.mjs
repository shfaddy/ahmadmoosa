import Instrument from './instrument.mjs';
import Option from './option.mjs';
import format from './data/format.mjs';
import type from './data/type.mjs';
import Channels from './channels.mjs';
import ZeroDBFS from './0dbfs.mjs';

export default class Setup extends Map {

$_director () {

const { $ } = this;

return [

[

`sr = ${ $ ( 'rate' ) }`,
`ksmps = ${ $ ( 'control' ) }`,
`nchnls = ${ $ ( 'channels' ) }`,
`0dbfs = ${ $ ( '0dbfs' ) }`,

] .join ( '\n' ),

... this .code

];

};

$format = new Option ( ... format );
$type = new Option ( ... type );

rate = 48000;

$rate ( rate = this .rate ) {

if ( isNaN ( rate ) || rate < 0 )
throw "Sample rate must be a positive number";

return this .rate = parseFloat ( rate );

};

control = 32;

$control ( control = this .control ) {

if ( isNaN ( control ) || ( control = parseInt ( control ) ) < 0 )
throw "Number of Samples in Control Period must be a positive integer";

return this .control = control;

};

$channels = new Channels;

$0dbfs = new ZeroDBFS;

code = [];

async get ( instrument ) {

if ( ! this .has ( instrument ) )
await this .set ( instrument );

return super .get ( instrument );

};

async set ( instrument ) {

let { controller, header, body } = await import ( `./${ instrument }.instr.mjs` );
const code = [];
const name = instrument .replace ( '/', '_' );
const number = this .code .length + 1;

if ( typeof header === 'string' && ( header = header .trim () ) .length )
code .push ( header );

code .push ( `instr ${ number }, ${ name }` );

if ( Object .keys ( controller ) .length )
code .push ( Object .keys ( controller ) .map (

( control, index ) => `iP${ control [ 0 ] .toUpperCase () + control .slice ( 1 ) } init p ( ${ index + 4 } )`

) .join ( '\n' ) );

if ( typeof body === 'string' && ( body = body .trim () ) .length )
code .push ( body );

code .push ( 'endin' );

this .code .push ( code .join ( '\n\n' ) );

return super .set ( instrument, new Instrument ( {

name,
number,
controller

} ) );

};

};
