export default class Option extends Set {

$_director ( $, ... argv ) {

switch ( argv .length ) {

case 0:

return this .value;

default:

const option = argv .shift ();

if ( ! this .has ( option ) )
throw `Invalid option value '${ option }'. Following is a list of valid ones:
${

Array .from ( this ) .map ( option => `* ${ option }` ) .join ( '\n' )

}`;

return this .value = option;

}

};

};
