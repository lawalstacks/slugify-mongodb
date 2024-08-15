// slugify.js

/**
 * Converts text to a URL-friendly slug.
 * @param {string} text - The text to be slugified.
 * @returns {string} - The slugified text.
 */

const slugify = (text, options = {}) => {
  const {
    separator = '-',
    lower = true,
    preserveCase = false,
    maxLength = Infinity,
    reservedWords = [],
  } = options;

  let slug = text.toString().trim()
    .replace(/[\s\W]+/g, separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

  if (lower && !preserveCase) slug = slug.toLowerCase();
  slug = slug.slice(0, maxLength);

  if (reservedWords.includes(slug)) {
    slug += `-${Date.now()}`;
  }

  return slug;
};


/**
 * Generates a unique slug for a document in a MongoDB collection.
 * @param {string} text - The text to be slugified.
 * @param {Model} Model - The Mongoose model to check for uniqueness.
 * @returns {Promise<string>} - The unique slug.
 */

const generateUniqueSlug = async (text, Model, options = {}) => {
  let slug = slugify(text, options);
  let uniqueSlug = slug;
  let count = 1;
if(!Model){
console.error({"error":"generateUniqueSlug(string,Model:mongodb model- func params not defined!)"});
return;
  while (await Model.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  return uniqueSlug;
};

module.exports = { slugify, generateUniqueSlug };