export default class Score extends Array {

$_director ( $, ... argv ) {

switch ( argv .length ) {

case 0:

return this .join ( '\n\n' );

default:

this .push ( argv .join ( ' ' ) );

return $ ();

}

};

$clear ( $ ) {

this .splice ( 0 );

return $ ();

};

};
