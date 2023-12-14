const form = document.getElementById('form')
const input = document.getElementById('input')
const listaUL = document.getElementById('lista')

const lista = JSON.parse(localStorage.getItem('lista'))

if(lista) {
    lista.forEach(producto => addProducto(producto))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addProducto()
})




function addProducto(producto) {
    let productoText = input.value

    if(producto) {
        productoText = producto.text
    }

    if(productoText) {
        const productoEl = document.createElement('li')
        if(producto && producto.completed) {
            productoEl.classList.add('completed')
        }

        productoEl.innerText = productoText

        productoEl.addEventListener('click', () => {
            productoEl.classList.toggle('completed')
            updateLS()
        }) 

        productoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            productoEl.remove()
            updateLS()
        }) 

        //listaUL.appendChild(productoEl)

        // Agregar el nuevo elemento al principio de la lista
        listaUL.insertBefore(productoEl, listaUL.firstChild);

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    listaEl = document.querySelectorAll('li')

    const lista = []

    listaEl.forEach(productoEl => {
        lista.push({
            text: productoEl.innerText,
            completed: productoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('lista', JSON.stringify(lista))
}