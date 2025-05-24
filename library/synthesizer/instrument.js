import Controller from './controller.js';
import Calculator from 'ahmadmoosa/calculator';

export default class Instrument extends Map {

constructor ( details ) {

super ();

this .name = typeof details ?.name === 'string' && details .name .length ? details .name : 'shfaddys';
this .number = ! isNaN ( details ?.number ) ? details .number : '13';
this .controller = typeof details ?.controller === 'object' ? details .controller : {};
this .calculator = details ?.calculator instanceof Calculator ? details .calculator : new Calculator;

};

index = 0;

produce () {

return {

instrument: this .name,
number: `${ this .number }.${ ++this .index % 10 === 0 ? ++this .index : this .index }`,
controller: new Controller ( {

controls: this .controller,
calculator: this .calculator

} )

};

};

};
