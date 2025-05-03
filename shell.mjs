import AhmadMoosa from './index.mjs';
import Scenarist from './scenarist.mjs';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { parse } from 'node:path';

Scenarist ( new class {

$_director = new AhmadMoosa;

$project = '';
$directory = parse ( new URL ( import .meta .url ) .pathname ) .dir

constructor ( ... argv ) { this .argv = argv };

async $_producer ( $ ) {

const { argv } = this;

this .processor = $;

this .shell = createInterface ( { input, output } )
.on ( 'line', line => $ ( Symbol .for ( 'process' ), line ) )
.on ( 'SIGINT', () => $ ( Symbol .for ( 'interrupt' ) ) );

this .prompt ();

if ( argv .length )
$ [ Symbol .for ( 'enter' ) ] ( ... argv );

};

async $_enter ( $, ... argv ) {

await new Promise ( resolve => {

this .resolve = resolve;

this .shell .write ( argv .join ( ' ' ) + '\n' );

} );

delete this .resolve;

};

async $_process ( $, line ) {

if ( this .synthesizer )
return false;

try {

const argv = line .trim () .split ( /\s+/ );
const resolution = await this .processor ( ... argv );

switch ( typeof resolution ) {

case 'undefined':

break;

case 'object':

if ( resolution instanceof Array )
console .log ( resolution .join ( '\n' ) );

else
for ( const output in resolution )
console .log ( output, resolution [ output ] );

break;

case 'function':

this .processor = resolution;

break;

default:

console .log ( resolution );

}

} catch ( error ) {

console .error ( error );

}

this .prompt ();

if ( this .resolve )
this .resolve ();

};

$_interrupt () {

if ( ! this .synthesizer )
return this .shell .close ();

this .synthesizer .kill ();

this .prompt ();

};

async $score () {

if ( this .synthesizer )
throw "Synthesizer is already playing";

await writeFile ( this .$project + '.sco', $ [ Symbol .for ( 'director' ) ] ( 'score' ), 'utf8' );

this .synthesizer = spawn ( 'csound', [

`${ this .$directory }/index.csd`,
`--smacro:score=${ this .$project }.sco`

], {

stdio: 'inherit'

} );

return await new Promise (

( resolve, reject ) => this .synthesizer .on ( 'exit',

code => {

delete this .synthesizer;

return resolve ( "Okay" )

} )

);

};

async $read ( $, path ) {

for ( const line of await readFile ( path, 'utf8' ) .then (

file => file .split ( '\n' )
.map ( line => line .trim () )
.filter ( line => line .length )

) ) {

await $ ( Symbol .for ( 'enter' ), line );

}

};

prompt () {

const prompt = this .processor ( Symbol .for ( 'prompt' ) );

this .shell .setPrompt ( ( typeof prompt === 'string' ? prompt : '' ) + ': ' );

this .shell .prompt ();

};

} ( ... process .argv .slice ( 2 ) ) );
