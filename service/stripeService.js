const config = require('../config')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

const stripeService = {};

stripeService.createCustomer = async (user) => await stripe.customers.create({
    email: user.email,
    address: {
        state: user.state,
        country: user.country,
    },
    description: 'create customer',
    name: user.name, 
});

stripeService.updateCustomer = async (stripeCustomerId, user) => await stripe.customers.update(stripeCustomerId, {
    email: user.email,
    address: {
        state: user.state,
        country: user.country,
    },
    description: 'create customer',
    name: user.name, 
});

module.exports = stripeService;