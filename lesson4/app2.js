//参考后完成

const superagent=require('superagent')
const cheerio=require('cheerio')
const express = require('express');
const EventProxy=require('eventproxy')
const app=express()



let hrefHome='https://cnodejs.org'
var ep = new EventProxy();

  superagent.get(hrefHome)
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        console.log('error!!')
      }
      
      var $ = cheerio.load(sres.text);
      let last_comment_href=[]
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element)
        last_comment_href.push(hrefHome+$element.attr('href'))
      })
      let arr=last_comment_href.slice(0,5)
      ep.after('finish',arr.length,function(targets){
        let items=targets.map(function(item){
          let href=item[0]
          let html=item[1]
          let $ = cheerio.load(html)
          let authors=[]

          $('.user_info .reply_author').map(function(index,elem){
              let $element=$(elem)
              authors.push($element.text())
          })
          return {
            title:$('.header .topic_full_title').text().trim(),
            href: href,
            comment:$('.markdown-text').last().text().trim(),
            author:authors[authors.length-1], 
          }
        })

        ep.after('author_fetch',items.length,function(itemsNew){
          itemsNew=itemsNew.map(function(item){
            let itemNew=item[0]
            let html=item[1]
            let $ = cheerio.load(html)
            // console.log($('.user_profile .big').text())
            return{
              title:itemNew.title,
              href:itemNew.href,
              comment:itemNew.comment,
              author:itemNew.author,
              score:$('.user_profile .big').text()
            }
          })
          console.log(itemsNew[0])
        })
        items.map(function(item){
          superagent.get(hrefHome+'/user/'+item.author)
            .end(function(err,res){
              ep.emit('author_fetch',[item,res.text])
            })
        })
        
      })

      arr.map(function(href){
        superagent.get(href)
          .end(function(err,res){
            if(err){
              // console.error(err)
            }
            else{
              console.log('fetch  '+href+'  success')
              ep.emit('finish',[href,res.text])
            }
          })
      })
    });


