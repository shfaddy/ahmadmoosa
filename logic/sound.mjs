import Setup from './setup.mjs';
import Kit from './kit.mjs';
import Calculator from './calculator.mjs';

export default class Sound extends Set {

constructor ( details ) {

super ();

this .path = typeof details ?.path === 'string' ? details .path : '.';
this .calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

this .$setup = new Setup ( {

path: this .path,
calculator: this .calculator

} );

};

$kit ( $, kit = this .kit ) {

if ( kit === undefined )
throw "No sound kit is in use";

const location = '$_kit/' + kit;

if ( ! this .has ( kit ) )
this [ location ] = new Kit ( { setup: this .$setup } );

this .$_director = this [ location ];

this .add ( kit );

return this .kit = kit;

};

};
