import Scenarist from './scenarist.mjs';

Scenarist ( new class {

$hello ( ... argv ) {

this .$ .profile = { $name: argv .join ( ' ' ) };

console .log ( 'hello', this .$ .profile .name );

this .$ .ask ();

};

$ask () {

console .log ( "how are you?" );

};

} ) ( 'hello', ... process .argv .slice ( 2 ) );
