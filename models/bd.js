const Sequelize=require('sequelize')
const sequelize= new Sequelize('ernadmin_bd_transmobi','ernadmin_transmobi_user','09!@Mobi2020#$87',{
    host:"186.249.33.194",
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

