const bd=require('./bd');

const pessoasbeneficio = bd.sequelize.define('pessoasbeneficio',{

    ID_PESSOA_BENEFICIO: {
        type: bd.Sequelize.BIGINT,
        primaryKey: true,

    },
    ID_PESSOA: {
        type: bd.Sequelize.BIGINT,
        foreignkey:true,
    },  
    ID_BENEFICIO:{
        type:bd.Sequelize.INTEGER
    },
    NUMERO_CARTAO:{
        type:bd.Sequelize.STRING,
    },
    STATUS:{
        type:bd.Sequelize.TINYINT
    }

},
    {
        tableName:'ERN_T_CAD_PESSOA_BENEFICIO'

    })

    module.exports = pessoasbeneficio
