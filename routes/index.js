const express = require('express'),
    Router = express.Router(),
    { url } = require('../config/config'),
    { check } = require('express-validator/check'),
    { checkSchema } = require('express-validator/check'),
    TioRicoController = require('../controllers/tioricoController')

Router
    /*
        Get transaction
    */
   .post( url.urlV1 + '/users/signin',[
       check('userNick').exists().isString(),
       check('userPassword').exists().isString(),
       check('userFirstName').exists().isString(),
       check('userLastName').exists().isString(),
       check('idHouse').exists().isInt()
   ], TioRicoController.register)

    /*
        Get transaction
    */
   .post( url.urlV1 + '/users/login', [
        check('userNick').exists().isString(),
        check('userPassword').exists().isString(),
   ],TioRicoController.login)

    /*
        Get transaction
    */
    .post( url.urlV1 + '/transactions',[
        check('idUser').exists().isInt().withMessage('Debe ser un número entero.'),
        check('clientName').exists().isString(),
        check('clientAddress').exists().isString(),
        check('clientDocumentNumber').exists().isInt().withMessage('Debe ser un número entero.'),
        checkSchema({
            clientDocumentType:{
                exists: true,
                isString: true,
                isIn: {
                    options: [['DNI']],
                    errorMessage: 'Opciones válidas: DNI'
                },
                errorMessage: 'No válido'
            },
            transactionType:{
                exists:true,
                isString:true,
                isIn: {
                    options: [['COMPRAR','VENDER']],
                    errorMessage: 'Opciones válidas: COMPRAR,VENDER'
                },
                errorMessage: 'No válido'
            }
        }),
        check('quantity').exists().isFloat(),
    ], TioRicoController.save)

    /*
        Get transaction
    */
    .get( url.urlV1 + '/transactions',[
        checkSchema({
            idHouse:{
                in:['query'],
                isInt: true
            }
        })
    ], TioRicoController.getTransaction)


module.exports = Router