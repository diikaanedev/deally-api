const authModel = require('../models/auth');

const codePhoneModel = require('../models/code-phone');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');

const { uid } = require('uid');

const StreamChat = require('stream-chat').StreamChat;

const axios = require('axios').default;

const axiosOrange = require('axios');

var dateTime = require('node-datetime');



require('dotenv').config({
    path: './.env'
});

// Define values.
const api_key = 'crwbkpad2e28'
const api_secret = 'cmnxknpmgkf4b2ru6m7wn6b8cgurnfsgwa3csqypbtbbsyf9rzfpn8mptts2xhu2'

// orange api 




exports.store = async (req , res , next) => {
    
    

    try {
        const passwordCrypt = bcrytjs.hashSync(req.body.password, salt);
        
    const auth = authModel() ;
  
    auth.phone = req.body.phone ;

    auth.email = req.body.email ;

    auth.nameShop = req.body.nameShop ;

    auth.firstName = req.body.firstName ;

    auth.lastName = req.body.lastName ;

    auth.cacName = req.body.cacName ;
    
    auth.cacNumber = req.body.cacNumber ;

    auth.role = req.body.role ;

    auth.TypeOfCompany = req.body.TypeOfCompany;

    auth.NameofIDCard  = req.body.NameofIDCard;

    auth.NumberfIDCard  = req.body.NumberfIDCard;

    auth.MaritalStatut  = req.body.MaritalStatut;

    auth.contry = req.body.contry;

    auth.city = req.body.city ;

    auth.hasAcceptedNewsletter = req.body.hasAcceptedNewsletter ;

    auth.nameShop = req.body.nameShop ;

    auth.sexe = req.body.sexe ;
  
    auth.password =  passwordCrypt ;

    auth.passwords = [passwordCrypt]

    auth.role = req.body.role;


    const token = jwt.sign({
        id_user: auth._id,
        roles_user : auth.role , 
        phone_user : auth.phone
    }, process.env.JWT_SECRET, { expiresIn: '8784h' });

    auth.token = token; 
   
    const authSave = await auth.save();
   
      // Initialize a Server Client
    //   const serverClient = StreamChat.getInstance( api_key, api_secret);
    //   // Create User Token
    //   const tokenStream = serverClient.createToken(authSave._id.toString());

    //   authSave.tokenStream = tokenStream ;

          
    authSave.save().then(auth => {
        res.json({
            message: 'Client creer avec succes',
            status: 'OK',
            data: {
                role : authSave.role , 
                phone : authSave.phone , 
                token ,
            },
            statusCode: 201
        });

    }).catch(error => {
        res.status(404).json({
            message: 'Num??ro de t??l??phone d??jas existant',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    });
    
    } catch (error) {
    
        res.status(404).json({
            message: 'Erreur cr??ation',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    
    }
}

exports.auth = async  ( req, res ,_ ) => {
    if (req.body.phone != undefined) return authModel.findOne({
        phone : req.body.phone
    }).then(result => {
        console.log(result);
        if (bcrytjs.compareSync(req.body.password, result.password)) {
            const token = jwt.sign({
                id_user: result.id,
                role_user : result.role , 
                phone_user : result.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
            return res.json({
                message: 'Connection r??ussssi',
                status: 'OK',
                data: {
                    user : result ,
                    token : result.token
                },
                statusCode: 200
            });
        } else {
            return res.status(401).json({
                message: 'Identifiant   Incorrect',
                status: 'NOT OK',
                data:  error,
                statusCode: 401
            });
        }
    }).catch(error => {
        return res.status(401).json({
            message: 'Identifiant des  Incorrect',
            status: 'NOT OK',
            data: error,
            statusCode: 401
        });
    });
}

exports.authDashbord = async  ( req, res ,_ ) => {
    if (req.body.email != undefined) return authModel.findOne({
        email : req.body.email
    }).then(result => {
        console.log(result);
        if (bcrytjs.compareSync(req.body.password, result.password)) {
            const token = jwt.sign({
                id_user: result.id,
                role_user : result.role , 
                phone_user : result.phone
            }, process.env.JWT_SECRET, { expiresIn: '8784h' });
            return res.json({
                message: 'Connection r??ussssi',
                status: 'OK',
                data: {
                    token ,phone: result.phone,role : result.role , 
                    token : result.token
                },
                statusCode: 200
            });
        } else {
            return res.json({
                message: 'Identifiant ff  Incorrect',
                status: 'NOT OK',
                data:  error,
                statusCode: 401
            });
        }
    }).catch(error => {
        return res.json({
            message: 'Identifiant des  Incorrect',
            status: 'NOT OK',
            data: error,
            statusCode: 401
        });
    });
}

exports.findAuth = async (req , res, _ ) =>  {

    const user = await authModel.findById(req.user.id_user).exec();

    console.log(user);

    res.json({ message: 'user connect??e ', data: {
        token : req.token ,user : user
    } ,status: 'OK', statusCode: 200});

}

exports.update = async (req, res ,next ) => {

   
    
    try {
        console.log(req.body);

        const auth = await  authModel.findById(req.user.id_user);
            
        if (req.body.phone!=undefined) {
            auth.phone = req.body.phone ;
        }
        if (req.body.password !=undefined) {
            if (bcrytjs.compareSync(req.body.password, auth.password)) {
                const passwordCrypt = bcrytjs.hashSync(req.body.newPassword, salt);
                auth.passwords = auth.password.push(passwordCrypt);
                auth.password = passwordCrypt ;
            }
    
        }
    
    
        if (req.body.lastName !=undefined) {
            
            auth.lastName = req.body.lastName ;
    
        }
    
        if (req.body.firstName !=undefined) {
            
            auth.firstName = req.body.firstName ;
    
        }
    
        if (req.body.bvn !=undefined) {
            
            auth.bvn = req.body.bvn ;
    
        }
    
        if (req.body.cacNumber !=undefined) {
            
            auth.cacNumber = req.body.cacNumber ;
    
        }
    
        if (req.body.cacName !=undefined) {
            
            auth.cacName = req.body.cacName ;
    
        }
    
        if (req.body.role !=undefined) {
            
            auth.role = req.body.role ;
    
        }

        if (req.body.TypeOfCompany !=undefined) {
            
            auth.TypeOfCompany = req.body.TypeOfCompany;
    
        }

        if (req.body.NameofIDCard !=undefined) {
            
            auth.NameofIDCard = req.body.NameofIDCard;
    
        }

        if (req.body.NumberfIDCard !=undefined) {
            
            auth.NumberfIDCard = req.body.NumberfIDCard;
    
        }

        

        if (req.body.MaritalStatut !=undefined) {
            
            auth.MaritalStatut = req.body.MaritalStatut;
    
        }

        if (req.body.nameShop !=undefined) {
            
            auth.nameShop = req.body.nameShop;
    
        }
        

    
        await  auth.save();
    
    
        const token = jwt.sign({
            id_user: auth._id,
            role_user : auth.role , 
            phone_user : auth.phone
        }, process.env.JWT_SECRET, { expiresIn: '8784h' });
    
    
        return res.json({
            message: 'mise ?? jour r??ussi',
            status: 'OK',
            data: {token , phone : auth.phone , role : auth.role  },
            statusCode: 200
        });

    } catch (error) {
        res.status(404).json({
            message: 'erreur mise ?? jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
          });
    
    }
}   

exports.delete = (req, res , next ) => authModel.findByIdAndDelete(req.user.id_user).then(result => {
    res.json({
        message: 'supr??ssion r??ussi',
        status: 'OK',
        data: null,
        statusCode: 200
    });
}).catch( err => res.status(404).json({
    message: 'erreur supr??ssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
}));

exports.verifNumberValid = async (req, res , next) => {


    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;


    const phoneV = await authModel.findOne({
        phone :req.body.telSender
    })

    console.log('phoneV => ' , phoneV);
    
    if(phoneV==null) {
        const newCode = codePhoneModel();

        newCode.code = num;

        const s = await newCode.save();

        console.log('s => ', num);
        

        const updateCode = async () => {

            const i = await codePhoneModel.findById(s._id);

            i.is_treat = true;

            const j = await i.save();
        }

        setTimeout(updateCode, 180000);

        console.log('d =>' , num);
    


        var data = JSON.stringify({
        "outboundSMSMessageRequest": {
            "address": "tel:"+req.body.telSender,
            "senderAddress": "tel:+224626501651",
            "senderName": "Deally",
            "outboundSMSTextMessage": {
            "message": "Votre code de validation Deally est le suivant: "+num + "\n HxrjxBUsqpA"
            }
        }
        });

        var config = {
        method: 'post',
        url: 'https://api.orange.com/smsmessaging/v1/outbound/tel:+224626501651/requests',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer '+req.accessToken
        },
        data : data
        };

        axiosOrange(config)
        .then(function (response) {
            const obj = Object.assign(response.data);
            res.status(201).json({
                message: 'code envoy?? avec success ',
                status: 'OK',
                data: num,
                statusCode: 201
            })
        })
        .catch(function (error) {
            res.status(404).json({
                message: 'erreur envoie sms phone d??jas utilis?? ',
                status: 'OK',
                data: error,
                statusCode: 404
            })
        });
    }
    else {
        res.status(404).json({
            message: 'phone d??jas utilis?? ',
            status: 'OK',
            data: null,
            statusCode: 404
        })
    }

    
}

exports.verifCode = async (req, res , next ) => {

    const codes = await codePhoneModel.findOne({
        code : req.body.code,
        is_treat : false
    }) ;

    if(codes){
        codes.is_treat = true ;
        await codes.save();
        return res.status(200).json({
            message: 'code valid et verifier',
            status: 'OK',
            data: null,
            statusCode: 200
        })
    }

    return res.status(404).json({
        message: 'code non disponible ',
            status: 'OK',
            data: null,
            statusCode: 404
    })


} 