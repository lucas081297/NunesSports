const mysql = require('../mysql');
const express = require('express');

exports.getAllProducts = async (req,res,next)=>{
  try{
    const result = await mysql.execute('SELECT * FROM Produtos')
    return res.status(200).json(result);
  } catch(error){
    return res.status(500).json(error)
  }
}

exports.addProduct = async(req,res,next)=>{
  try{
    const result = await mysql.execute('INSERT INTO Produtos (nome,preco,descricao) VALUES(?,?,?)',[req.body.nome,req.body.preco,req.body.desc])
    return res.status(200).json(result)
  } catch(error){
    return res.status(500).send({error:error})
  }
}

exports.editProduct = async(req,res,next) => {
  try{
    const result = await mysql.execute('SELECT * FROM Produtos WHERE cod =?',[req.body.cod])
    if(result.length<1){
      throw 'Produto não encontrado'
    }
    else{
      try{
        const result = await mysql.execute('UPDATE Produtos SET nome=?,preco=?,descricao=? WHERE cod=?',[req.body.nome,req.body.preco,req.body.desc,req.body.cod])
        return res.status(200).json(result)
      } catch(error){
        console.log(error)
        return res.status(500).send('error')
      }
    }
  } catch(error){
    return res.status(500).send({error:error})
  }
}

exports.deleteProduct = async(req,res,next)=>{
  try{
    const result = await mysql.execute('DELETE FROM Produtos WHERE cod=?',[req.body.cod])
    return res.status(200).json(result)
  } catch(error){
    return res.status(500).send({error:error})
  }
}
