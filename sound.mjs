import Setup from './setup.mjs';
import Kit from './kit.mjs';

export default class Sound extends Set {

constructor ( path = '.' ) {

super ();

this .$setup = new Setup ( path );

};

$kit ( $, kit = this .kit ) {

if ( kit === undefined )
throw "No sound kit is in use";

const location = '$_kit/' + kit;

if ( ! this .has ( kit ) )
this [ location ] = new Kit ( this .$setup );

this .$_director = this [ location ];

this .add ( kit );

return this .kit = kit;

};

};
