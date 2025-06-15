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
        html += `
            <div onclick='selectComment(${JSON.stringify(item)})' class="col-sm-4 mb-3" role="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
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

function selectComment({post_id, id, name, email, body}) {
    const titleObj = document.getElementById('exampleModalLabel')
    const commentBodyObj = document.getElementById('commentBody')
    const commnetEmailObj = document.getElementById('commnetEmail')
    titleObj.innerText = name
    commentBodyObj.innerText = body
    commnetEmailObj.innerText = email
}

getData()