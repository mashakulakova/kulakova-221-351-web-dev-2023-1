'use strict';

const BASE_URL = new URL("http://cat-facts-api.std-900.ist.mospolytech.ru/");

const state = {
    page: 1,
    perPage: 10,
    pageCount: 0
}


const fillPageByCollection = (collection) => {
    let template = document.getElementById("post_t");
    const main = document.querySelector(".posts");
    for (let record of collection) {
        let post = template.content.cloneNode(true);
        post.querySelector("p").textContent = record.text;
        post.querySelector(".userCard").textContent = 
            record?.user?.name?.first +
            " " +
            record?.user?.name?.last;
        main.append(post);
    }
};

function pageCounter(objectPagination) {
    state.pageCount = objectPagination.total_pages;
}

function numeration() {
    let first = Math.max(1, state.page - 2);
    let btnp = document.getElementById('btn-p');
    let last = Math.min(state.page + 2, state.pageCount);
    btnp.innerHTML = "";
    for (let i = first; i <= last; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = i;
        btn.onclick = () => goToPage(i);
        btnp.append(btn);
    }
}

function getRequest(page = 1, perPage = 10) {
    let url = new URL("facts", BASE_URL);
    url.searchParams.set("page", page);
    url.searchParams.set("per-page", perPage);

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = function() {
        //alert(`Есть: ${xhr.status}, ${xhr.response}`);
        let json = JSON.parse(xhr.response);
        cleanPosts();
        fillPageByCollection(json.records);
        pageCounter(json._pagination);
        numeration();
    };
}

function cleanPosts() {
    let main = document.querySelector(".posts");
    main.innerHTML = "";
}

window.onload = () => {
    getRequest(state.page, state.perPage);
};

function goToPage(pageNum) {
    state.page = pageNum;
    getRequest(state.page, state.perPage)

}

function getNextPage() {
    state.page++;
    getRequest(state.page, state.perPage);
}

function getBackPage() {
    state.page--;
    getRequest(state.page, state.perPage);   
}