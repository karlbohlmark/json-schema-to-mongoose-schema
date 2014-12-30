var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongooseSchema;

function mongooseSchema(jsonSchema) {
	var descriptor = schemaDescriptor(jsonSchema);
	return new Schema(descriptor);
}

function schemaDescriptor(jsonSchema) {
	var type = typeof jsonSchema == "string" ? jsonSchema : jsonSchema.type;
	var _default = jsonSchema.default;
	switch(type) {
		case "string":
			return primitive(String, _default);
		case "boolean":
			return primitive(Boolean, _default);
		case "number":
			return primitive(Number, _default);
		case "object":
			var subSchema = {}
			var jsonProperties = jsonSchema.properties;
			var props = Object.keys(jsonProperties);
			props.forEach(function(prop){
				var jsonProp = jsonProperties[prop];
				subSchema[prop] = schemaDescriptor(jsonProp)
			})
			return subSchema;
	}

	Object.keys(jsonSchema)
}

function primitive(type, _default) {
	if (_default === void 0) return type;

	return {
		type: type,
		default: _default
	}
}
