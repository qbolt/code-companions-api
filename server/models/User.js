var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://fujfntzw:KPGbWEPIl_qrZ8hHCjqqHnB8VT4hfsC8@babar.elephantsql.com:5432/fujfntzw', { define: { underscored: true } });

var User = sequelize.define('user', {
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    profile_pic: {
        type: Sequelize.STRING,
        defaultValue: '/images/uploads/guest.png'
    },
    password: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verification_code: {
        type: Sequelize.STRING
    }
})

module.exports = User