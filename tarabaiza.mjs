import Nota from './nota.mjs';
import Setup from './setup.mjs';
import Clock from './clock.mjs';

export default class Tarabaiza extends Nota {

constructor ( details ) {

super ( details );

this .$setup = details ?.setup || new Setup;
this .$clock = details ?.clock || new Clock;

};

$options ( $ ) {

const options = [];
const output = [];
const sample = [];
const file = $ ( 'title' ) || 'dac';
const format = $ .setup ( 'format' );
const type = $ .setup ( 'type' );

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

$document ( $ ) {

return [

'<CsoundSynthesizer>',

'<CsOptions>',

$ ( 'options' ),

'</CsOptions>',

'<CsInstruments>',

... $ ( 'setup' ),

'</CsInstruments>',

'</CsoundSynthesizer>'

] .join ( '\n\n' );

};

};
