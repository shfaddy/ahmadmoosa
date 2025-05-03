import Controller from './controller.mjs';

export default class Instrument {

constructor ( details ) { Object .assign ( this, details ) };

#instance = 0;

instance () {

return ++this .#instance % 10 === 0 ? ++this .#instance : this .#instance;

};

controller () {

return new Controller ( this .controller );

};

};
