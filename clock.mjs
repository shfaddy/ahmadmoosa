export default class Clock extends Map {

measure = 1;

get $measure () {

return this .measure;

};

set $measure ( measure ) {

if ( isNaN ( measure = parseFloat ( measure ) ) )
throw "Not a number";

this .$ ( 'score', 'v', this .measure = measure );

};

cursor = 0;

get $cursor () {

return this .cursor;

};

set $cursor ( cursor ) {

if ( isNaN ( cursor = parseInt ( cursor ) ) )
throw "Not a number";

this .$ ( 'score', 'b', this .cursor = cursor );

};

get $time () {

return this .measure * this .cursor

};

mark = 'zero';

get $mark () {

return this .mark;

};

set $mark ( mark ) {

if ( ! this .has ( mark ) )
this .set ( mark, this .cursor );

this .$ .cursor = this .get ( mark );

};

tempo = {};

get $tempo () {

return Object .keys ( this .tempo ) .map (

cursor => `${ this .measure * cursor } ${ this .tempo [ cursor ] }`

);

};

set $tempo ( tempo ) {

this .tempo [ this .cursor ] = parseFloat ( tempo );

};

};
