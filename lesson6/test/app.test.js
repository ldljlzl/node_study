const expect=require('chai').expect
const fibonacci=require('../app')
console.log(fibonacci(0))
describe('app.test.js',function(){
    it('should equal 0 when n===0',function(){
        expect(fibonacci(0)).to.equal(0)
    })
    it('should equal 1 when n===1',function(){
        expect(fibonacci(1)).to.equal(1)
    })
    it('should equal 55 when n===10',function(){
        expect(fibonacci(10)).to.equal(55)
    })
    it('should throw when n<0',function(){
        expect(function(){
            fibonacci(-1)
        }).to.throw('n shoule belong to [0,10]')
    })
    it('should throw when n>10',function(){
        expect(function(){
            fibonacci(11)
        }).to.throw('n shoule belong to [0,10]')
    })
    it('should throw when n not be a number',function(){
        expect(function(){
            fibonacci('11')
        }).to.throw('n shoule be a int number')
    })
    it('should throw when typeof n not be int',function(){
        expect(function(){
            fibonacci(1.1)
        }).to.throw('n shoule be a int number')
    })
})
