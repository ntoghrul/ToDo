
const form=document.querySelector("#todoForm");
const todoInput=document.querySelector("#name");
const todoList=document.querySelector(".list-group");
const clearButton=document.querySelector("#clear-todos");
const button=document.querySelector("#bu");
const di=document.querySelector("#di");
const diva=document.querySelector("#dal");




eventlisteners();

function eventlisteners(){
    form.addEventListener("submit",addTodo);
     document.addEventListener("DOMContentLoaded",addStUI());
    diva.addEventListener("click",deleteitem);
     clearButton.addEventListener("click",deleteAll);

}
function deleteAll(e){
    if(confirm("Are you sure to clear all To-Do's?")){
        console.log(todoList.firstElementChild);
        while(todoList.firstElementChild!=null){
            todoList.removeChild(todoList.firstElementChild);
        }
         localStorage.removeItem("todos");
    }
}
function deleteitem(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteSt(e.target.parentElement.parentElement.textContent);
        showAlert('success',`You deleted ${e.target.parentElement.parentElement.textContent} successfully`);
    }
}
function deleteSt(deletetodo){
 let todos=stgetItem();
 todos.forEach(function(todo,index){
     if(todo===deletetodo)
    todos.splice(index,1);
 })
 localStorage.setItem("todos",JSON.stringify(todos));
}
function addStUI(){
   
    let todos=stgetItem();
    console.log(todos);
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}

function addTodo(e){
    const newTodo=todoInput.value.trim();
    if(newTodo===""){
    showAlert("warning","Please, enter a To-Do");
    }
    else{
    addTodoUI(newTodo);
     addTodoStorage(newTodo);
    showAlert("success",`You added ${newTodo} successfully`);
    }
    e.preventDefault();
}
function stgetItem(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStorage(newTodo){
 let todos=stgetItem();
 todos.push(newTodo);
 localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    alert.id="nigar";
    alert.style.width="30.2rem";
     di.appendChild(alert);

     setTimeout(function(){
        alert.remove();
     },3000)
}
function addTodoUI(newTodo){
    const listItem=document.createElement("li");
    const link=document.createElement("a");
    link.className="delete-item"
    link.href="#";
    link.innerHTML="<i class = 'fa fa-remove'></i>"
    

    listItem.className="list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value="";



}


