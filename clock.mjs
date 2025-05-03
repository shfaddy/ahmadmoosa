export default class Clock extends Map {

measure = 1;

$measure ( $, measure = this .measure ) {

if ( isNaN ( measure = parseFloat ( measure ) ) || measure <= 0 )
throw "Clock measure is required to be a positive number";

return this .measure = measure;

};

cursor = 0;

$cursor ( $, cursor = this .cursor ) {

if ( isNaN ( cursor = parseInt ( cursor ) ) || cursor < 0 )
throw "Clock cursor is required to be an integer >= 0";

return this .cursor = cursor;

};

get $time () {

return this .measure * this .cursor

};

tempo = {};

$tempo ( $, tempo ) {

if ( tempo === undefined )
return Object .keys ( this .tempo ) .map (

cursor => `${ this .measure * cursor } ${ this .tempo [ cursor ] }`

);

this .tempo [ this .cursor ] = parseFloat ( tempo );

return $ .tempo ();

};

};
