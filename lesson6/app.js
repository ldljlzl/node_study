function fibonacci(n){
  if(n===0){
    return 0
  }
  if(n===1){
    return 1
  }

  if(!(Number.isInteger(n))){
      throw new Error('n shoule be a int number')
  }
  if((n<=10)&&(n>=0)){
    
    return (fibonacci(n-1) + fibonacci(n-2))
  }
  else{
    throw new Error('n shoule belong to [0,10]')
  }
}
module.exports=fibonacci
