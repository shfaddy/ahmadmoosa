import Musician from './musician.js';
import Synthesizer from 'ahmadmoosa/synthesizer';

export default class Band extends Set {

constructor ( details ) {

super ();

this .synthesizer = details ?.synthesizer instanceof Synthesizer ? details .synthesizer : new Synthesizer;

};

$_director ( $ ) {

return [ ... this ] .map (

instrument => `${ instrument } ${ $ ( instrument ) .join ( ' ' ) }`

);

};

async $musician ( $, musician = this .musician, instrument ) {

if ( musician === undefined )
throw "Band does not include musicians yet";

if ( instrument === undefined && ! this .has ( musician ) )
throw "This band does not include the musician: " + musician;

const location = '$_musician/' + musician;

if ( ! this .has ( musician ) ) {

instrument = await this .synthesizer .get ( instrument );
musician = new Musician ( Object .assign ( instrument, { name: musician } ) );

this .add ( this .musician = musician .name );

this [ location ] = musician;

}

else
this .musician = musician;

this .$_director = this [ location ];

return this .musician;

};

#instance = {};

instance ( musician ) {

if ( ! this .#instance [ musician ] )
this .#instance [ musician ] = 0;

return ++this .#instance [ musician ];

};

$note ( $, ... argv ) {

return [ ... this ] .map (

musician => $ [ Symbol .for ( 'musician/' + musician ) ] .note ( ... argv )

) .join ( '\n' );

};

};
