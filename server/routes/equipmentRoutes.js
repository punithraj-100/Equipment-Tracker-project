const express = require('express');
const router = express.Router();
const {
    getAllEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
} = require('../controllers/equipmentController');

router.route('/')
    .get(getAllEquipment)
    .post(addEquipment);

router.route('/:id')
    .put(updateEquipment)
    .delete(deleteEquipment);

module.exports = router;
