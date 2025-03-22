
let db = [
    {
        id: 1,
        pic: './img/Product/BlackHeadphone.png',
        price: `$249.99`,
        title: 'Black Headphone',
        rating: 4,
        count: 0

    },
    {
        id: 2,
        pic: './img/Product/MackbookPro.png',
        price: `$2049.99`,
        title: 'Mackbook Pro',
        rating: 5,
        count: 0

    },
    {
        id: 3,
        pic: './img/Product/iOSKeyboard.png',
        price: `$249.99`,
        title: 'iOS Keyboard',
        rating: 4,
        count: 0

    },
    {
        id: 4,
        pic: './img/Product/WhiteMouse.png',
        price: `$249.99`,
        title: 'Apple Mouse',
        rating: 5,
        count: 0

    },
    {
        id: 5,
        pic: './img/Product/BlackiPhoneSpeaker.png',
        price: `$249.99`,
        title: 'Black iPhone Speaker',
        rating: 5,
        count: 0

    },
    {
        id: 6,
        pic: './img/Product/iPhoneSpeaker.png',
        price: `$249.99`,
        title: 'iPhoneSpeaker',
        rating: 4,
        count: 0

    },

];



for (let el of db) {
    $('.productContainer').append(`<div class='productItem'>
    <img src='${el.pic}' alt='goods'>
    <div class='productItem__bottom'>
        <div class="productItemGroup">
            <h3>${el.title}</h3>
            <p>${el.rating}</p>
        </div>
        <div class="productItemGroup">
            <h3>${el.price}$</h3>
            <button class='add' id='${el.id}'>+</button>
        </div>
    </div>
    </div>`);
}


let cart = [];
$('.wrap').click((e) => {

    let ID = e.target.id;

    if (ID != '') {
        for (let el of db) {
            if (el.id == ID) {
                if(cart.length > 0){
                    for (let goods of cart){
                        if(el.title == goods.title ){
                            el.count++;
                        }else{
                            el.count = 1;
                        }
                    } 
                   
                }
                cart.push(el);
            }
        }
    }

    // console.log(cart);
    $('.counter').text(cart.length);
})




  $('.cartOpen').click(()  => {
    if(cart.length > 0)
        // alert()
    $('.cartPopup').css('right' , 0);


    for(let el of cart) {
        console.log(el)
        $('.cartPopupContainer').append(`<div class = " orderRow"> 
                 
        <img src='${el.pic}' alt="goods">
        
        <div class="orderInfo">
        <h3>${el.title}</h3>
        <p>${el.price}</p>
        </div>
    <button class = "del"  id  = 'del${el.id}'>delete</button> 
       </div>`)
    }
  })



  $('.closePopup').click(()  => {
    if(cart.length > 0)
        // alert()
    $('.cartPopup').css('right' , -400);})




    $('.edit').click(()  => {
        if(cart.length > 0)
            // alert()
        $('.orderRow').css('display' , 'none');})
    




        $('.add').click(function(){
            let title = $('#title').val()
            let price = $('#price').val()
           axios.post('http://localhost:3000/products', {
               name: title,
               price: price
           })
           .then(()=>{
               $('#popupInfo').text('Товар додано у корзину');
               $('.popup').css('display','flex');
               setTimeout(()=>{
                    $('.popup').css('display','none');
                  
               },2000)
           })
        })










axios.get('http://localhost:3000/products')
.then(res=>{
    console.log(res.data);


    res.data.map(item=>{
        $('.productContainer').append(`
        <div class="productItem">
        <div class="productText">
            <h3>${item.name}</h3>
            <p>${item.price}</p>        
        </div>
    </div>
        `)
    })
})



$('#subscribe').click(function(){
    let email = $('#email').val()
    axios.post('http://localhost:3000/subscribe', {
        email: email
    })
    .then(()=>{
        alert('Ваш емейл збережено');
    })
})




$('#makeOrder').click(()=>{
    alert('click');
    axios.post('http://localhost:3000/orders', {
        name: $('#name').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
        orderList: JSON.stringify(cart)
    })
    .then(()=>{
        alert('Ваше замовлення прийнято');
    })
})