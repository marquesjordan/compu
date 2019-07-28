const mongoose = require('mongoose');
const BusinessSettings = mongoose.model('businessSettings');
const Business = mongoose.model('business');

module.exports = app => {

  app.get('/api/getBusinessSettings',  (req, res) => {

    console.log('Body: ', req.body);
    res.send("Dummy");
    // const {
    //     phone,
    // } = req.body;

    // console.log(phone);

    // Customer.findOne({phone: phone})
    //     .then((current_customer) => {
    //         console.log("CurrentCustomer: " , current_customer)
    //         if (!current_customer) {
    //             customer = new Customer({ phone: phone }).save();
    //             console.log("customer", customer);
    //         } else {
    //             current_customer.count++;
    //             current_customer.save();
    //         }
    //     })
    //     .catch(err => {
    //         console.log("Problem getting customer by phone numebr.")
    //     });
  });
}