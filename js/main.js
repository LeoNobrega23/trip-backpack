var form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
var itens = JSON.parse(localStorage.getItem('itens')) || []



itens.forEach( (elemento) => {
criarElemento(elemento)    
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    const existe = itens.find(elemento => elemento.nome.toLowerCase().replaceAll(/\W/g, "") === nome.value.replaceAll(/\W/g, "").toLowerCase())

    var itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
       }

    // Se o item existir, irá substituir o valor

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } 
    // Se não existir, criará um novo
    else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0

        criarElemento(itemAtual)

        itens.push(itemAtual)
    }
    
    localStorage.setItem('itens', JSON.stringify(itens)) 
    // Esvaziar o input
    nome.value = ''
    quantidade.value = ''
})

function criarElemento (item) {

 
   
   const novoItem = document.createElement('li')
   novoItem.classList.add('item')

   const numeroItem = document.createElement('strong')
   numeroItem.innerHTML = item.quantidade
   numeroItem.dataset.id = item.id
   novoItem.appendChild(numeroItem)


   novoItem.innerHTML += item.nome.toLowerCase().replaceAll(/\W/g, "")
   

   novoItem.appendChild(botaoDeleta(item.id))
   
   lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'X'
    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

 // Remover item do array

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    
    localStorage.setItem('itens', JSON.stringify(itens))
}

const btnDeleteAll = document.getElementById('deleteAll')

btnDeleteAll.onclick = () => {
console.log('clicou')
itens = []
localStorage.removeItem('itens', JSON.stringify(itens))



}