const nomeDigimon = document.querySelector('.header__name')
const idDigimon = document.querySelector('.header__id')
const imgDigimon = document.querySelector('.character')
const levelDigimon = document.querySelector('#level')
const attributeDigimon = document.querySelector('#attribute')
const typeDigimon = document.querySelector('#type')
const form = document.querySelector('.form__search')
const input = document.querySelector('.input__search')
const leftBtn = document.querySelector('.left__arrow')
const rightBtn = document.querySelector('.right__arrow')

let findDigimon = 394;

async function fetchDigimon (digimon) {

    const api = await fetch(`https://digi-api.com/api/v1/digimon/${digimon}`)
    
    if (api.status === 200) {
        const data = await api.json()
        return data
    }
}

async function exibeDigimon (digimon) {

    const data = await fetchDigimon(digimon)
    
    if (data) {
    nomeDigimon.innerHTML = data.name;
    idDigimon.innerHTML = data.id;
    imgDigimon.src = data.images[0].href;
    levelDigimon.innerHTML = data.levels[0].level;
    attributeDigimon.innerHTML = data.attributes[0].attribute;
    typeDigimon.innerHTML = data.types[0].type;

    const fieldContainer = document.querySelector('.character__fields')
    const fields = data.fields;
    fieldContainer.innerHTML = ''

    if (fields.length === 0) {
        const unknownImg = new Image()
        unknownImg.src = '/assets/img/Unknown.png'
        fieldContainer.append(unknownImg)
        return; 
    }

    fields.forEach(item => {
        
        const img = document.createElement('img')
        img.src = item.image
        img.alt = item.field
        fieldContainer.appendChild(img)
        
    })

    input.value = '';
    findDigimon = data.id;
    }
}

form.addEventListener('submit', (event) =>  {
    event.preventDefault();
    exibeDigimon(input.value.toLowerCase());
})

leftBtn.addEventListener('click', () =>  {
    if (findDigimon > 1) {
        findDigimon -= 1;
        exibeDigimon(findDigimon)
    }
})

rightBtn.addEventListener('click', () =>  {
    findDigimon += 1;
    exibeDigimon(findDigimon)
})

exibeDigimon(findDigimon)