//参考后未完成

const express=require('express')
const cheerio=require('cheerio')
const superagent=require('superagent')
const eventproxy=require('eventproxy')

const ep=new eventproxy();
const urlHome='https://cnodejs.org'

superagent.get(urlHome)
    .end(function(err,res){
        if(err){
            console.log(err)
        }
        else{
            let items=[]
            let persons=[]
            let $=cheerio.load(res.text)
            $('.topic_title_wrapper .topic_title').each(function(index,elem){
                let $element=$(elem)
                items.push({
                    title:$element.attr('title'),
                    href:$element.attr('href')
                })
            })
            $('.user_avatar img').map(function(index,elem){
                items[index].author=$(elem).attr('title')
            })
            $('.cell .last_time ').map(function(index,elem){                
                let temp=$(elem).attr('href')
                let urlPerson=urlHome+temp
                persons.push(urlPerson)  
            })
            fewPersons=persons.slice(0,5);
            let ep=eventproxy.create('title',function(title){
                
            })

        }
    })