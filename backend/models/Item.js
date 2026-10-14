const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    // TODO 5 (extension): add the new fields described in the task sheet
    supplier: {type: String, required:true,trim: true},
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Low Stock','Out of Stock' ],
      default: 'In Stock',

    },
    expiryDate: { type: Date },
    isFeatured: {type:Boolean,default:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
