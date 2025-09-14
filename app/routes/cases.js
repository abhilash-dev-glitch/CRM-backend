const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const caseController = require('../controllers/caseController');


router.get('/', auth, caseController.list);
router.post('/', auth, caseController.create);
router.get('/:id', auth, caseController.get);
router.patch('/:id', auth, caseController.update);
router.delete('/:id', auth, caseController.remove);


module.exports = router;