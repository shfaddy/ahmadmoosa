#!/usr/bin/env node

import AhmadMoosa from 'ahmadmoosa';
import Scenarist from 'ahmadmoosa/scenarist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { parse } from 'node:path';

Scenarist ( new class {

$_director = new AhmadMoosa ( {

path: process .cwd ()

} );

constructor ( ... argv ) { this .argv = argv };

$_producer ( $ ) {

const { argv } = this;

this .shell = createInterface ( { input, output } )
.on ( 'line', line => $ ( Symbol .for ( 'process' ), line ) )
.on ( 'SIGINT', () => $ ( Symbol .for ( 'interrupt' ) ) );

if ( argv .length )
$ [ Symbol .for ( 'process' ) ] ( argv .join ( ' ' ) )

else
$ [ Symbol .for ( 'prompt' ) ] ();

};

async $_process ( $, line ) {

if ( this .synthesizer )
return false;

const ticket = this .ticket = new Promise ( async resolve => {

let done = false;

try {

const argv = ( line = line .trim () ) .length ? line .split ( /\s+/ ) : [];
const resolution = await $ ( ... argv );

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

$ [ Symbol .for ( 'director' ) ] = resolution;

break;

default:

console .log ( resolution );

}

done = true;

} catch ( error ) {

console .error ( error );

}

resolve ( done );

} );

await ticket;

if ( this .prompt )
$ [ Symbol .for ( 'prompt' ) ] ();

};

$_interrupt ( $ ) {

if ( ! this .synthesizer )
return this .shell .close ();

this .synthesizer .kill ();

$ [ Symbol .for ( 'prompt' ) ] ();

};

async $yallah ( $ ) {

if ( this .synthesizer )
throw "Synthesizer is already playing";

const path = 'work.csd';

$ ( 'score' );

await writeFile ( path, $ ( 'synthesizer', 'document' ), 'utf8' );

this .synthesizer = spawn ( 'csound', [

path,
`--omacro:directory=${ process .cwd () }`,

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

const { ticket } = this;

this .ticket = true;

await $ ( Symbol .for ( 'enter' ), ... file );

this .ticket = ticket;

};

async $_enter ( $, ... file ) {

if ( ! file .length )
return this .prompt = true;

this .prompt = false;

const line = file .shift ();

if ( ! await this .ticket ) {

this .prompt = true;

throw "Couldn't complete reading nota";

}

$ [ Symbol .for ( 'prompt' ) ] ();

this .shell .write ( line + '\n' );

return $ [ Symbol .for ( 'enter' ) ] ( ... file );

};

prompt = true;

$_prompt ( $ ) {

const prompt = $ [ Symbol .for ( 'director' ) ] ( Symbol .for ( 'prompt' ) );

this .shell .setPrompt ( ( typeof prompt === 'string' ? prompt + '\n' : '' ) + ': ' );

this .shell .prompt ();

};

} ( ... process .argv .slice ( 2 ) ) );
