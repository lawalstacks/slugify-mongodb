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
- [Options](#options)
- [Advanced Features](#advanced-features)
- [Examples](#examples)
  - [Basic Usage](#basic-usage)
  - [Generating Unique Slugs](#generating-unique-slugs)
  - [See Perfect Example](#generateUniqueSlug)
  - [Advance Feature Usage](#advance-usage)
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

## Options

The `slugify` function accepts an options object to customize its behavior. If no options are provided, default values will be used.

### Default Behavior

- `separator` (default: `'-'`)
- `lower` (default: `true`)
- `preserveCase` (default: `false`)
- `maxLength` (default: `Infinity`)
- `reservedWords` (default: `[]`)

### Custom Options

```javascript
const slug = slugify('My Example Text', {
  separator: '_',
  preserveCase: true,
  maxLength: 15,
});
console.log(slug); // Output: 'My_Example_Text'
```

## Advanced Features

### Custom Separator

```javascript
const slug = slugify('My Example Text', { separator: '_' });
console.log(slug); // Output: 'my_example_text'
```

### Preserve Case

```javascript
const slug = slugify('My Example Text', { preserveCase: true });
console.log(slug); // Output: 'My-Example-Text'
```

### Maximum Length

```javascript
const slug = slugify('My Example Text', { maxLength: 10 });
console.log(slug); // Output: 'my-exampl'
```

### Reserved Words

```javascript
const slug = slugify('admin', { reservedWords: ['admin', 'root'] });
console.log(slug); // Output: 'admin-<timestamp>'
```

### Generating Unique Slugs

```javascript
const uniqueSlug = await generateUniqueSlug('My Example Text', ExampleModel);
console.log(uniqueSlug); // Output: 'my-example-text-1' if 'my-example-text' already exists
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
### See Perfect Example

```javascript
//create posts in your backend
const Post = require('../model/postModel');
const User = require('../model/userModel');
const Slug = require('slugify-mongodb');

const create = async (req,res)=> {
    const {postedBy, text, title, img, video} = req.body
    try {
        if (!postedBy || !text || !title) {
            res.status(400).json({error: 'posted by, title and text field are required'});
        }
        const user = await User.findById(postedBy);
        if (!user) {
            res.status(400).json({error: 'user not found'});
        }
        if (user._id.toString() !== req.user._id.toString()) {
            res.status(400).json({error: "unauthorized to create steeze post"})
            return;
        }
        const maxLength = 500;
        if (text.length > maxLength) {
            res.status(400).json({error: 'maximum text character is 500'});
        }
        let slug = await Slug.generateUniqueSlug(title,Post);
        const newPost = new Post({
            postedBy,
            title,
            slug,
            text,
            img,
            video
        })
            await newPost.save();
            await User.findByIdAndUpdate(user._id, {$push: {posts: newPost}})
            res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({error: "unable to create post"})
        console.log(error)
    }
}


```
##Output
```JSON
{
  "postedBy": "667edc045fb32d7ffed1a5fe",
  "title": "Todays post",
  "slug": "todays-post-2",
  "text": "testing post 4",
  "img": "image uploaded",
  "video": "video uploaded",
  "likes": [],
  "_id": "6687fffa2a2b81c150749efd",
  "replies": [],
  "createdAt": "2024-07-05T14:15:22.339Z",
  "updatedAt": "2024-07-05T14:15:22.339Z",
  "__v": 0
}
```
### Advance Feature Usage

Without Options

The function will use default values if no options are provided:

```javascript
const { slugify } = require('slugify-mongodb');

const slug = slugify('My Example Text');
console.log(slug); // Output: 'my-example-text'
```
 With Custom Options

Users can still customize the behavior by providing an options object:

```javascript
const slug = slugify('My Example Text', {
  separator: '_',
  preserveCase: true,
  maxLength: 15,
});
console.log(slug); // Output: 'My_Example_Text'
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

