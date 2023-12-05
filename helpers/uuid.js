const { v4: uuidv4 } = require('uuid');

// Function to generate a 4-character ID from a UUID
const generateShortId = () => {
  const fullId = uuidv4();
  // Take the first 4 characters from the generated UUID
  return fullId.substring(0, 4);
};

module.exports = generateShortId;
