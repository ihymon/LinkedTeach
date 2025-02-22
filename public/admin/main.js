$('#addGoods').click(function(){
    let title = $('#title').val()
    let price = $('#price').val()
   axios.post('http://localhost:3000/products', {
       name: title,
       price: price
   })
   .then(()=>{
    alert('Товар додано');
   })
})