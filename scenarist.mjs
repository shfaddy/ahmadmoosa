export default ( ... argv ) => new Scenarist ( ... argv ) .play;

class Scenarist {

constructor ( scenario, player = this ) {

this .play = new Proxy ( typeof ( this .scenario = scenario ) === 'function' ? scenario : function Scenarist () {}, this );
this .player = player;

if ( typeof this .scenario === 'object' )
Object .defineProperty ( this .scenario, '$', { value: this .play } );

};

apply ( scenario, _, argv ) {

if ( scenario === this .scenario )
return Reflect .apply ( this .scenario, this .player .scenario, argv );

if ( ! argv .length )
return typeof this .scenario === 'object' ? this .play : this .scenario;

const cue = argv .shift ();
let resolution = this .play [ cue ];

if ( typeof resolution === 'function' )
return resolution ( ... argv );

if ( argv .length )
resolution = this .play [ cue ] = argv .shift ();

return argv .length ? this .play ( ... argv ) : resolution;

};

plot = new Map;

get ( _, cue, __, ... argv ) {

let direction = typeof cue === 'symbol' ? '$_' + Symbol .keyFor ( cue ) : '$' + cue;
let conflict = this .scenario [ direction ] = argv .length ? argv .shift () : this .scenario [ direction ];
let resolution;

switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! this .plot .has ( conflict ) ) {

const scenarist = new this .constructor ( conflict, this );

this .plot .set ( conflict, scenarist );

}

resolution = this .plot .get ( conflict ) .play;

break;

default:

resolution = conflict;

}

return resolution;

};

set ( _, cue, argv, __ ) {

return this .get ( _, cue, __, isNaN ( argv ) ? argv : parseFloat ( argv ) );

};

}; // Scenarist
