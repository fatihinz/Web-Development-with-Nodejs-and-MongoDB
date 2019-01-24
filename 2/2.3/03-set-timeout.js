console.log('First');

setTimeout(function noDelay() {
    console.log('No delay was provided for this message');
});

console.log('Second');

setTimeout(function zeroDelay() {
    console.log('0 as delay was provided for this message');
}, 0);

console.log('Last');
