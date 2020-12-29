const bd=require('./bd')

const pedido = bd.sequelize.define('ERN_T_MOV_PEDIDO', {    
    ID_PEDIDO: {
        type: bd.Sequelize.BIGINT,
        primaryKey: true,

    },
    ID_EMPRESA: {
        type: bd.Sequelize.INTEGER
    },
    ID_PESSOA: {
        type: bd.Sequelize.BIGINT
        
    },
    DATA_PEDIDO:{
        type:bd.Sequelize.DATE
    },
    DATA_PAGAMENTO:{
        type:bd.Sequelize.DATE
    },
    TIPO_PEDIDO:{
        type:bd.Sequelize.TINYINT
    },
    VALOR_SUBTOTAL:{
        type:bd.Sequelize.TINYINT
    },
    VALOR_TAXA:{
        type:bd.Sequelize.DECIMAL
    },
    VALOR_TAXA_TRANSACAO:{
        type:bd.Sequelize.DECIMAL
    },
    VALOR_FRETE:{
        type:bd.Sequelize.DECIMAL
    },
    VALOR_TOTAL:{
        type:bd.Sequelize.DECIMAL
    },
    TIPO_PAGAMENTO:{
        type:bd.Sequelize.INTEGER
    },
    CODIGO_PAGAMENTO:{
        type:bd.Sequelize.STRING
    },
    
    MENSAGEM_PAGAMENTO:{
        type:bd.Sequelize.STRING
    },
    
    STATUS_PAGAMENTO:{
        type:bd.Sequelize.TINYINT
    },
    TIPO_ENTREGA:{
        type:bd.Sequelize.TINYINT
    }
},
{
    freezeTableName: true
},
    {
        
        tableName:'ERN_T_MOV_PEDIDO'

    },
)   
module.exports = pedido