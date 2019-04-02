"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor = require("protractor");
// set global by to allow recursive call on src directory
global.by = new protractor.ProtractorBy();
require('../core/prototypes');
