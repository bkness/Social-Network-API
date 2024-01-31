const { connect, connection } = require('mongoose');

const connectionString = ('mongodb+srv://bkness:ziggy@cluster0.pf0alen.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
 
connect(connectionString);

module.exports = connection;
