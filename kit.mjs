export default class Kit extends Set {

constructor ( setup ) {

super ();

this .setup = setup;

};

$_director ( $ ) {

return Array .from ( this ) .map (

instrument => `${ instrument } ${ $ ( instrument ) .join ( ' ' ) }`

);

};

async $phone ( $, phone = this .phone, instrument ) {

if ( phone === undefined )
throw "Kit does not include phones yet";

const location = '$_phone/' + phone;

if ( ! this .has ( phone ) )

if ( instrument === undefined )
throw "Specify an instrument for the new phone";

else
this [ location ] = await this .setup .get ( instrument );

this .$_director = this [ location ];

this .add ( this .phone = phone );

return this .phone;

};

$note ( $, ... argv ) {

return Array .from ( this ) .map (

phone => $ [ Symbol .for ( 'phone/' + phone ) ] .note ( ... argv )

);

};

};
