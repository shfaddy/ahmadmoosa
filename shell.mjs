#!/usr/bin/env node

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

if ( argv .length )
$ [ Symbol .for ( 'process' ) ] ( argv .join ( ' ' ) );

this .prompt ();

};

async $_enter ( $, ... argv ) {

await new Promise ( resolve => {

this .resolve = resolve;

this .shell .write ( argv .join ( ' ' ) + '\n' );

} );

};

async $_process ( $, line, print ) {

if ( this .synthesizer )
return false;

if ( print === true )
console .log ( line );

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

async $play ( $ ) {

if ( this .synthesizer )
throw "Synthesizer is already playing";

await writeFile ( this .$project + '.sco', $ [ Symbol .for ( 'director' ) ] ( 'score' ), 'utf8' );

this .synthesizer = spawn ( 'csound', [

`${ this .$directory }/index.csd`,
`--omacro:directory=${ process .cwd () }`,
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

const file = await readFile ( path, 'utf8' ) .then (

file => file .split ( '\n' )
.map ( line => line .trim () )
.filter ( line => line .length )

);

for ( const line of file )
await $ ( Symbol .for ( 'process' ), line, true );

};

prompt ( $ ) {

const prompt = this .processor ( Symbol .for ( 'prompt' ) );

this .shell .setPrompt ( ( typeof prompt === 'string' ? prompt : '' ) + ': ' );

this .shell .prompt ();

};

} ( ... process .argv .slice ( 2 ) ) );
