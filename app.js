const express= require("express");
const app= express();
const bodyParser=require('body-parser')
const Escolaridade = require("./models/Escolaridade");
const Pedidos = require("./models/Pedidos");
const pessoas= require("./models/CadPessoas");
const pessoasbeneficio=require("./models/CadPessoaBeneficio");
const { sequelize } = require("./models/bd");
const { Op } = require("sequelize");
const bd= require("./models/bd")


app.use(require("cors")(
    
));

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
        Pedidos.belongsTo(pessoas, {
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
            Pedidos.belongsTo(pessoas, {
                foreignKey: 'ID_PESSOA'
              }); 
             Pedidos.findAll({
                 attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","URL_PAGAMENTO","TIPO_PAGAMENTO","VALOR_TOTAL"],
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
                Pedidos.belongsTo(pessoas, {
                    foreignKey: 'ID_PESSOA'
                  }); 
                 Pedidos.findAll({
                     attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","URL_PAGAMENTO","TIPO_PAGAMENTO","VALOR_TOTAL"],
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
                    Pedidos.belongsTo(pessoas, {
                        foreignKey: 'ID_PESSOA'
                      }); 
                     Pedidos.findAll({
                         attributes:["ID_PESSOA","ID_PEDIDO","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","VALOR_TOTAL"],
                            include:[{
                            model:pessoas,
                            required:true,
                            attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                         }], where:{
                            TIPO_PAGAMENTO:2,
                            [Op.or]:[
                                {STATUS_PAGAMENTO:8},
                                {STATUS_PAGAMENTO:9},
                                {STATUS_PAGAMENTO:0}

                            ]
                          }
                     }).then(function(ped){
                        res.send(ped); 
                    });        
                     });

    //boletos gerados e pagos
    app.get('/boletospagos',function(req,res){
                    Pedidos.belongsTo(pessoas, {
                        foreignKey: 'ID_PESSOA'
                      }); 
                     Pedidos.findAll({
                         attributes:["ID_PESSOA","ID_PEDIDO","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO","VALOR_TOTAL"],
                            include:[{
                            model:pessoas,
                            required:true,
                            attributes: ['NOME','CPF','EMAIL','CELULAR'], 
                         }], where:{
                            TIPO_PAGAMENTO:2,
                            [Op.or]:[
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
                            attributes:["ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO","VALOR_TOTAL"],
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

    //Creditos Pagos
    app.get('/credPagos',function(req,res){
                    Pedidos.belongsTo(pessoas, {
                        foreignKey: 'ID_PESSOA',
                      }); 
                    Pedidos.belongsTo(pessoasbeneficio, {
                        foreignKey: 'ID_PESSOA',
                      }); 
            
                     Pedidos.findAll({
                         attributes:["ID_PEDIDO","ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO","VALOR_TOTAL","STATUS_LIBERADO"],
                         include:[{
                            model:pessoas,
                            required:false,
                            attributes: ['NOME','CPF'], 
                         },
                        {
                            model:pessoasbeneficio,
                            required:false,
                            attributes: ['NUMERO_CARTAO'], 

                        }],
                         where:{
                                TIPO_PEDIDO:0,
                                STATUS_PAGAMENTO:1,
                                STATUS_LIBERADO:false,
                         }
                     }).then(function(ped){
                        res.send(ped); 
                    });        
                     });

    //depois que o creditos estiver pago clicar e ele atualizar a tabela enviando pra tabela de liberados 
    app.post('/liberarcredito',async function(req,res){
        const {pedido_id}=req.body;        
        const [results, metadata] = await bd.sequelize.query("UPDATE ERN_T_MOV_PEDIDO SET STATUS_LIBERADO = :status  WHERE ID_PEDIDO = :id",
        {replacements: { status: true, id: pedido_id }}
        );
        
        Pedidos.hasMany(pessoas, {
                        foreignKey: 'ID_PESSOA'
            }); 
        Pedidos.hasMany(pessoasbeneficio, {
                        foreignKey: 'ID_PESSOA'
                      }); 

         Pedidos.findAll({
             attributes:["ID_PEDIDO","ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO","VALOR_TOTAL","STATUS_LIBERADO"],
             include:[{
                model:pessoas,
                required:false,
                attributes: ['NOME','CPF'], 
             },
            {
                model:pessoasbeneficio,
                required:false,
                attributes: ['NUMERO_CARTAO'], 

            }],
             where:{
                    TIPO_PEDIDO:0,
                    STATUS_PAGAMENTO:1,
                    STATUS_LIBERADO:false,
             }
         }).then(function(ped){
            res.send(ped); 
        }); 
          
    })


    //creditos que foram Liberados das outra tabela
    app.get('/credLiberados',function(req,res){
        Pedidos.hasMany(pessoas, {
            foreignKey: 'ID_PESSOA'
          }); 
        Pedidos.hasMany(pessoasbeneficio, {
            foreignKey: 'ID_PESSOA'
          }); 
                
    Pedidos.findAll({
        attributes:["ID_PEDIDO","ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO","VALOR_TOTAL","STATUS_LIBERADO"],
        include:[{
        model:pessoas,
        required:false,
        attributes: ['NOME','CPF'], 
    },
{
        model:pessoasbeneficio,
        required:false,
        attributes: ['NUMERO_CARTAO'], 
    }],
    where:{
        TIPO_PEDIDO:0,
        STATUS_PAGAMENTO:1,
        STATUS_LIBERADO:true,
 }
        }).then(function(ped){
        res.send(ped); 
        });        
    });
    
    //post pra atualizar retirar da tabela de liberados em casa de erro
    app.post('/retornacredito', async function(req,res){
        const {pedido_id}=req.body;        
        const [results, metadata] = await bd.sequelize.query("UPDATE ERN_T_MOV_PEDIDO SET STATUS_LIBERADO = :status  WHERE ID_PEDIDO = :id",
        {replacements: { status: false, id: pedido_id }}
        );

        Pedidos.hasMany(pessoas, {
            foreignKey: 'ID_PESSOA'
          }); 
        Pedidos.hasMany(pessoasbeneficio, {
            foreignKey: 'ID_PESSOA'
          }); 

            Pedidos.findAll({
            attributes:["ID_PEDIDO","ID_PESSOA","DATA_PEDIDO","DATA_PAGAMENTO","MENSAGEM_PAGAMENTO","STATUS_PAGAMENTO","TIPO_PEDIDO","TIPO_PAGAMENTO","URL_PAGAMENTO","VALOR_TOTAL","STATUS_LIBERADO"],
            include:[{
                model:pessoas,
                required:false,
                attributes: ['NOME','CPF'], 
            },
            {
                model:pessoasbeneficio,
                required:false,
                attributes: ['NUMERO_CARTAO'], 

            }],
            where:{
                    TIPO_PEDIDO:0,
                    STATUS_PAGAMENTO:1,
                    STATUS_LIBERADO:true,
            }
            }).then(function(ped){
            res.send(ped); 
            });         
    });
       
    
    app.post('/finaceirogeral',function(req,res){
        const {inicial,final,tipo,status} = req.body;
        var data1=inicial;
        var data2=final;
        var TipoPedido=tipo;
        var sta=status;

        Pedidos.findAll({
            required:false,
            attributes:[
            "TIPO_PEDIDO","STATUS_PAGAMENTO",
            [sequelize.fn('COUNT',sequelize.col('TIPO_PEDIDO')),'Quantidade_de_Pedido'],
            [sequelize.fn('SUM', sequelize.col('VALOR_TOTAL')), 'Valor_Total']
        ],where:{ 
                TIPO_PEDIDO:TipoPedido,
                STATUS_PAGAMENTO:sta,
                DATA_PEDIDO:{
                    [Op.between]:[data1, data2],
                },
            },
        }).then(function(ped){
            res.send(ped); 
        }); 
    }); 
    


    
    

    app.listen(8081);

         
    
        