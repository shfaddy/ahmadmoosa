import Orchestra from './orchestra.mjs';
import File from './file.mjs';
import Kit from './kit.mjs';

export default class Tarabaiza extends Map {

$orchestra = new Orchestra;

$file = new File;

$_producer () {

this .$ .kit = 'shfaddys';

};

get $kit () {

return this .kit;

};

set $kit ( kit ) {

if ( ! this .has ( kit ) )
this .set ( kit, new Kit ( this .$orchestra ) );

return this .$_director = this .get ( this .kit = kit );

};

$options () {

const { $ } = this;
const options = [];
const output = [];
const sample = [];
const file = $ ( 'file' );
const format = $ .sample ( 'format' );
const type = $ .sample ( 'type' );

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

$document () {

const { $ } = this;

return [

'<CsoundSynthesizer>',

'<CsOptions>',

$ ( 'options' ),

'</CsOptions>',

'<CsInstruments>',

... $ ( 'orchestra' ),

'</CsInstruments>',

'</CsoundSynthesizer>'

] .join ( '\n\n' );

};

};
