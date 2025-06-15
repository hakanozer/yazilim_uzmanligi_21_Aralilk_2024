function getData() {
    const url = 'https://jsonbulut.com/api/comments?page=1&per_page=10'
    const xhttp = new XMLHttpRequest()

    // Veriler geldiğinden neler yapılmalı?
    xhttp.onload = function() {
        const status = this.status
        const statusText = this.statusText
        const obj = JSON.parse(this.responseText)
        cardData(obj.data)
    }

    xhttp.open('GET', url)
    xhttp.send()

}

function cardData(arr) {
    var html = ''
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        console.log(item.post_id, item.id, item.name, item.email, item.body)
        html += `
            <div class="col-sm-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">`+commentSubString(item.name, 10)+`</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">`+item.email+`</h6>
                        <p class="card-text">`+commentSubString(item.body, 50)+`</p>
                    </div>
                </div>
            </div>
        ` 
    }
    const commentsObj = document.getElementById('comments')
    commentsObj.innerHTML = html
}

function commentSubString(data, count) {
    const newData = data.substring(0, count)
    return newData
}

getData()