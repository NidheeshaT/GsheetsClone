const thead=document.querySelector("thead")
const tbody=document.querySelector("tbody")
const alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const numberofrows=100

function init()
{
    let heads= `<tr class='before:bg-main before:w-8'>`;

    alpha.forEach((i)=>
    {
        heads+=`<th class="w-24 bg-second text-white font-normal border">${i}</th>`
    })

    heads+=`</tr>`
    thead.innerHTML=heads

    

    let rows="";
    for(let i=1;i<=numberofrows;i++)
    {
        rows+=`<tr>`
        for(let j=0;j<26;j++)
        {
            rows+=`<td class="border w-24 relative">
                    <input id="${alpha[j]+i}" readonly="true" type="text" class="w-full p-1 focus-within:outline-none" />
                   </td>`
        }
        rows+=`</tr>`
    }
    tbody.innerHTML=rows

    tbody.querySelectorAll("td").forEach((td)=>{

        let i=td.querySelector("input")
        td.addEventListener("focusin",()=>{
            td.classList.add("border-2","border-main","drop-shadow-lg","z-10")
        })
        td.addEventListener("focusout",()=>{ 
            td.classList.remove("border-2","border-main","drop-shadow-lg","z-10")
        })

        i.addEventListener("dblclick",(e)=>{
            e.target.readOnly=false
        })
        i.addEventListener("focusout",(e)=>{
            e.target.readOnly=true
        })
    })
}

init()

document.addEventListener("focusin",()=>{

})
document.addEventListener("keydown",(event)=>{

    if(event.key=="ArrowDown")
    {
        event.preventDefault()
        const str=document.activeElement.id
        const row=parseInt(str.substring(1))
        if(row==numberofrows)
            return
        document.querySelector("#"+str.substring(0,1)+(row+1)).focus()
        return
    }
    if(event.key=="ArrowUp"){
        event.preventDefault()
        const str=document.activeElement.id
        const row=parseInt(str.substring(1))

        if(row==1)
            return
        document.querySelector("#"+str.substring(0,1)+(row-1)).focus()
        return
    }
    if(event.key=="ArrowLeft"){
        event.preventDefault()
        const str=document.activeElement.id
        const col=alpha.indexOf(str[0])

        if(col==0)
            return
        document.querySelector("#"+alpha[col-1]+str.substring(1)).focus()
        return
    }
    if(event.key=="ArrowRight"){
        event.preventDefault()
        const str=document.activeElement.id
        const col=alpha.indexOf(str[0])

        if(col==alpha.length-1)
            return
        document.querySelector("#"+alpha[col+1]+str.substring(1)).focus()
        return
    }
})

document.s