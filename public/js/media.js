function photobt(){

    let photobtn = document.querySelector("#photoid");

    photobtn.addEventListener('click', ( event ) =>{
        event.preventDefault();

        let photoCards = document.querySelector("#photo-list").style.display = 'block';
        let videoCards = document.querySelector("#video-list").style.display = 'none';
    });
}

function videobt(){

    let videobtn = document.querySelector("#videoid");

    videobtn.addEventListener('click', ( event ) =>{
        event.preventDefault();

        let photoCards = document.querySelector("#photo-list").style.display = 'none';
        let videoCards = document.querySelector("#video-list").style.display = 'block';
    });
}


function init(){
    photobt()
    videobt()
}

init()