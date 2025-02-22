axios.get('http://localhost:3000/products')
.then(res=>{
    console.log(res.data);
    // $('.productContainer')


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