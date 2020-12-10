const express= require("express");
const app= express();
const bodyParser=require('body-parser')
const Escolaridade = require("./models/Escolaridade");
const Pedidos = require("./models/Pedidos");
const pessoas= require("./models/CadPessoas");
const { sequelize } = require("./models/bd");
const { Op } = require("sequelize");


app.use(require("cors")());

    //config body parser    
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
 
    //TESTE de consumir a api da tabela ERN_T_CAD_ESCOLARIDADE
    app.get('/home', function(req,res){
        Escolaridade.findAll({attributes:["ID_ESCOLARIDADE","DESCRICAO","STATUS"]}
        ).then(function(cadEscolar){
            res.send(cadEscolar);
            
        })
       
    });
    
    //PEDIDOS FEITOS
    app.get('/pedidosfeitos',function(req,res){
        Pedidos.hasMany(pessoas, {
            foreignKey: 'ID_PESSOA'
          }); 
         Pedidos.findAll({
             attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","TIPO_PAGAMENTO","STATUS_PAGAMENTO","URL_PAGAMENTO","TIPO_PEDIDO"],
             include:[{
                model:pessoas,
                required:true,
                attributes: ['NOME','CPF','EMAIL','CELULAR'], 
             }]
         }).then(function(ped){
            res.send(ped); 
        });        
         });
     
    //CARTAO
    app.get('/cartao',function(req,res){
            Pedidos.hasMany(pessoas, {
                foreignKey: 'ID_PESSOA'
              }); 
             Pedidos.findAll({
                 attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","URL_PAGAMENTO","TIPO_PAGAMENTO"],
                    include:[{
                    model:pessoas,
                    required:true,
                    attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                 }], where:{
                    TIPO_PEDIDO:1
                  }
             }).then(function(ped){
                res.send(ped); 
            });        
             });

     //RECARGA
    app.get('/recarga',function(req,res){
                Pedidos.hasMany(pessoas, {
                    foreignKey: 'ID_PESSOA'
                  }); 
                 Pedidos.findAll({
                     attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","URL_PAGAMENTO","TIPO_PAGAMENTO"],
                     include:[{
                        model:pessoas,
                        required:true,
                        attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                     }], where:{
                        TIPO_PEDIDO:0
                      }
                 }).then(function(ped){
                    res.send(ped); 
                });        
                 });

    //boletos gerados e não pagos
    app.get('/boletosnaopagos',function(req,res){
                    Pedidos.hasMany(pessoas, {
                        foreignKey: 'ID_PESSOA'
                      }); 
                     Pedidos.findAll({
                         attributes:["ID_PESSOA","DATA_PEDIDO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO"],
                            include:[{
                            model:pessoas,
                            required:true,
                            attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                         }], where:{
                            TIPO_PAGAMENTO:2,
                            [Op.or]:[
                                {STATUS_PAGAMENTO:8},
                                {STATUS_PAGAMENTO:9}
                            ]
                          }
                     }).then(function(ped){
                        res.send(ped); 
                    });        
                     });

    //boletos gerados e pagos
    app.get('/boletospagos',function(req,res){
                    Pedidos.hasMany(pessoas, {
                        foreignKey: 'ID_PESSOA'
                      }); 
                     Pedidos.findAll({
                         attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO"],
                            include:[{
                            model:pessoas,
                            required:true,
                            attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                         }], where:{
                            TIPO_PAGAMENTO:2,
                            [Op.or]:[
                                {STATUS_PAGAMENTO:0},
                                {STATUS_PAGAMENTO:1}
                            ]
                            
                          }
                     }).then(function(ped){
                        res.send(ped); 
                    });        
                     });

    //Pagamentos com cartão
    app.get('/pagamentoscartao',function(req,res){
                        Pedidos.hasMany(pessoas, {  
                            foreignKey: 'ID_PESSOA'
                        }); 
                        Pedidos.findAll({
                            attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO"],
                                include:[{
                                model:pessoas,
                                required:true,
                                attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                            }], where:{
                                TIPO_PAGAMENTO:1,
                                [Op.or]:[
                                    {STATUS_PAGAMENTO:0},
                                    {STATUS_PAGAMENTO:1}
                                ]
                            }
                        }).then(function(ped){
                            res.send(ped); 
                        });        
                        });

    //Creditos Liberados
    app.get('/credliberados',function(req,res){
                    Pedidos.hasMany(pessoas, {
                        foreignKey: 'ID_PESSOA'
                      }); 
                     Pedidos.findAll({
                         attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO"],
                            include:[{
                            model:pessoas,
                            required:true,
                            attributes: ['NOME','CPF'], 
                         }], where:{
                            TIPO_PEDIDO:0,
                            [Op.or]:[
                                {STATUS_PAGAMENTO:0},
                                {STATUS_PAGAMENTO:1}
                            ]
                          }
                     }).then(function(ped){
                        res.send(ped); 
                    });        
                     });

    //financeiro vendas valores dos cartoes.

    app.post('/finaceiroCartao2',function(req,res){
        
        const {inicial,final} = req.body;
        var data1=inicial;
        var data2=final;
        
        Pedidos.findAll({
            attributes:[
            "TIPO_PEDIDO",
            [sequelize.fn('COUNT',sequelize.col('TIPO_PEDIDO')),'Quantidade_de_Pedido'],
            [sequelize.fn('SUM', sequelize.col('VALOR_TOTAL')), 'Valor_Total']

            ],where:{ 
                TIPO_PEDIDO:1,
                DATA_PAGAMENTO:{
                    [Op.between]:[data1, data2]
                },   
            }
        }).then(function(ped){
            res.send(ped); 
            
        });   
    });  
    
     //financeiro vendas valores dos creditos.
     app.post('/finaceiroRecarga',function(req,res){
        const {inicial,final} = req.body;
        var data1=inicial;
        var data2=final;

        Pedidos.findAll({
            attributes:[
            "TIPO_PEDIDO",
            [sequelize.fn('COUNT',sequelize.col('TIPO_PEDIDO')),'Quantidade_de_Pedido'],
            [sequelize.fn('SUM', sequelize.col('VALOR_TOTAL')), 'Valor_Total']
        ],where:{ 
                TIPO_PEDIDO:0,
                DATA_PAGAMENTO:{
                    [Op.between]:[data1, data2],
                },
            }
        }).then(function(ped){
            res.send(ped); 
        }); 
    });  

    

    app.listen(8081);

         
    
        