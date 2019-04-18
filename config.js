var config = {};

// Sql Server config
config.dbConfig = {
    // SQL Server Login with read permission to PI ML SQL Database
    user: 'user_name',
    // Password of SQL Server Login
    password: 'pass_word',
    // SQL Server Name, Example: Machine_Name\SQLEXPRESS
    server: `SQL_SERVER`,
    // Default is 'PimlWindows'
    database: 'Sql_Db'
};

// Google Maps API Key
config.apiKey = 'your_api_key_here';
/* Port to run Server on
   See ./gulpfile.js for definition of prcess.env.PORT */
config.port = process.env.PORT || 5000;
// Name of machine that Server is running on
config.host = 'localhost';
// Title of the Web Page
config.title = 'PI ML Geolocation';

module.exports = config;