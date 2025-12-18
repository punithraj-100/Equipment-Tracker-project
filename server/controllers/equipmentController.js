const Equipment = require('../models/Equipment');

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Public
const getAllEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find().sort({ createdAt: -1 });
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add new equipment
// @route   POST /api/equipment
// @access  Public
const addEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.create(req.body);
        res.status(201).json(equipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update equipment
// @route   PUT /api/equipment/:id
// @access  Public
const updateEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        res.status(200).json(equipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete equipment
// @route   DELETE /api/equipment/:id
// @access  Public
const deleteEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.findByIdAndDelete(req.params.id);

        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        res.status(200).json({ message: 'Equipment removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
};
