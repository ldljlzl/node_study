
//独立完成的版本

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
            fewPersons=persons.slice(0,5)
            function lzl(){
                console.log('hi')
            }
            let lzl1=[]
            fewPersons.map(function(url,index){
                let _index=index
                superagent.get(url)
                    .end(function(err,res){
                        if(err){
                            console.log(err)
                        }
                        else{
                            let $=cheerio.load(res.text)
                            let urls=[]   
                            let comments=[]
                            let itemsNew=items
                            $('.cell .user_avatar').map(function(index,elem){
                                let $element=$(elem)
                                urls.push($element.attr('href'))
                            })
                            $('.markdown-text p').map(function(index,elem){
                                let $element=$(elem)
                                comments.push($element.text())
                            })
                            itemsNew[_index].comment=comments[comments.length-1]
                            itemsNew[_index].author=urls[urls.length-1].split('/')[2]
                            superagent.get(urlHome+urls[urls.length-1])
                                .end(function(err,res){
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        let $=cheerio.load(res.text)
                                        let itemsNewNew=itemsNew[_index]
                                        itemsNewNew.score=Number($('.unstyled .big').text())
                                        console.log(itemsNewNew)
                                    }
                                })
                              
                        }
                    })
            })
        }
    })