const textBox=document.getElementById("input-el");
const button=document.getElementById("input-btn");
const ulid=document.getElementById("ul");
const delbutton=document.getElementById("delete-btn");
const tabbutton=document.getElementById("tab-btn");
let myLeads=[];
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myleads"));

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads);
}


function render(leads){
    let listItems="";
    for (let index = 0; index < leads.length; index++) {
        listItems+=`<li>
                        <a target='_blank' href='${leads[index]}'>
                        ${leads[index]}
                        </a>
                    </li>`
        
    }
    ulid.innerHTML=listItems;
}


tabbutton.addEventListener("click",function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myleads",JSON.stringify(myLeads));
        render(myLeads);
        // use `url` here inside the callback because it's asynchronous!
    });
    
    
})

button.addEventListener("click",function(){
    myLeads.push(textBox.value);
    render(myLeads);
    localStorage.setItem("myleads",JSON.stringify(myLeads));
    textBox.value="";
})


delbutton.addEventListener("click",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);

})


