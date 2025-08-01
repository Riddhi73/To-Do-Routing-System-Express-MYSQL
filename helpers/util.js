// Utility container
const util = {};

// JSON string parser
util.parseJson = (jsonStr) => {
    let output;
    try {
        // Convert to object
        output = JSON.parse(jsonStr);
    }
    catch (error) {
        // Handle parse errors
        output = {};
    }
    return output;
}

// Export utilities
module.exports = util;
