const bd=require('./bd')

const pessoa = bd.sequelize.define('ERN_T_CAD_PESSOA', {
    ID_PESSOA: {
        type: bd.Sequelize.BIGINT,
        primaryKey: true,

    },

    ID_EMPRESA :{
        type: bd.Sequelize.INTEGER
    },
    ID_PROFISSAO:{
        type:bd.Sequelize.INTEGER
    },
    ID_ESCOLARIDADE:{
        type:bd.Sequelize.INTEGER
    },
    CPF:{
        type:bd.Sequelize.STRING,
    },
    NOME:{
        type:bd.Sequelize.STRING,

    },
    RG:{
        type:bd.Sequelize.STRING
    },
    RG_DATA_EMISSAO:{
        type:bd.Sequelize.DATE
    },
    DATA_NASCIMENTO:{
        type:bd.Sequelize.DATE
    },
    DATA_CADASTRO:{
        type:bd.Sequelize.DATE
    },
    DT_ALTERACAO:{
        type:bd.Sequelize.DATE
    },
    TELEFONE:{
        type:bd.Sequelize.STRING
    },
    CELULAR:{
        type:bd.Sequelize.STRING
    },
    WHATSAPP:{
        type:bd.Sequelize.STRING
    },
    SEXO:{
        type:bd.Sequelize.TINYINT
    },
    NOME_PAI:{
        type:bd.Sequelize.STRING
    },
    NOME_MAE:{
        type:bd.Sequelize.STRING
    },
    CEP:{
        type:bd.Sequelize.INTEGER
    },
    UF:{
        type:bd.Sequelize.STRING
    },
    CIDADE:{
        type:bd.Sequelize.STRING
    },
    BAIRRO:{
        type:bd.Sequelize.STRING
    },
    NUMERO:{
        type:bd.Sequelize.INTEGER
    },
    STATUS:{
        type:bd.Sequelize.TINYINT
    }
},
{
    freezeTableName: true
},
{ 
    tableName:'ERN_T_CAD_PESSOA'
}

);

module.exports = pessoa

