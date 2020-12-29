const bd=require('./bd');

const pessoasbeneficio = bd.sequelize.define('ERN_T_CAD_PESSOA_BENEFICIO',{

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
    freezeTableName: true
},
    {   
        
        tableName:'ERN_T_CAD_PESSOA_BENEFICIO'
    }
    
    );

    module.exports = pessoasbeneficio
