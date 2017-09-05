const protractor = require('protractor');

// set global by to allow recursive call on src directory
global.by = new protractor.ProtractorBy();

require('../helpers/prototypes');
