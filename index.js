const express = require('express');

const app = express();

const  aws = require('aws-sdk'), // ^2.2.41
    multerS3 = require('multer-s3'); //"^1.4.1"
    const multer = require('multer');
    const bodyParser = require('body-parser');

    aws.config.update({
      accessKeyId: 'accessKey', 
      secretAccessKey: 'secretKey', 
      region: 'eu-central-1'
  });
  
  var s3 = new aws.S3({apiVersion: '2006-03-01'});
  app.use(bodyParser.json());

  var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'bucket',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});



app.get('/', (req,res,next) => {
 res.sendFile(__dirname + '/test.html');
})

app.post('/upload', upload.array('upl',1), (req, res, next) => {
  res.send("Uploaded!");
});


app.listen(process.env.PORT || 3000);
