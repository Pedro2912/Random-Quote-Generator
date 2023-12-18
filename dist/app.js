"use strict";
const quote = document.querySelector(".quote");
const author = document.querySelector(".quoteAuthor");
const newQuote = document.querySelector("#generateNew");
const tags = document.querySelector("#tag");
newQuote.addEventListener(('click'), (e) => {
    generateNewQuote(tags.value);
});
const generateNewQuote = async (tag) => {
    author.classList.remove("lock");
    author.style.color = 'blue';
    quote.style.color = 'black';
    let hh = [];
    let bg = '';
    if (tag !== '') {
        bg = `?tags=${tag}`;
    }
    else {
        bg = '';
    }
    const response = await fetch(`https://api.quotable.io/quotes/random${bg}`)
        .then(res => res.json())
        .then(data => hh = data);
    if (hh.length === 0) {
        quote.textContent = "Error!";
        author.textContent = `Tag "${tag}" not found`;
        author.style.color = 'darkred';
        quote.style.color = 'darkred';
        author.classList.add('lock');
    }
    else {
        quote.classList.remove('lock');
        let h2 = hh[0];
        quote.textContent = `${h2.content}`;
        author.textContent = `-${h2.author}`;
        console.log(h2);
        author.href = `https://en.wikipedia.org/wiki/${h2.author}`;
    }
};
generateNewQuote(tags.value);
