const superagent=require('superagent')
const cheerio=require('cheerio')
const express = require('express');
const EventProxy=require('eventproxy')
const app=express()
const xlsx = require('node-xlsx')
const fs = require('fs');



let ii=300004
let end=300501
let timer=setInterval(lzl,1000)
let list=[]
list.push(['公司代码','公司简称','公司全称','董事长','董事长简介','总经理','董事会秘书','公司网址','联系方式','邮箱','创立时间','产品','公司地址','上市日期','区域','所属行业'])
function lzl(){
  url1='http://emweb.securities.eastmoney.com/PC_HSF10/CompanySurvey/CompanySurveyAjax?code=sz'+ii.toString()
  url2='http://emweb.securities.eastmoney.com/PC_HSF10/CompanyManagement/CompanyManagementAjax?code=sz'+ii.toString()
  superagent.get(url1) 
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        console.log('error!!')
      }
      let $ = cheerio.load(sres.text)
      let infoCompany=JSON.parse($('body').text())
      let info={
            index:'',
            agjc:'',//
            gsmc:'',//
            dsz:'',
            dszjj:'',
            zjl:'',
            dm:'',
            gswz:'',
            lxdh:'',
            dzxx:'',
            clrq:'',
            gsjj:'',
            bgdz:'',
            ssrq:'',//
            qy:'',//
            sshy:'',//
        }
      info.index=ii.toString()
      if(infoCompany.Result.jbzl.agjc){
        info.agjc=infoCompany.Result.jbzl.agjc
      }else{
        info.agjc=''  
      }
      if(infoCompany.Result.jbzl.gsmc){
        info.gsmc=infoCompany.Result.jbzl.gsmc
      }else{
        info.gsmc=''  
      }

      if(infoCompany.Result.jbzl.dsz){
        info.dsz=infoCompany.Result.jbzl.dsz
      }else{
        info.dsz=''  
      }
      if(infoCompany.Result.jbzl.zjl){
        info.zjl=infoCompany.Result.jbzl.zjl
      }else{
        info.zjl=''  
      }
      if(infoCompany.Result.jbzl.dm){
        info.dm=infoCompany.Result.jbzl.dm
      }else{
        info.dm=''  
      }
      if(infoCompany.Result.jbzl.gswz){
        info.gswz=infoCompany.Result.jbzl.gswz
      }else{
        info.gswz=''  
      }
      if(infoCompany.Result.jbzl.lxdh){
        info.lxdh=infoCompany.Result.jbzl.lxdh
      }else{
        info.lxdh=''  
      }
      if(infoCompany.Result.jbzl.dzxx){
        info.dzxx=infoCompany.Result.jbzl.dzxx
      }else{
        info.dzxx=''  
      }
      if(infoCompany.Result.fxxg.clrq){
        info.clrq=infoCompany.Result.fxxg.clrq
      }else{
        info.clrq=''  
      }
      if(infoCompany.Result.jbzl.gsjj){
        info.gsjj=infoCompany.Result.jbzl.gsjj
      }else{
        info.gsjj=''  
      }
      if(infoCompany.Result.jbzl.bgdz){
        info.bgdz=infoCompany.Result.jbzl.bgdz
      }else{
        info.bgdz=''  
      }  
      if(infoCompany.Result.fxxg.ssrq){
        info.ssrq=infoCompany.Result.fxxg.ssrq
      }else{
        info.ssrq=''  
      }
      if(infoCompany.Result.jbzl.qy){
        info.qy=infoCompany.Result.jbzl.qy
      }else{
        info.qy=''  
      }  
      if(infoCompany.Result.jbzl.sshy){
        info.sshy=infoCompany.Result.jbzl.sshy
      }else{
        info.sshy=''  
      }  

        superagent.get(url2) 
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    console.log('error!!')
                }
                //   console.log(sres.text)
                let $ = cheerio.load(sres.text)
                let infoManager=JSON.parse($('body').text())
                if(infoManager.Result.RptManagerList[0]){
                    info.dszjj=infoManager.Result.RptManagerList[0].jj
                }else{
                    info.dszjj=''
                }
                
                list.push([info.index,info.agjc,info.gsmc,info.dsz,info.dszjj,info.zjl,info.dm,info.gswz,info.lxdh,info.dzxx,info.clrq,info.gsjj,info.bgdz,info.ssrq,info.qy,info.sshy])
                if(ii<end){
                    ii++
                    console.log(ii)
                }else{
                    clearInterval(timer)
                    let data=[{
                        name:'sheet1',
                        data:list
                    }]
                    buffer = xlsx.build(data)
                    fs.writeFile('./resut.xls', buffer, function (err)
                    {
                        if (err)
                            throw err;
                        console.log('Write to xls has finished');
                        
                    // 读xlsx
                        var obj = xlsx.parse("./" + "resut.xls");
                        console.log(JSON.stringify(obj));
                    }
                    );
                }
            })
    })

}