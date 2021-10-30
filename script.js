let modalQt = 1;
let carrinho =[];
let modalKey = 0 ; // id da pizza 




const c =  (el) => document.querySelector(el);
const cs = (el) =>document.querySelectorAll(el);

// PREENCHENDO e listagem das pizza
pizzaJson.map((item , index)=>{
    // preenche as inf 
    let pizzaItem = c('.models .pizza-item').cloneNode(true) // clone da lista

    // adc o index e o ID de cada pizza 
    pizzaItem.setAttribute('data-key',index) ;

    // adic os nomes das pizzas 
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    // adc a descrição das pizzas 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    // preço das pizza 
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    //classe + src + o img 
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    // adicionando pizza  , remove o evento do A                     // MODAL 
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); // nao deixa animação do A acontecer 
        // procura o pizza item mais proximo do A 
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt =1;
        modalKey = key;


        c('.pizzaBig img').src = pizzaJson[key].img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].price.toFixed(2)}`

        // deixar selecionado // nao selecionar 
        c('.pizzaInfo--size.selected').classList.remove('selected');

        //percorrer os items do tamanho
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
         // seleciona o span com os -- e preenche o tamanho com as inf do json
            if(sizeIndex ==2  ) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
        // quantidade
        c('.pizzaInfo--qt').innerHTML = modalQt;


        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display ='flex';
        // espera 200 ms p aparecer 
        setTimeout (()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
        
    });

    c('.pizza-area').append( pizzaItem )
});


//  eventos do MODAL 

function fecharModal () {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout (()=>{
        c('.pizzaWindowArea').style.display ='none';
    },500)
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click',fecharModal)
})

// botao menos 
c('.pizzaInfo--qtmenos').addEventListener('click', () =>{
    if(modalQt>1) {
        modalQt--; // MUDA A VARIAVEL MODAL QT 
        c('.pizzaInfo--qt').innerHTML = modalQt; // quantidade  
    }
})
// btn MAIS ++++++++++++++++++++
c('.pizzaInfo--qtmais').addEventListener('click', () =>{
    // MUDA A VARIAVEL MODAL QT 
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;    // quantidade
 })

//   tamanho selecionado 
 cs('.pizzaInfo--size').forEach((size, sizeIndex)=> {
    size.addEventListener('click', (e) =>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
 });

                                            //  ADICIONANDO AO CARRINHO

c('.pizzaInfo--addButton').addEventListener('click',()=>{
    
    let size =  + c('.pizzaInfo--size.selected').getAttribute('data-key') // ou parse Int p converter em num
    
    let identificador = pizzaJson[modalKey].id + '@'+size
  
    let key = carrinho.findIndex((item) =>{
        return item.identificador == identificador ; // verificar == se achou o indentificador muda a qtd
    })


    if(key > -1) {
        carrinho[key].qt += modalQt ;
    } else {

        carrinho.push({
            identificador,
            id:pizzaJson[modalKey].id ,
            size,
            qt:modalQt
        });
        
    }
    upDateCarrinho();
    fecharModal();
});

    // função que atualiza o carrinho > >  > 

function upDateCarrinho () {
    if(carrinho.length > 0 ) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = ''
        for(let i in carrinho) {
            
            let pizzaItem = pizzaJson.find((item)=>item.id == carrinho[i].id);
            let carrinhoItem = c('.models .cart--item').cloneNode(true)
           
            let pizzaSizeName;

            switch(carrinho[i].size) {
                case 0: 
                pizzaSizeName = 'P';
                break;
                case 1:
                pizzaSizeName = 'M';
                break;
                case 2:
                pizzaSizeName = 'G';
                break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            carrinhoItem.querySelector('img').src = pizzaItem.img
            carrinhoItem.querySelector('.cart--item-nome').innerHTML= pizzaName;
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt;

            c('.cart').append(carrinhoItem)


        }
    }else {
        c('aside').classList.remove('show');
    }


}