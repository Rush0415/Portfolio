require("dotenv").config();
const express = require('express'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');


const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/contact', (req, res) => {
    res.render('contact');
  });

  app.post('/thanks', (req, res) => {
    const contact = req.body;
    res.render('thanks', { contact: req.body })
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'rushastronomo415@gmail.com',
      from: contact.contact,
      subject: `${contact.firstName} ${contact.lastName}`,
      text: contact.subject
    };
    console.log(msg);
    sgMail.send(msg);
  });
//   app.post('/thanks', (req, res) => { 
//     res.render('thanks', { contact: req.body })
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const contact = req.body;
// const msg = {
//   to: 'rushastronomo0415@gmail.com',
//   from: 'test@example.com',
//   subject: `${contact.firstName} ${contact.lastName}`,
//   text: 'test',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
//   });   

app.get('/',(req, res) => { 
    const data = {
        person: {
            firstName: 'Rashad',
            lastName: 'Astronomo',
        }
    }
    res.render('index', data);
});

app.listen(8080, () => { 
    console.log('listening at http://localhost:8080');
});

module.exports = app;