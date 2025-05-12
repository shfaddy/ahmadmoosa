import Phone from './phone.mjs';
import Controller from './controller.mjs';

export default class Instrument extends Map {

constructor ( details ) {

super ();

this .name = details .name;
this .number = details .number;
this .controller = details .controller;

};

index = 0;

phone () {

return new Phone ( {

instrument: this .name,
number: `${ this .number }.${ ++this .index % 10 === 0 ? ++this .index : this .index }`,
controller: new Controller ( this .controller )

} );

};

};
