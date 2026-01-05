// addTwoNumbers: returns the numeric sum of two values
function addTwoNumbers(a, b) {
	const numA = Number(a);
	const numB = Number(b);
	if (Number.isNaN(numA) || Number.isNaN(numB)) {
		throw new TypeError('Both arguments must be numbers or numeric strings');
	}
	return numA + numB;
}

// Example usage
console.log(addTwoNumbers(2, 3));        // 5
console.log(addTwoNumbers('4.5', '1.5')); // 6

// To run: `node daksh.js`

