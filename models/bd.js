const Sequelize=require('sequelize')
const sequelize= new Sequelize('bdtransmob_dv1','bdtransmob_dv1','Trans12#$Mobi',{
    host:"bdtransmob_dv1.mysql.dbaas.com.br",
    dialect: 'mysql'
})  

sequelize.authenticate().then(function(){
    console.log('conctado na porta 8081 ')
}).catch(function(erro){
    console.log('falha ao se conectar ' + erro)
})


module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
}

