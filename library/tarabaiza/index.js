import Band from './band.js';
import Synthesizer from 'ahmadmoosa/synthesizer';
import Calculator from 'ahmadmoosa/calculator'

export default class Tarabaiza extends Set {

constructor ( details ) {

super ();

this .path = typeof details ?.path === 'string' ? details .path : '.';
this .$_calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

this .$synthesizer = new Synthesizer ( {

path: this .path,
calculator: this .$_calculator

} );

};

$band ( $, band = this .band ) {

if ( band === undefined )
throw "No Band is sitting on this Tarabaiza";

const location = '$_band/' + band;

if ( ! this .has ( band ) )
this [ location ] = new Band ( {

synthesizer: this .$synthesizer,
calculator: this .$_calculator

} );

this .$_director = this [ location ];

this .add ( band );

return this .band = band;

};

};
