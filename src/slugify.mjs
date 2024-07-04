// slugify-v2.js

/**
 * Converts text to a URL-friendly slug.
 * @param {string} text - The text to be slugified.
 * @returns {string} - The slugified text.
 */
export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

/**
 * Generates a unique slug for a document in a MongoDB collection.
 * @param {string} text - The text to be slugified.
 * @param {Model} Model - The Mongoose model to check for uniqueness.
 * @returns {Promise<string>} - The unique slug.
 */
export const generateUniqueSlug = async (text, Model) => {
    let slug = slugify(text);
    let uniqueSlug = slug;
    let count = 1;

    while (await Model.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }
    return uniqueSlug;
};
