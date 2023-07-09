

// function for newPostButton
function newPostButton(event) {
    event.preventDefault();

    if (document.getElementById('new-post-input').classList.contains('hidden')) {
        document.getElementById('new-post-input').classList.remove('hidden');
    }
    else {
        document.getElementById('new-post-input').classList.add('hidden');
    }
};

// function for newPostFormHandler
const  newPostFormHandler = async (event) => {
    event.preventDefault();

    const beerName = document.querySelector('#beer-name-input').value.trim();
    const beerReview = document.querySelector('#beer-review-input').value.trim();
    const beerRating = document.querySelector('#beer-rating-input').value;
    const beerImage = "beer13"; 
    const date = new Date();

    if (beerName && beerReview && beerRating && beerImage && date) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: beerName,
                post_text: beerReview,
                likes: 0,
                rating: beerRating,
                file_name: beerImage,
                date_created: date,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create post');
        }
    }
};

// function for commentFormHandler
const commentFormHandler = async (event) => {

    event.preventDefault();

        const comment_text = event.currentTarget.querySelector('textarea').value; //document.querySelector('.new-comment').value.trim();
        const post_id = event.currentTarget.querySelector('textarea').getAttribute("data") //document.getElementById('post-id').textContent;
        const date = new Date();
        

        console.log(post_id);
    
        if (comment_text && post_id && date) {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    comment_text: comment_text,
                    post_id: post_id,
                    date: date
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
            document.location.reload();
            } else {
                alert('Failed to create comment');
            }
    };
}

// function for commentButton
function commentButton(event) {
    event.preventDefault();

    if (event.target.parentElement.parentElement.children[6].classList.contains('hidden')) {
        event.target.parentElement.parentElement.children[6].classList.remove('hidden');
    }
    else {
        event.target.parentElement.parentElement.children[6].classList.add('hidden');
    };

};



document
    .querySelectorAll('.comment-buttons')
    .forEach(item => {
        item.addEventListener('click', commentButton)
    });

// Event Listener for commentFormHandler

document
    .querySelectorAll('.comment-forms')
    .forEach(item => {
        item.addEventListener('submit', commentFormHandler);
    });


// Event Listener for newPostButton
document
    .querySelector('#new-post-button')
    .addEventListener('click', newPostButton);


// Event Listener for newPostFormHandler
document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPostFormHandler);


