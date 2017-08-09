const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://fujfntzw:KPGbWEPIl_qrZ8hHCjqqHnB8VT4hfsC8@babar.elephantsql.com:5432/fujfntzw',{define: {underscored: true}});

module.exports = sequelize.define('project_listing', {
    project_creator: {
        type: Sequelize.JSON
    },
    project_description: {
        type: Sequelize.STRING
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },
    num_devs_needed: {
        type: Sequelize.INTEGER
    },
    num_devs_accepted: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING //opens or closed.
    }
});