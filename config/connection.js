const { connect, connection } = require('mongoose');

const connectionString = 'mongodb+srv://bkness:ziggy@cluster0.pf0alen.mongodb.net/social_network_db'
 
connect(connectionString);

module.exports = connection;
