export default class Phone {

constructor ( details ) { Object .assign ( this, details ) };

switch = true;

$switch () {

return ( this .switch = ! this .switch ) ? 'on' : 'off';

};

$delay = 0;
$length = 1;

$note ( step = 0 ) {

const { $ } = this;

if ( this .switch )
return [

`i ${ this .instrument }`,
`[ ${ step } + ${ $ .delay } ]`,
`[${ $ .length }]`,
$ .key,
$ .left,
$ .right,
... $ ( 'controller' )

] .join ( ' ' );

};

};
