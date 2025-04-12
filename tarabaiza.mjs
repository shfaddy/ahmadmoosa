export default class Tarabaiza extends Array {

score = []
section = [];

$_director ( ... argv ) {

if ( ! argv .length )
return JSON .stringify ( this );

};

$note ( ... argv ) {

this .forEach (

note => this .section .push ( [ 'i', ... Object .values ( note ) ] .join ( ' ' ) )

);

return this .$ ( ... argv );

};

$options = new class extends Array {

$_director ( ... argv ) {

this .push ( ... argv );

return this .join ( '\n' );

};

};

$configure = new class {

$sr = 48000;
$ksmps = 32;
$nchnls = 2;
$0dbfs = 1;

};

measure = 1;

get $measure () { return this .measure };

set $measure ( measure ) {

this .section .push (

`; #tarabaiza/measure ${ this .measure = parseFloat ( measure ) }`,
`v ${ this .measure }`

);

};

cursor = 0;

get $cursor () { return this .cursor };

set $cursor ( cursor ) {

this .section .push (

`; #tarabaiza/cursor ${ this .cursor += parseInt ( cursor ) }`,
`b ${ this .cursor }`

);

};

get $time () { return this .$measure * this .$cursor };

clock = new Map;

mark = 'zero';

get $mark () { return this .mark };

set $mark ( mark ) {

if ( ! this .clock .has ( mark ) )
this .clock .set ( mark, this .cursor );

const cursor = this .clock .get ( this .mark = mark );

this .cursor = isNaN ( cursor ) ? this .cursor : cursor;

};

tempo = {};

get $tempo () { return Object .keys ( this .tempo ) .map (

measure => `${ this .measure * measure } ${ this .tempo [ measure ] }`

) .join ( ' ' ) };

set $tempo ( tempo ) {

this .tempo [ this .cursor ] = parseFloat ( tempo );

};

program = new Map;

$program = 'default';

$controller = new class {

$delay = 0;
$duration = 0;
$channel = 1;
$key = 60;
$velocity = 0;

$_director ( ... argv ) {

if ( ! argv .length )
return Object .keys ( this )
.filter ( controller => ! controller .startsWith ( '$_' ) )
.map (

controller => `${ controller .slice ( 1 ) } ${ this [ controller ] }`

) .join ( '\n' );

const controller = argv .shift ();

this [ '$' + controller ] = 0;

return this .$ ( controller, ... argv );

};

};

async $put ( ... argv ) {

if ( ! argv .length )
return this .join ();

const instrument = await this .closet .get ( argv .shift () );

if ( ! this .program .has ( this .$program ) )
this .program .set ( this .$program, [] );

const program = this .program .get ( this .$program );

program .push ( Object .assign ( {

$instrument: `${ instrument .number }.${ ++instrument .instance % 10 === 0 ? ++instrument .instance : instrument .instance }`

}, this .$controller ) );

return this .$ ( 'put', ... argv );

};

join ( separator = '\n' ) {

this .splice ( 0, this .length, ... this .program .get ( this .$program ) );

return [ ... this .map (

note => `${ Object .values ( note ) .join ( ' ' ) }`

) ] .join ( separator );

};

closet = new class extends Map {

directory = new URL ( import .meta .url ) .pathname .split ( '/' ) .slice ( 0, -1 ) .join ( '/' );
code = [];

async get ( instrument ) {

if ( ! this .has ( instrument ) )
await this .set ( instrument );

return super .get ( instrument );

};

async set ( instrument ) {

let { header, body } = await import ( `${ this .directory }/kit/${ instrument }.mjs` );
const code = [];
const number = this .code .length + 1;

if ( typeof header === 'string' && ( header = header .trim () ) .length )
code .push ( header );

code .push ( `instr ${ number }, ${ instrument }` );

if ( typeof body === 'string' && ( body = body .trim () ) .length )
code .push ( body );

code .push ( 'endin' );

this .code .push ( code .join ( '\n\n' ) );

return super .set ( instrument, { name: instrument, number, instance: 0 } );

};

};

$write () {

return [

'<CsoundSynthesizer>',

'CsOptions>',

this .$options .join ( '\n' ),

'</CsOptions>',

'<CsInstruments>',

Object .keys ( this .$configure ) .map (

variable => `${ variable .slice ( 1 ) } = ${ this .$configure [ variable ] }`

) .join ( '\n' ),

... this .closet .code,

'</CsInstruments>',

'/CsoundSynthesizer>'

] .join ( '\n\n' );

};

};
