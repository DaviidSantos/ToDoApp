const btnAddTarefa = document.querySelector('.btn-add-tarefa');
const input = document.querySelector('.input-nova-tarefa');
const tarefas = document.querySelector('.tarefas');

function limpaInput(){
    input.value = '';
    input.focus();
}

function criaItem(){
    const item = document.createElement('li');
    return item;
}

function criaBotaoApagar(tarefa){
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    tarefa.appendChild(botaoApagar);
}

function criaTarefa(tarefa){
    const itemTarefa = criaItem();
    const span = document.createElement('span');
    span.innerHTML = tarefa
    itemTarefa.append(span);
    tarefas.appendChild(itemTarefa);
    limpaInput();
    criaBotaoApagar(itemTarefa);
    salvarTarefas();
}

document.addEventListener('click', function(e){
    const element = e.target;
    if (element.classList.contains('apagar')){
        element.parentElement.remove();
        salvarTarefas();
    }
})

input.addEventListener('keydown', function(e){
    if (e.keyCode === 13)
    {
        botaoPressionado();
        if (!input.value) return;
        criaTarefa(input.value);
    }
})

input.addEventListener('keyup', function(e){
    if (e.keyCode === 13)
    {
        botaoSolto();
    }
})

function botaoPressionado(){
    btnAddTarefa.setAttribute('class', 'btn-add-tarefa pressionado')
}

function botaoSolto(){
    btnAddTarefa.classList.remove('pressionado')
}

btnAddTarefa.addEventListener('mousedown', function(e){
    botaoPressionado();
    if (!input.value) return;
    criaTarefa(input.value);
});

btnAddTarefa.addEventListener('mouseup', function(e){
    botaoSolto();
});

function salvarTarefas(){
    const itemTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of itemTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar' , '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    } 
    console.log(tarefas)
}

adicionaTarefasSalvas();