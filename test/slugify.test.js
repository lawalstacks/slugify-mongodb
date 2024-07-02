const { expect } = require('chai');
const slugifyMongoDB = require('../src/slugify.js');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('slugify-mongodb', function () {
  let mongoServer;
  let ExampleModel;

  before(async function () {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    ExampleModel = mongoose.model('Example', new mongoose.Schema({ slug: String }));
  });

  after(async function () {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should slugify text', function () {
    const text = 'My Example Text!';
    const result = slugifyMongoDB.slugify(text);
    expect(result).to.equal('my-example-text');
  });

  it('should generate unique slug', async function () {
    await new ExampleModel({ slug: 'my-example-text' }).save();
    const text = 'My Example Text';
    const result = await slugifyMongoDB.generateUniqueSlug(text, ExampleModel);
    expect(result).to.equal('my-example-text-1');
  });
});
