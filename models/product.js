const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    unique: true,
    require: [true, 'El nombre del productos es obligatorio']
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

ProductSchema.methods.toJSON = function() {
  const { __v, state, ...data } = this.toObject();
  return data;
}

module.exports = model('Product', ProductSchema);