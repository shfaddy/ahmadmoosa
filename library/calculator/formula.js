import Calculator from './index.js';

export default class Formula extends Array {

constructor ( details, ... equation ) {

super ( ... equation );

this .calculator = details ?.calculator;

};

$_director ( $, ... argv ) {

return this .calculator ( ... this, ... argv );

};

$fetch ( $ ) { return [ $ () ] };

};
