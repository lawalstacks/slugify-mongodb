# slugify-mongodb

A library to generate URL-friendly slugs and ensure their uniqueness in MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [CommonJS](#commonjs)
  - [ES Modules](#es-modules)
- [API](#api)
  - [`slugify`](#slugify)
  - [`generateUniqueSlug`](#generateuniqueslug)
- [Examples](#examples)
  - [Basic Usage](#basic-usage)
  - [Generating Unique Slugs](#generating-unique-slugs)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install via npm:

```bash
npm install slugify-mongodb
```

## Usage

**`slugify-mongodb`** can be used in both CommonJS and ES Modules formats. Below are examples for both.

### CommonJS

```javascript
// Import the module from slugify-mongodb
const slugifyMongoDB = require('slugify-mongodb');

// Convert text to a slug
const slug = slugifyMongoDB.slugify('My Example Text');
console.log(slug); // Output: 'my-example-text'

// Generate a unique slug for a MongoDB document
const mongoose = require('mongoose');
const ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));

async function createUniqueSlug(text) {
  const uniqueSlug = await slugifyMongoDB.generateUniqueSlug(text, ExampleModel);
  console.log(uniqueSlug); // Output: 'my-example-text' or 'my-example-text-1' if the slug exists
}

createUniqueSlug('My Example Text');
```

### ES Modules

```javascript
// Import the functions from slugify-mongodb
import { slugify, generateUniqueSlug } from 'slugify-mongodb';

// Convert text to a slug
const slug = slugify('My Example Text');
console.log(slug); // Output: 'my-example-text'

// Generate a unique slug for a MongoDB document
import mongoose from 'mongoose';
const ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));

async function createUniqueSlug(text) {
  const uniqueSlug = await generateUniqueSlug(text, ExampleModel);
  console.log(uniqueSlug); // Output: 'my-example-text' or 'my-example-text-1' if the slug exists
}

createUniqueSlug('My Example Text');
```

## API

### `slugify`

Converts a string into a URL-friendly slug by lowercasing, trimming, and replacing spaces and non-word characters with hyphens.

#### Signature

```javascript
slugify(text: string): string
```

#### Parameters

- `text` (**string**): The text to convert to a slug.

#### Returns

- (**string**): A URL-friendly slug.

#### Example

```javascript
const slug = slugify('Hello World!');
console.log(slug); // Output: 'hello-world'
```

### `generateUniqueSlug`

Generates a unique slug by checking for existing slugs in a MongoDB collection. If a conflict is found, appends a numeric suffix to ensure uniqueness.

#### Signature

```javascript
generateUniqueSlug(text: string, Model: mongoose.Model): Promise<string>
```

#### Parameters

- `text` (**string**): The text to convert to a slug.
- `Model` (**mongoose.Model**): The Mongoose model to check for existing slugs.

#### Returns

- (**Promise<string>**): A unique URL-friendly slug.

#### Example

```javascript
const mongoose = require('mongoose');
const ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));

async function createUniqueSlug(text) {
  const uniqueSlug = await generateUniqueSlug(text, ExampleModel);
  console.log(uniqueSlug); // Output: 'hello-world' or 'hello-world-1' if 'hello-world' exists
}

createUniqueSlug('Hello World!');
```

## Examples

### Basic Usage

```javascript
// Import and use slugify function
const { slugify } = require('slugify-mongodb');

const slug = slugify('Example Text');
console.log(slug); // Output: 'example-text'
```

### Generating Unique Slugs

```javascript
const mongoose = require('mongoose');
const { generateUniqueSlug } = require('slugify-mongodb');

const ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));

async function createUniqueSlug(text) {
  const uniqueSlug = await generateUniqueSlug(text, ExampleModel);
  console.log(uniqueSlug); // Output: 'example-text' or 'example-text-1'
}

createUniqueSlug('Example Text');
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

