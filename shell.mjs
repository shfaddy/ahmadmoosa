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

async $_producer () {

const { argv } = this;

this .shell = createInterface ( { input, output } )
.on ( 'line', line => this .$ ( Symbol .for ( 'process' ), line ) )
.on ( 'SIGINT', () => this .$ ( Symbol .for ( 'interrupt' ) ) );

this .shell .prompt ();

if ( argv .length )
this .shell .write ( argv .join ( ' ' ) + '\n' );

};

async $_enter ( line ) {

await new Promise ( resolve => {

this .resolve = resolve;

this .shell .write ( line + '\n' );

} );

delete this .resolve;

};

async $_process ( line ) {

if ( this .synthesizer )
return false;

try {

const argv = line .trim () .split ( /\s+/ );

const resolution = await this .$ ( ... argv );

if ( resolution !== undefined )
console .log ( resolution instanceof Array ? resolution .join ( '\n' ) : resolution );

} catch ( error ) {

console .error ( error );

}

this .shell .prompt ();

if ( this .resolve )
this .resolve ();

};

$_interrupt () {

if ( ! this .synthesizer )
return this .shell .close ();

this .synthesizer .kill ();

this .shell .prompt ();

};

async $score () {

if ( this .synthesizer )
throw "Synthesizer is already playing";

await writeFile ( this .$project + '.sco', this .$ [ Symbol .for ( 'director' ) ] ( 'score' ), 'utf8' );

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

async $nota ( path ) {

for ( const line of await readFile ( path, 'utf8' ) .then (

file => file .split ( '\n' )
.map ( line => line .trim () )
.filter ( line => line .length )

) ) {

await this .$ ( Symbol .for ( 'enter' ), line );

}

};

} ( ... process .argv .slice ( 2 ) ) );
