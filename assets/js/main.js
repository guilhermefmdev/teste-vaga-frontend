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
        const $div = document.createElement('div')
        const $wrap = document.createElement('div')
        const $img = document.createElement('div')
        const $name = document.createElement('h3')
        const $description = document.createElement('p')
        const $oldPrice = document.createElement('p')
        const $price = document.createElement('h2')
        const $installments = document.createElement('p')
        const $btn = document.createElement('button')
    
        $div.classList.add('product')
        $img.classList.add('product-image')
        $btn.classList.add('product-btn')
        $wrap.classList.add('product-info-wrap')

        $img.innerHTML = `<img src="${product.image}" alt="Imagem do Produto">`
        $name.innerText = product.name
        $description.innerText = product.description
        $oldPrice.innerHTML = `De: R$${product.oldPrice.toLocaleString('PT')}`
        $price.innerHTML = `Por: R$${product.price.toLocaleString('PT')}`
        $installments.innerHTML = `Ou ${product.installments.count}x de R$${product.installments.value.toLocaleString('PT')}`
        $btn.innerText = 'Comprar'
        
        
        $div.appendChild($img)
        $wrap.appendChild($name)
        $wrap.appendChild($description)
        $wrap.appendChild($oldPrice)
        $wrap.appendChild($price)
        $wrap.appendChild($installments)
        $wrap.appendChild($btn)
        $div.appendChild($wrap)
        productsGrid.appendChild($div)
    
        loadingBox.classList.add('hide')
    })
}
getAllProducts(url)


// FORMS VALIDATION

document.forms['signinForm'].onsubmit = function (e){
    e.preventDefault()
}
document.forms['shareForm'].onsubmit = function (e){
    e.preventDefault()
}
const $signinBtn = document.querySelector('.signin-form button')
function formValidation(formId){
    let formError = false

    const $inputName = document.forms[formId]['name']

    if(($inputName.value.length < 3)) {
        formError = true
        const spanError = $inputName.nextSibling.nextSibling
        spanError.innerHTML = 'Preencha o campo corretamente!'
    } else {
        const $spanError = $inputName.nextSibling.nextSibling
        $spanError.innerText = ''
    }
    
    $inputEmail = document.forms[formId]['email']
    if(($inputEmail.value.length < 3) ||
        ($inputEmail.value.indexOf("@") < 2) ||
        ($inputEmail.value.indexOf(".") < 2)) {
        
        formError = true
        const $spanError = $inputEmail.nextSibling.nextSibling
        $spanError.innerHTML = 'Insira um E-mail válido!'
    } else {
        const $spanError = $inputEmail.nextSibling.nextSibling
        $spanError.innerText = ''
    }

    if(!formError){
        alert('Enviado com sucesso!')
    }

}

