import Orchestra from './orchestra.mjs';

export default class Kit extends Map {

constructor ( orchestra = new Orchestra ) { super (), this .orchestra = orchestra };

async $instrument ( instrument ) {

if ( instrument !== undefined )
this .instrument = await this .orchestra .get ( instrument );

return this ?.instrument ?.name;

};

$phone ( phone = this .phone ) {

if ( phone === undefined )
throw "Phone name is required";

if ( ! this .instrument )
throw "No instrument is set yet to produce a phone for";

if ( ! this .has ( phone ) )
this .set ( phone, this .instrument .phone () );

this .$_director = this .get ( this .phone = phone );

return this .phone;

};

$note ( ... argv ) {

const { $, phone } = this;
const score = [];

for ( const [ phone ] of this ) {

console .log ( '#phone/score', phone );

$ .phone = phone;

const note = $ [ Symbol .for ( 'director' ) ] .note ( ... argv );

if ( note )
score .push ( note );

}

if ( phone !== undefined )
$ .phone = phone;

return score;

};

};
