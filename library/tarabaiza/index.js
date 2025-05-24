import Band from './band.js';
import Synthesizer from 'ahmadmoosa/synthesizer';
import Calculator from 'ahmadmoosa/calculator'

export default class Tarabaiza extends Set {

constructor ( details ) {

super ();

this .path = typeof details ?.path === 'string' ? details .path : '.';
this .calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

this .$synthesizer = new Synthesizer ( {

path: this .path,
calculator: this .calculator

} );

};

$band ( $, band = this .band ) {

if ( band === undefined )
throw "No Band is sitting on this Tarabaiza";

const location = '$_band/' + band;

if ( ! this .has ( band ) )
this [ location ] = new Band ( { synthesizer: this .$synthesizer } );

this .$_director = this [ location ];

this .add ( band );

return this .band = band;

};

};
