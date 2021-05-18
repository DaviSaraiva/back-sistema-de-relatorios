const Sequelize=require('sequelize')
const sequelize= new Sequelize('#','#','#',{
    host:"#",
    dialect: '#',
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



