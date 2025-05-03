export default class Controller extends Array {

constructor ( controls ) {

super ();

for ( const control in controls ) {

this [ '$' + control ] = controls [ control ];

this .push ( control );

}

};

$_director () {

return this .map ( control => `control = ${ this .$ [ control ] }` );

};

$parameters () {

return this .map ( control => {

const parameter = this .$ [ control ];

return isNaN ( parameter ?.[ 0 ] ) ? `"${ parameter }"` : `[${ parameter }]`;

} );

};

};
