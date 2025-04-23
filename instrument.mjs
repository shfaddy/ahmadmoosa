import Controller from './controller.mjs';
import Phone from './phone.mjs';

export default class Instrument {

constructor ( details ) { Object .assign ( this, details ) };

instance = 0;

phone () {

return new Phone ( {

instrument: `${ this .number }.${ ++this .instance % 10 === 0 ? ++this .instance : this .instance }`,
$controller: new Controller ( this .controller )

} );

};

};
