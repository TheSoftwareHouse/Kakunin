const express = require('express');

function xlsxDataRouting() {
  const router = express.Router();

  router.get('/data-9rows', (req, res) => {
    res.json({
      content:
        '[["Schamberger PLC","33333003158","25","Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["JANEK","9912396963","2","Security Guards, Printing & Advertising, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["شركة تكامل القابضة","9912396963","2","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["شركة تكامل القابضة","9912396963","2","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["Bosco, Marks and Walker","9910412435","7","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["Rippin-Torp","9912038835","7","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["Kling-Bogan","9910412335","25","Contracting & Maintenance, Security Guards, Printing & Advertising, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["Hane, Bartoletti and Mitchell","9911038835","7","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["Zemlak, Stiedemann and Green","9912496963","7","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"]]',
    });
  });

  router.get('/data-9rows-part', (req, res) => {
    res.json({
      content:
        '[["Schamberger PLC"],["JANEK"],["شركة تكامل القابضة"],["شركة تكامل القابضة"],["Bosco, Marks and Walker"],["Rippin-Torp"],["Kling-Bogan"],["Hane, Bartoletti and Mitchell"],["Zemlak, Stiedemann and Green"]]',
    });
  });

  router.get('/data-3rows', (req, res) => {
    res.json({
      content:
        '[["Schamberger PLC","33333003158","25","Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["JANEK","9912396963","2","Security Guards, Printing & Advertising, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"],["شركة تكامل القابضة","9912396963","2","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"]]',
    });
  });

  router.get('/data-3rows-part', (req, res) => {
    res.json({
      content:
        '[["Rippin-Torp","9912038835"],["Kling-Bogan","9910412335"],["Hane, Bartoletti and Mitchell","9911038835"]]',
    });
  });

  router.get('/data-1row', (req, res) => {
    res.json({
      content:
        '[["Bosco, Marks and Walker","9910412435","7","Contracting & Maintenance, Food & Consumable supply, IT, Medical Supplies and Equipment, Motors & Vehicles, Office Furniture, Office Supplies"]]',
    });
  });

  router.get('/data-1row-part', (req, res) => {
    res.json({
      content: '[["Bosco, Marks and Walker","9910412435"]]',
    });
  });

  return router;
}

module.exports = {
  xlsxDataRouting,
};
