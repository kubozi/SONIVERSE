const express = require('express');
const soundController = require('../controllers/soundController');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(express.json());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use('/index', soundController.index);
router.post('/create_sound', soundController.create_sound);
router.use('/update_owner', soundController.update_owner);
router.get('/sounds/:id', soundController.sound_details);
router.get('/address/:owner', soundController.get_sounds_by_owner);
router.use('/update_relisted_sound', soundController.update_relisted_sound);
router.use('/tags', soundController.get_sounds_by_tag);
router.use('/getsounds', soundController.get_sounds_search);

module.exports = router;
