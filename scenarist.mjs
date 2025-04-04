/*

# Source Code of Scenarist

Scenarist is written here as an ECMAScript Module.

*/

export default ( ... argv ) => new Scenarist ( ... argv ) .get ();

/*

The module's default export is a function that instructs Scenarist to write a play for the input scenario.
The scenario must be an object.
The returned play is a function.

*/

class Scenarist {

#play = Scenarist .#director .bind ( this );
#scenario;
#plot = new Map;
#ready;
#argv = [];

constructor ( ... argv ) {

if ( typeof ( this .#scenario = argv .shift () ) !== 'object' )
throw TypeError ( `Scenarist writes plays only for object scenarios. Passed scenario is ${ typeof this .#scenario }.` );

if ( typeof Object .assign ( this .#scenario, { $: this .#play } ) .$_producer === 'function' )
this .#ready = this .#play ( Symbol .for ( 'producer' ), ... ( this .#argv = argv ) );

}; // Scenarist .prototype .constructor

async get () {

await this .#ready;

return this .#play;

}; // Scenarist .prototype .get

static async #director ( ... argv ) {

let direction = typeof argv [ 0 ] === 'symbol' ? '$_' + Symbol .keyFor ( argv [ 0 ] ) : '$' + argv [ 0 ];
let conflict = this .#scenario [ direction ];
let resolution;

if ( conflict === undefined )
conflict = this .#scenario [ direction = '$_director' ];

else
argv .shift ();

switch ( typeof conflict ) {

case 'object':

if ( ! this .#plot .has ( conflict ) ) {

const scenarist = new this .constructor ( conflict, ... this .#argv );

await scenarist .#ready;

this .#plot .set ( conflict, scenarist );

}

resolution = this .#plot .get ( conflict ) .#play ( ... argv );

break;

case 'function':

resolution = conflict .call ( this .#scenario, ... argv );

break;

default:

if ( argv .length && ! direction .startsWith ( '$_' ) )
conflict = this .#scenario [ direction ] = isNaN ( argv [ 0 ] ) ? argv .shift () : parseFloat ( argv .shift () );

resolution = conflict;

}

return ! direction .startsWith ( '$_' ) && typeof this .#scenario .$_reversal === 'function' ? await this .#play ( Symbol .for ( 'reversal' ), direction, await resolution ) : await resolution;

}; // Scenarist .#director

}; // Scenarist
