//When comment button with id #comment-button is clicked, run commentFormHandler function
document
    .querySelector('#comment-button')
    .addEventListener('click', commentFormHandler);

// function for commentFormHandler
function commentFormHandler(event) {
    event.preventDefault();
    //toggle hidden class on comment input via id #comment-button
    if (document.getElementById('comment-input').classList.contains('hidden')) {
        document.getElementById('comment-input').classList.remove('hidden');
    }
    else {
        document.getElementById('comment-input').classList.add('hidden');
    }
};


document
    .querySelector('#new-post-button')
    .addEventListener('click', newPostFormHandler);

function newPostFormHandler(event) {
    event.preventDefault();
    //toggle hidden class on comment input via id #comment-button
    if (document.getElementById('new-post-input').classList.contains('hidden')) {
        document.getElementById('new-post-input').classList.remove('hidden');
    }
    else {
        document.getElementById('new-post-input').classList.add('hidden');
    }
};

    