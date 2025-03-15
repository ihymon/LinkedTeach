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

