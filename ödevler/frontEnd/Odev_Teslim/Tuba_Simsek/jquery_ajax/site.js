$(document).ready(function () {
    $.ajax({
        url: "https://jsonbulut.com/api/products",
        method: "GET",
        data: {
            page: 1,
            per_page: 10
        },
        success: function (response) {
            console.log("API'den gelen yanıt:", response);

            const products = response.data;

            products.forEach(function (product) {
                const title = product.title;
                const price = product.price;

                // varsayılan görsel
                let imageUrl = "https://via.placeholder.com/200x200?text=No+Image";
                if (product.images && product.images.length > 0) {
                    imageUrl = product.images[0];
                }

                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${imageUrl}" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">Fiyat: ${price} ₺</p>
                            </div>
                        </div>
                    </div>
                `;
                $('#productList').append(card);
            });
        },
        error: function () {
            $('#productList').html('<p class="text-danger">Ürünler yüklenirken hata oluştu.</p>');
        }

    });


    
    // Kart oluşturma fonksiyonu (hem API hem form kullanır)
    function addCard(title, price, imageUrl) {
        if (!imageUrl) {
            imageUrl = "https://picsum.photos/200/200";
        }

        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">Fiyat: ${price} ₺</p>
                    </div>
                </div>
            </div>
        `;
        $('#productList').prepend(card);
    }

    // Formdan sahte ürün ekleme işlemi
    $('#productForm').submit(function (e) {
        e.preventDefault(); // Sayfa yenilemesini engelle

        const title = $('#title').val().trim();
        const price = $('#price').val();
        let image = $('#image').val().trim();

        addCard(title, price, image);

        // Formu temizle
        this.reset();
    });
});



