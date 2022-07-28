const authModel = require('../models/auth');

const bcrytjs = require('bcryptjs');

const salt = bcrytjs.genSaltSync(10);

const jwt = require('jsonwebtoken');

const { uid } = require('uid');

const StreamChat = require('stream-chat').StreamChat;

const axios = require('axios').default;

require('dotenv').config({
    path: './.env'
});

// Define values.
const api_key = 'crwbkpad2e28'
const api_secret = 'cmnxknpmgkf4b2ru6m7wn6b8cgurnfsgwa3csqypbtbbsyf9rzfpn8mptts2xhu2'



exports.store = async (req , res , next) => {
    
    

    try {
        const passwordCrypt = bcrytjs.hashSync(req.body.password, salt);
        
    const auth = authModel() ;
  
    auth.phone = req.body.phone ;

    auth.email = req.body.email ;

    auth.nameShop = req.body.nameShop ;

    auth.firstName = req.body.firstName ;

    auth.lastName = req.body.lastName ;

    auth.role = req.body.role ;

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
                roles : authSave.roles , 
                phone : authSave.phone , 
                token ,
            },
            statusCode: 201
        });

    }).catch(error => {
        res.json({
            message: 'Numéro de téléphone déjas existant',
            statusCode: 404,
            data:  error,
            status: 'NOT OK'
          });
    });
    
    } catch (error) {
    
        res.json({
            message: 'Erreur création',
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
                message: 'Connection réussssi',
                status: 'OK',
                data: {
                    user : result ,
                    token : result.token
                },
                statusCode: 200
            });
        } else {
            return res.json({
                message: 'Identifiant   Incorrect',
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
                message: 'Connection réussssi',
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

    res.json({ message: 'user connectée ', data: {
        token : req.token ,user : user
    } ,status: 'OK', statusCode: 200});

}

exports.update = async (req, res ,next ) => {
    try {
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

        if (req.body.role !=undefined) {
            
            auth.role = role ;

        }

        const token = jwt.sign({
            id_user: auth._id,
            role_user : auth.role , 
            phone_user : auth.phone
        }, process.env.JWT_SECRET, { expiresIn: '8784h' });

        // auth.save();

        res.json({
            message: 'mise à jour réussi',
            status: 'OK',
            data: {token , phone : auth.phone , role : auth.role  },
            statusCode: 200
        });

    } catch (error) {
        res.json({
            message: 'erreur mise à jour ',
            statusCode: 404,
            data: error,
            status: 'NOT OK'
          });
    
    }
}   

exports.delete = (req, res , next ) => authModel.findByIdAndDelete(req.user.id_user).then(result => {
    res.json({
        message: 'supréssion réussi',
        status: 'OK',
        data: null,
        statusCode: 200
    });
}).catch( err => res.json({
    message: 'erreur supréssion ',
    statusCode: 404,
    data: error,
    status: 'NOT OK'
  }));