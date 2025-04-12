import AhmadMoosa from './index.mjs';
import Scenarist from './scenarist.mjs';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { parse } from 'node:path';

Scenarist ( new class extends AhmadMoosa {

$project = '';
$directory = parse ( new URL ( import .meta .url ) .pathname ) .dir

async $_producer ( ... argv ) {

this .shell = createInterface ( { input, output } )
.on ( 'line',

line => Promise .resolve (

this .$ ( Symbol .for ( 'process' ), ... line .trim () .split ( /\s+/ ) )

) .finally ( () => {

if ( ! this .synthesizer )
this .shell .prompt ();

} )

) .on ( 'SIGINT', () => {

if ( ! this .synthesizer )
return this .shell .close ();

this .synthesizer .kill ();

this .shell .prompt ();

} );

this .shell .prompt ();

if ( argv .length )
this .shell .write ( argv .join ( ' ' ) + '\n' );

};

async $_process ( ... argv ) {

if ( this .synthesizer )
return;

try {

const resolution = await this .$ ( ... argv );

if ( resolution !== undefined )
console .log ( resolution );

} catch ( error ) {

console .error ( error );

}


};

async $score () {

if ( this .synthesizer )
throw "Synthesizer is already playing";

await writeFile ( this .$project + '.sco', super .$score (), 'utf8' );

this .synthesizer = spawn ( 'csound', [

`${ this .$directory }/index.csd`,
`--smacro:score=${ this .$project }.sco`,

... Object .keys ( this .$mix )
.filter ( instrument => instrument !== '$' )
.map (

instrument => `--omacro:${ instrument .slice ( 1 ) }=${ this .$mix [ instrument ] }`

)

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

} ) ( Symbol .for ( 'producer' ), ... process .argv .slice ( 2 ) );
