$(document).ready(function () {
  const cardsContainer = $("#cards-container");
  const url = "https://jsonbulut.com/api/products?page=1&per_page=10";
  const products = [];
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function (response) {
      console.log(response);
      $.each(response.data, function (index, product) {
        let cardHtml = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img
                        src="${product.images[0]}"
                        class="card-img-top"
                        alt="Card Image"
                    />
                    <div class="card-body d-flex flex-column">
                        <div class="row align-items-center g-0 mb-4">
                            <div class="col-8">
                                <h5 class="card-title">${product.title}</h5>
                            </div>
                            <div class="col-4 text-end">
                                <h4 class="card-title text-success fw-bold mb-0">${product.price} $</h5>
                            </div>
                        </div>
                        <p class="card-text mt-2">${product.description}</p>
                        <a href="#" class="btn btn-primary mt-auto">Add To Cart</a>
                    </div>
                </div>
            </div>`;
        cardsContainer.append(cardHtml);
      });
    },
  });
});
