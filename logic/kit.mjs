import Setup from './setup.mjs';

export default class Kit extends Set {

constructor ( details ) {

super ();

this .setup = details ?.setup instanceof Setup ? details .setup : new Setup;

};

$_director ( $ ) {

return [ ... this ] .map (

instrument => `${ instrument } ${ $ ( instrument ) .join ( ' ' ) }`

);

};

async $phone ( $, phone = this .phone ) {

if ( phone === undefined )
throw "Kit does not include phones yet";

let location = '$_phone/' + phone;

if ( ! this .has ( phone ) ) {

const instrument = await this .setup .get ( phone );

this .add ( this .phone = phone = `${ phone }.${ this .instance ( phone ) }` );

this [ location = '$_phone/' + phone ] = instrument;

}

this .$_director = this [ location ];

return this .phone;

};

#instance = {};

instance ( phone ) {

if ( ! this .#instance [ phone ] )
this .#instance [ phone ] = 0;

return ++this .#instance [ phone ];

};

$note ( $, ... argv ) {

return Array .from ( this ) .map (

phone => $ [ Symbol .for ( 'phone/' + phone ) ] .note ( ... argv )

);

};

};
