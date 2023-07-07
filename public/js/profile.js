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
function newPostFormHandler(event) {
    event.preventDefault();

    const beerName = document.querySelector('#beer-name-input').value.trim();
    const beerReview = document.querySelector('#beer-review-input').value.trim();
    const beerRating = document.querySelector('#beer-rating-input').value.trim();
    const beerImage = document.querySelector('#beer-image-input').value.trim();

    if (beerName && beerReview && beerRating && beerImage) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                beerName,
                beerReview,
                beerRating,
                beerImage
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/api/users/profile');
        } else {
            alert('Failed to create post');
        }
    }
}

// function for commentFormHandler
function commentFormHandler(event) {
    event.preventDefault();

}

// function for commentButton
function commentButton(event) {
    event.preventDefault();

    if (document.getElementById('comment-input').classList.contains('hidden')) {
        document.getElementById('comment-input').classList.remove('hidden');
    }
    else {
        document.getElementById('comment-input').classList.add('hidden');
    }
};

// Event Listener for newPostButton
document
    .querySelector('#new-post-button')
    .addEventListener('click', newPostButton);

// Event Listener for commentButton
document
    .querySelector('#comment-button')
    .addEventListener('click', commentButton);

// Event Listener for newPostFormHandler
document
    .querySelector('#new-post-form')
    .addEventListener('submit', newPostFormHandler);

// Event Listener for commentFormHandler
document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);

    