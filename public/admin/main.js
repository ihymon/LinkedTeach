

$('#addGoods').click(function(){
    let title = $('#title').val()
    let price = $('#price').val()
   axios.post('http://localhost:3000/products', {
       name: title,
       price: price
   })
   .then(()=>{
       $('#popupInfo').text('Товар додається у Базу Даних');
       $('.popup').css('display','flex');
       setTimeout(()=>{
            $('.popup').css('display','none');
             window.location.reload();
       },3000)
   })
})


axios.get('http://localhost:3000/products')
.then(res=>{
    console.log(res.data);
    res.data.map(item=>{
        $('.goodsContainer').prepend(`
        <div class="productItem">
            <h3>${item.name}</h3>
            <p>${item.price} ₴</p> 
            <div class="productItemControl">
                 <button class="edit" id="${item._id}"><i class="fa-solid fa-trash"></i></button>
                 <button> <i class="fa-solid fa-pen-to-square"></i></button>
            </div>
    </div>
        `)
    })
})

$('.goodsContainer').on('click', '.edit', function(){
    let id = $(this).attr('id')
    axios.delete(`http://localhost:3000/products/${id}`)
    .then(()=>{
        window.location.reload();
    })
})