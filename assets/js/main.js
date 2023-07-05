let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'

const loadingBox = document.querySelector('#loading-box')
const productsGrid = document.querySelector('.products-grid')
const moreProductsBtn = document.querySelector('.products-section button')
// GET PRODUCTS

async function getAllProducts(initUrl){
    await fetch(initUrl)
    .then(response => {
        return response.json()
    })
    .then(data => {
        url = `https://${data.nextPage}`

        generateProducts(data)
    })
}

function generateProducts(data){
    data.products.map((product) => {
        const div = document.createElement('div')
    
        const img = document.createElement('div')
        const name = document.createElement('h3')
        const description = document.createElement('p')
        const oldPrice = document.createElement('p')
        const price = document.createElement('h2')
        const installments = document.createElement('p')
        const btn = document.createElement('button')
    
        div.classList.add('product')
        img.classList.add('product-image')
        btn.classList.add('product-btn')
    
        img.innerHTML = `<img src="${product.image}" alt="Imagem do Produto">`
        name.innerText = product.name
        description.innerText = product.description
        oldPrice.innerHTML = `De: R$${product.oldPrice.toLocaleString('PT')}`
        price.innerHTML = `Por: R$${product.price.toLocaleString('PT')}`
        installments.innerHTML = `Ou ${product.installments.count}x de R$${product.installments.value.toLocaleString('PT')}`
        btn.innerText = 'Comprar'
    
        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(description)
        div.appendChild(oldPrice)
        div.appendChild(price)
        div.appendChild(installments)
        div.appendChild(btn)
    
        productsGrid.appendChild(div)
    
        loadingBox.classList.add('hide')
    })
}


getAllProducts(url)
