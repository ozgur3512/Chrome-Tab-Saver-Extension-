
let mailarr=["https://outlook.live.com/","https://mail.google.com/"]
let socailmed=["https://www.instagram.com","https://www.facebook.com"]
let mining=["https://the.hiveos.farm/","https://ergo.herominers.com/","https://whattomine.com/"]
let tabArray=[]
let buttonArray=[]
let idArray=[]
const socialEl=document.getElementById("social-el")
const mailEl=document.getElementById("email-el")
const saveEl=document.getElementById("save-tab")
const ulEl=document.getElementById("ul-el")
const groupEl=document.getElementById("new-group")
const Ingroup=document.getElementById("groups")
const inputEl=document.getElementById("input-el-gr")
const inputElNormal=document.getElementById("input-el")
const miningEl=document.getElementById("mining-el")
const deleteEl=document.getElementById("delete-tab")
const clear=document.getElementById("clear-all-data")
const error_mes=document.getElementById("Error")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const leadsFromLocalStorage2 = JSON.parse( localStorage.getItem("button") )
let leadsFromLocalStorage3 = JSON.parse( localStorage.getItem("values") )

clear.addEventListener("click",function(){
    localStorage.clear()
})

if (leadsFromLocalStorage) {
    tabArray = leadsFromLocalStorage
    
    render()
}

if (leadsFromLocalStorage2) {
    buttonArray=leadsFromLocalStorage2
    
    Buttonrender()
}
if(leadsFromLocalStorage3){
    RenderGroupButton()
}

inputElNormal.addEventListener("keypress",function(e){
    x=0
    for(let i=0;i<inputElNormal.value.length;i++){
        if(inputElNormal.value[i]==="."){
            x+=1
        }
    }

    if (e.key === 'Enter' && x>0) {
        ulEl.innerHTML=
        `
        <li>
        <a target="_blank" href=${inputElNormal.value}>${inputElNormal.value}}</a>
        <hr>
        </li>
        `
        
        tabArray.push(inputElNormal.value)
        render()
        inputElNormal.value=""
    }
})
inputElNormal.addEventListener("click",function(e){
    if(inputElNormal.value==="You can type your web page and hit enter to save..."){
        inputElNormal.value=""
    }
})
socialEl.addEventListener("click",function(){
    for(let i=0;i<socailmed.length;i++){
        window.open(socailmed[i],"_blank")
        window.focus()
    }
    
})
deleteEl.addEventListener("dblclick",function(){
    tabArray=[]
    localStorage.removeItem("myLeads")
    
    ulEl.innerHTML=""

})
miningEl.addEventListener("click",function(){
    for(let i=0;i<mining.length;i++){
        window.open(mining[i],"_blank")
        window.focus()
    }
    
})

mailEl.addEventListener("click",function(){
    for(let i=0;i<mailarr.length;i++){
        
        window.open(mailarr[i],"_blank")
        window.focus()
    }
    
})

saveEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if(!(tabs[0].url==="chrome://extensions/"))
        {
        tabArray.push(tabs[0].url)
        render()
        }
       
    })
})



groupEl.addEventListener("dblclick",function(){
    x=0
   for(let i=0;i<inputEl.value.length;i++){
       if(inputEl.value[i]===" "){
           x+=1
       }
   }
   if(x===0){
        if(!(inputEl.value=="") && tabArray){
            Ingroup.innerHTML+=`
            <button id=${inputEl.value} >${inputEl.value}</button>
            `
                if(JSON.parse(localStorage.getItem("values"))){
                    idArray=JSON.parse(localStorage.getItem("values"))
                    idArray.push(inputEl.value)
                    localStorage.setItem("values",JSON.stringify(idArray))
                }
                else{
                idArray.push(inputEl.value)
                localStorage.setItem("values",JSON.stringify(idArray))
                }
            localStorage.setItem(inputEl.value,JSON.stringify(tabArray))
            
            tabArray=[]
            ulEl.innerHTML=""
            localStorage.removeItem("myLeads")
        
        
            buttonArray.push("<button id="+inputEl.value+">"+inputEl.value+"</button>")
            localStorage.setItem("button",JSON.stringify(buttonArray))
            RenderGroupButton()
            error_mes.textContent=""
        
        }

    }
    else{
        error_mes.textContent="Please enter group name without spaces or use '_' instead"
    }
   

})

function render(){
    let listItems=""
    
    for(let i=0;i<tabArray.length;i++){
        listItems+=
        `
        <li>
        <a target="_blank" href=${tabArray[i]}>${tabArray[i]}</a>
        <hr>
        </li>
        `
        
    }
    
    localStorage.setItem("myLeads",JSON.stringify(tabArray))
    
    ulEl.innerHTML=listItems    
}

function Buttonrender(){
   
    let buttonItems=""
   
    for(let i=0;i<buttonArray.length;i++){
        buttonItems+=
        buttonArray[i]
        
    }
 
    Ingroup.innerHTML=buttonItems
      
}
function RenderGroupButton(){
     leadsFromLocalStorage3 = JSON.parse( localStorage.getItem("values") )
    for(let i=0;i<leadsFromLocalStorage3.length;i++){
        console.log(leadsFromLocalStorage3)
        if(i===0){
        const newEl=document.getElementById(leadsFromLocalStorage3[0])
        newEl.addEventListener("click",function(){
            let newParse=JSON.parse( localStorage.getItem(leadsFromLocalStorage3[0]) )
            for(let j=0;j<newParse.length;j++){
                window.open(newParse[j],"_blank")
                window.focus()
            }
        })
        }
        if(i===1){
            const newEl1=document.getElementById(leadsFromLocalStorage3[1])
            newEl1.addEventListener("click",function(){
                let newParse=JSON.parse( localStorage.getItem(leadsFromLocalStorage3[1]) )
                for(let j=0;j<newParse.length;j++){
                    window.open(newParse[j],"_blank")
                    window.focus()
                }
            })
            }
            if(i===2){
                const newEl2=document.getElementById(leadsFromLocalStorage3[2])
                newEl2.addEventListener("click",function(){
                    let newParse=JSON.parse( localStorage.getItem(leadsFromLocalStorage3[2]) )
                    for(let j=0;j<newParse.length;j++){
                        window.open(newParse[j],"_blank")
                        window.focus()
                    }
                })
                }    
    }


}



