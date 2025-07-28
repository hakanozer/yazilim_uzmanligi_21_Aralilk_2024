function getData() {
    const url = 'https://jsonbulut.com/api/products?page=1&per_page=10';
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function () {
        const obj = JSON.parse(this.responseText);
        cardData(obj.data);
    };

    xhttp.open('GET', url);
    xhttp.send();
}

function cardData(arr) {
    let html = '';
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        let imageUrl = "https://via.placeholder.com/200x200?text=No+Image";
        if (item.images && item.images.length > 0) {
            imageUrl = item.images[0];
        }
        html += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${imageUrl}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Fiyat: ${item.price} ₺</p>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById('productList').innerHTML = html;
}

window.onload = getData;

