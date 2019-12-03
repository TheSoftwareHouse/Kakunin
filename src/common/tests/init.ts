import * as protractor from 'protractor';

// set global by to allow recursive call on src directory
global.by = new protractor.ProtractorBy();

require('../../core/prototypes');
