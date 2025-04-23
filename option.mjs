export default class Options extends Array {

$_director ( ... argv ) {

switch ( argv .length ) {

case 0:

return this .value;

default:

const option = argv .shift ();

if ( ! this .includes ( option ) )
throw `Invalid option value '${ option }'. Following is a list of valid ones:
${

this .map ( option => `* ${ option }` ) .join ( '\n' )

}`;

return this .value = option;

}

};

};
