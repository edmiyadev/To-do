(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const C=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a id="todos" class="filter" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a id="pending" class="filter" href="#/active">Pendientes</a>
            </li>
            <li>
                <a  id="completed" class="filter" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`;var s=[];for(var w=0;w<256;++w)s.push((w+256).toString(16).slice(1));function L(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}var T,E=new Uint8Array(16);function A(){if(!T&&(T=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!T))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return T(E)}var P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);const v={randomUUID:P};function I(e,t,a){if(v.randomUUID&&!t&&!e)return v.randomUUID();e=e||{};var l=e.random||(e.rng||A)();return l[6]=l[6]&15|64,l[8]=l[8]&63|128,L(l)}class b{constructor(t){this.id=I(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"All",Completed:"Completed",Pending:"Pending"},d={todos:[new b("Todo numero 1"),new b("Todo numero 2"),new b("Todo numero 3")],filter:c.All},k=()=>{S(),console.log("InitStore🍋")},S=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filters:t=c.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(d))},U=e=>{if(!e)throw new Error("descripcion is required");d.todos.push(new b(e)),f()},q=(e=c.All)=>{switch(e){case c.All:return[...d.todos];case c.Completed:return d.todos.filter(t=>t.done);case c.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},F=()=>{d.todos=d.todos.filter(e=>!e.done),f()},O=e=>{d.todos=d.todos.filter(t=>t.id!==e),f()},x=()=>d.filter,D=(e=c.All)=>{d.filter=e,f()},M=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},i={addTodo:U,deletedCompleted:F,deleteTodo:O,getCurrentFilter:x,getTodos:q,initStore:k,loadStore:S,setFilter:D,toggleTodo:M};let h;const H=e=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML=i.getTodos(c.All).length,console.log(h.innerHTML=i.getTodos(c.Pending).length)},N=e=>{const{done:t,description:a,id:l}=e;if(!e)throw new Error("A TODO object is required");const o=`<div class="view">
                    <input class="toggle" type="checkbox" ${t?"checked":""} >
                    <label>${a}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",l),t&&n.classList.add("completed"),n};let g;const V=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`element ${e} not found`);g.innerHTML="",t.forEach(a=>{g.append(N(a))})},u={TodoList:".todo-list",newTodoInput:"#new-todo-input",clearTodosCompleted:".clear-completed",TodoFilter:".filter",TodoPeding:"#pending-count"},R=e=>{const t=()=>{const r=i.getTodos(i.getCurrentFilter());V(u.TodoList,r),a()},a=()=>{H(u.TodoPeding)};(()=>{const r=document.createElement("div");r.innerHTML=C,document.querySelector(e).append(r),t()})();const l=document.querySelector(u.newTodoInput),o=document.querySelector(u.TodoList),n=document.querySelectorAll(u.TodoFilter);document.querySelector(u.TodoPeding);const m=document.querySelector(u.clearTodosCompleted);l.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(i.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");i.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.className==="destroy",y=r.target.closest("[data-id]");!y||!p||(i.deleteTodo(y.getAttribute("data-id")),t(),a())}),m.addEventListener("click",r=>{i.deletedCompleted(),t()}),n.forEach(r=>{r.addEventListener("click",p=>{switch(n.forEach(y=>y.classList.remove("selected")),p.target.className="selected",p.target.id){case"todos":i.setFilter(c.All);break;case"pending":i.setFilter(c.Pending);break;case"completed":i.setFilter(c.Completed);break}t()})})};i.initStore();R("#app");
