const thead=document.querySelector("thead")
const tbody=document.querySelector("tbody")
const alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const numberofrows=100

function init()
{
    let heads= `<tr class='before:bg-main before:w-8'>`;

    alpha.forEach((i)=>
    {
        heads+=`<th id="${i}" class="relative w-24 bg-second text-white font-normal border">${i}
        <span class="absolute h-full right-0 top-0 bg-transparent hover:cursor-w-resize hover:bg-main w-1"></span></th>`
    })

    heads+=`</tr>`
    thead.innerHTML=heads

    let mousedown=false;
    const resize=(e)=> {
        if(mousedown)
        {
            let selected=thead.querySelector("#"+mousedown)
            selected.classList.remove("w-24")
            selected.style.width = e.pageX-selected.offsetLeft+"px"
        }
    }

    thead.querySelectorAll("th").forEach((th)=>{

        th.querySelector("span").addEventListener("mousedown",(e)=>{
            mousedown=th.id
        })
        th.addEventListener('mousemove',resize);

        th.addEventListener("mouseup",(e)=>{
            mousedown=false
        })
        thead.addEventListener("mouseleave",(e)=>{
            mousedown=false
        })


    })



    rows()
    resizeRows()
}

init()

function resizeRows(){
    let mousedown=false;
    const resize=(e)=> {
        if(mousedown)
        {
            let selected=document.getElementById(mousedown)
            selected.style.height = e.pageY-selected.getBoundingClientRect().top+"px"
        }
    }
    tbody.querySelectorAll("tr").forEach((tr)=>{
        const rect=tr.getBoundingClientRect()
        const bottom=rect.bottom


        tr.addEventListener("mousedown",(e)=>{
            if(bottom-e.pageY<5 && e.pageX<40)
            {
                mousedown=tr.id
            }
        })
        tr.addEventListener('mousemove',resize);

        tbody.addEventListener("mouseup",(e)=>{
            mousedown=false
        })
        tbody.addEventListener("mouseleave",(e)=>{
            mousedown=false
        })
    })
}

function rows(){
    let rows="";
    for(let i=1;i<=numberofrows;i++)
    {
        rows+=`<tr id="${i}" class="relative after:cursor-s-resize">`
        for(let j=0;j<26;j++)
        {
            rows+=`<td class="border h-6 relative">
                    <input id="${alpha[j]+i}" readonly="true" type="text" class="absolute top-0 left-0 w-full h-full p-1 focus-within:outline-none" />
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
    else if(event.key=="ArrowUp"){
        event.preventDefault()
        const str=document.activeElement.id
        const row=parseInt(str.substring(1))

        if(row==1)
            return
        document.querySelector("#"+str.substring(0,1)+(row-1)).focus()
        return
    }
    else if(event.key=="ArrowLeft"){
        event.preventDefault()
        const str=document.activeElement.id
        const col=alpha.indexOf(str[0])

        if(col==0)
            return
        document.querySelector("#"+alpha[col-1]+str.substring(1)).focus()
        return
    }
    else if(event.key=="ArrowRight"){
        event.preventDefault()
        const str=document.activeElement.id
        const col=alpha.indexOf(str[0])

        if(col==alpha.length-1)
            return
        document.querySelector("#"+alpha[col+1]+str.substring(1)).focus()
        return
    }
    else{
        document.activeElement.readOnly=false
    }
})

document.s