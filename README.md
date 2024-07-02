# slugify-mongodb

A lightweight library for generating URL-friendly slugs and ensuring their uniqueness in MongoDB.

## Features

- **Slugify**: Converts text into URL-friendly slugs.
- **Generate Unique Slug**: Ensures uniqueness of slugs in MongoDB collections.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [CommonJS](#commonjs)
  - [ES Modules](#es-modules)
- [API](#api)
  - [`slugify`](#slugify)
  - [`generateUniqueSlug`](#generateuniqueslug)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install via npm:


```npm install slugify-mongodb```


## Usage

Common Js

file: example.js

```
const { slugify, generateUniqueSlug } = require('slugify-mongodb');
const mongoose = require('mongoose');

// Example usage
const ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));

(async () => {
    const text = 'My Example Text';
    const uniqueSlug = await generateUniqueSlug(text, ExampleModel);
    console.log(uniqueSlug);
})();
```
ES6 Modules

file: example.mjs
```
import { slugify, generateUniqueSlug } from 'slugify-mongodb/slugify-v2.js';
import mongoose from 'mongoose';

// Example Mongoose model
const ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));

(async () => {
    const text = 'My Example Text';
    const uniqueSlug = await generateUniqueSlug(text, ExampleModel);
    console.log(uniqueSlug); // Outputs a unique slug
})();

```

## API

*slugify(text)*
Converts the given text to a URL-friendly slug.
Parameters:text (string): The text to be slugified.
Returns:(string): The slugified text.

*generateUniqueSlug(text, Model)*
Generates a unique slug based on the provided text and checks for uniqueness within the provided Mongoose model.
Parameters:text (string): The text to be slugified.
Model (Mongoose Model): The Mongoose model to check for existing slugs.Returns:(Promise): The unique slug.
