import Scenarist from './scenarist.mjs';

Scenarist ( new class {

$hello ( $, ... argv ) {

$ .profile = { $name: argv .join ( ' ' ) };

console .log ( 'hello', $ .profile .name );

$ .ask ();

};

$ask () {

console .log ( "how are you?" );

};

} ) ( 'hello', ... process .argv .slice ( 2 ) );
