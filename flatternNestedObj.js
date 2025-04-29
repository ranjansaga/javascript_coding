const inputObj = {
  userId: 1,
  id: 2,
  location: {
    city: "bangalore",
    region: "india",
    nested: {
      boss: "Test",
      boss2: "Test2"
    }
  },
  title: "flatten obj",
  body: "nisi nulla lorem epsum",
};

/**
 * Recursively flattens a nested object.
 * @param {Object} input - The object to flatten
 * @param {String} parentKey - Key path prefix for nested fields
 * @param {Object} result - Accumulator object to store flattened key-value pairs
 * @returns {Object} A flat object with dot notation keys
 */
function flattenObj(input, parentKey = "", result = {}) {
  for (let key in input) {
    // Create a dot-notated key if inside nested object, otherwise keep it as is
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    // If the value is a nested non-null, non-array object, recurse into it
    if (
      typeof input[key] === "object" &&
      input[key] !== null &&
      !Array.isArray(input[key])
    ) {
      flattenObj(input[key], newKey, result); // recursive call
    } else {
      // Otherwise, directly assign the value to the newKey
      result[newKey] = input[key];
    }
  }

  // Return the final flattened result
  return result;
}

console.log(flattenObj(inputObj));
