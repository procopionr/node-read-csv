var express = require('express');
var router = express.Router();
var mongoUtil = require( '../db/mongoUtil' );
var parse = require('csv-parser');
var fs = require('fs');
const { finished } = require('stream/promises');

/* GET users listing. */
router.get('/:filename', async function(req, res, next) {
  await readCsv(req.params.filename);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({success:true}));
});

const readCsv = async (name) => {
  const collect = mongoUtil.getDb().collection("users");
  const parser = fs
    .createReadStream(`./csv/`  + name)
    .pipe(parse({}));
    parser.on('readable', async function(){
      let record; while ((record = parser.read()) !== null) {
        await collect.insertOne(record)
				.then((resolve) => {
          console.log(resolve);
				}).catch((err) => {
          console.error(err);
				});
      }
    });
  await finished(parser);
};



module.exports = router;
