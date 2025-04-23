export default class Controller extends Array {

constructor ( controls ) {

super ();

for ( const control of Object .keys ( controls ) ) {

this [ '$' + control ] = controls [ control ];

this .push ( control );

}

};

$_director () {

return this .map ( control => `[${ this .$ [ control ] }]` );

};

};
