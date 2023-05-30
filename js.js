const item = document.querySelector("#item");
const todobox = document.querySelector("#todobox");

item.addEventListener("keyup",function(event){
     if(event.key == "Enter"){
        addtodo(item.value);
        item.value = "";
     }
})

let class_delete;
const addtodo = (data = "") =>{
   const listitem = document.createElement("li");
   listitem.innerHTML = `
     ${data}
     <i class="ri-delete-bin-2-line"></i>
   `;

   if(data != ""){
      let first_p = todobox.firstElementChild;
      todobox.insertBefore(listitem,first_p);
      save_data_fun();
   }

    listitem.addEventListener("click",function(){
       this.classList.toggle("delete_item");
    })

   listitem.querySelector("i").addEventListener("click",function(){
      class_delete = listitem.getAttribute('class');
         if(class_delete != null){
            listitem.remove();
            save_data_fun();
         }
   });
}

function  save_data_fun(){
   let all_item = todobox.querySelectorAll("li");
   const data = [];
   all_item.forEach (
       (note) =>{
      data.push(note.innerText);
   })

   if(data.length == 0){
       localStorage.removeItem("list");
   }else{
       localStorage.setItem("list",JSON.stringify(data));
   }
}

const getlist = () =>{
   const la_list = JSON.parse(localStorage.getItem("list"));
  if(la_list == null){
    localStorage.removeItem("list");
  }else{
   let count;
    for(let i = 0 ; i < la_list.length; i++){
       addtodo(la_list[i]);
   }
  }
}

window.onload = () =>{
   getlist();
}
