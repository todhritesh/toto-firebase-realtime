  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getDatabase ,set , push , ref , onValue , update , runTransaction  , child , get} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCq5oaYk4nnHEyE2-5TQ8xgt4fGB7v2NXo",
    authDomain: "todo-ecff4.firebaseapp.com",
    databaseURL: "https://todo-ecff4-default-rtdb.firebaseio.com",
    projectId: "todo-ecff4",
    storageBucket: "todo-ecff4.appspot.com",
    messagingSenderId: "923352230629",
    appId: "1:923352230629:web:239304508911abe25f820c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  const todoRef = ref(db , 'todos');


  export function addTodo( data ){
    const newTodoRef = push(todoRef);
    set(newTodoRef,data);
    getTodos()
  }

 export function getTodos () {
      let todoData = []
    // onValue(todoRef ,snapShot => {
    //     for(const i in snapShot.val()){
    //         todoData = [...todoData,{...snapShot.val()[i],id:i}];
    //     }
    // },{onlyOnce:true})


    
    const dbRef = ref(getDatabase());
    get(child(dbRef,'todos')).then(snap => {
        for(const i in snap.val()){
            todoData = [...todoData,{...snap.val()[i],id:i}];
        }
        // let elm = '';
        const showTodo = document.getElementById('showTodo')
        showTodo.innerHTML = '';
        todoData.forEach((item , i) => {
            // let tag = `<div class="list-group-item list-group-item-action">${i+1} \u00A0 ${item.title}</div>`
            // elm += tag;
            const button_pending = document.createElement('button');
            const button_success = document.createElement('button');
            button_pending.className = 'btn btn-danger float-end';
            button_pending.innerText = 'Pending'
            button_success.className = 'btn btn-success float-end';
            button_success.onclick = ()=>handleStatus(item.id);
            button_pending.onclick = ()=>handleStatus(item.id);
            button_success.innerText = 'Success'
            const list = document.createElement('div')
            list.className = 'list-group-item list-group-item-action'
            list.innerText = `${i+1}.  ${item.title}`;
            if(item.status){
                list.appendChild(button_success)
            }else{
                list.appendChild(button_pending)
            }
            
            showTodo.appendChild(list)
        });
        // showTodo.innerHTML = elm;
    })

  }

  function handleStatus(id){
    const todoRef = ref(db , `todos/${id}`);
    get(todoRef).then((data)=>{
        update(todoRef , {...data.val(),status:!data.val().status})
        getTodos()
    })

    // runTransaction(todoRef , data => {
    //     console.log(data)
    //     data.status=!data.status
    //     return data;
    // })
  }


  window.onload = () => {
      getTodos()
  }



