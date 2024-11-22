const express = require('express');
const { addSchools, getSchools } = require('./controller');

const router = express.Router();

router.route('/schools').post(addSchools);
router.get('/schools/:latitude/:longitude', getSchools);



module.exports = router