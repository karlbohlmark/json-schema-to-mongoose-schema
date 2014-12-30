var makeSchema = require('../')
var productSchema = require("./fixtures/product")
var assert = require("better-assert");

var schema = makeSchema(productSchema);

assert(schema.paths.name.options.type === String)
assert(schema.paths.price.options.type === Number)
assert(schema.paths.featured.options.type === Boolean)
assert(schema.paths.description.options.type === String)
assert(schema.paths.description.options.default == "")

