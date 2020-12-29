const bd = require('./bd')


const escolaridade = bd.sequelize.define('Escolaridade', {
    ID_ESCOLARIDADE: {
        type: bd.Sequelize.INTEGER
    },
    DESCRICAO: {
        type: bd.Sequelize.STRING
    },
    STATUS: {
        type: bd.Sequelize.TINYINT
    }
},

    
    {freezeTableName: true,
        tableName:'ERN_T_CAD_ESCOLARIDADE'
    },
   
    );
    

module.exports = escolaridade