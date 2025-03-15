

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

$('#goodsBtn').click(()=>{
    $('.page').css('display','none');
    $('#goodsPage').css('display','flex');
});

$('#usersBtn').click(()=>{
    $('.page').css('display','none');
    $('#subscribersPage').css('display','flex');
});


axios.get('http://localhost:3000/subscribers')
.then(res=>{ 
    console.log(res.data);
    res.data.map(item=>{
        $('.subscribePageContainer').prepend(`
            <h3 class = 'subscribeItem'> <div >${item.email}   </div>   <i id = '${item._id}'  class="fa-solid fa-trash deleteUser " ></i></h3>
            
     
       
       
            `)
        })
    })
    


    $('.subscribePageContainer').on('click', '.deleteUser', function(){
        let id = $(this).attr('id')
        alert(id);
        axios.delete(`http://localhost:3000/subscribers/${id}`)
        .then(()=>{
            window.location.reload();
        })
    })