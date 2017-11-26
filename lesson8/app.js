const express=require('express')
let fibonacci = function (n) {
  // typeof NaN === 'number' 是成立的，所以要判断 NaN
  if (typeof n !== 'number' || isNaN(n)) {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0')
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
}
let app=express()
app.get('/fib',function(req,res){
  console.log(req.query)
  res.send(String(req.url))
})
app.listen(3000,function(){
  console.log('listening at 3000')
})                                                                                                  