const Item = require('../models/Item');

// GET /api/items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TODO 1: GET /api/items/:id  - return one item, 404 if not found
exports.getItemById = async (req, res) => {

  try{
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);

  } catch (err) {
    res.status(500).json({ message: err.message });

  }

};

// POST /api/items
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create({
      name: req.body.name,
      description: req.body.description,
      supplier: req.body.supplier,
      stockStatus: req.body.stockStatus,
      expiryDate: req.body.expiryDate,
      isFeatured: req.body.isFeatured

    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// TODO 2: PUT /api/items/:id - update, return updated item, 404 if not found
exports.updateItem = async (req, res) => {

  try{

    const {name, description,supplier,stockStatus,expiryDate,isFeatured} = req.body;
    const item = await Item.findByIdAndUpdate(

      req.params.id, 

      {name, description,supplier,stockStatus,expiryDate,isFeatured},
      {new: true, runValidators: true}

      

    )

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);

  } catch (err){
    res.status(400).json({message: err.message});

  }
};

// TODO 3: DELETE /api/items/:id - delete, 404 if not found
exports.deleteItem = async (req, res) => {

  try{

    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });


  } catch (err){
    res.status(400).json({message: err.message});
  }


};
