
function getTimeString(time){

    const hour = parseInt(time/3600);
    let remainingSecond = time%3600;
    const minute = parseInt(remainingSecond/60);
    const Second = remainingSecond%60;
    return `${hour} hour ${minute}  minute ${Second} second ago`
}


const loadCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
    .catch(err=>console.log(err))
}



const loadVideos =(searchText = "")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res=>res.json())
    .then((data)=>{
        
        displayVideos(data.videos)})
    .catch(err=>console.log(err))
}

const removeActiveBtn = ()=>{
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons)
    for(btn of buttons){
        btn.classList.remove("bg-red-700")
    }
}

const loadCategoryVideos=(id)=>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
    .then((data)=>{
        const activeBtn = document.getElementById(`btn-${id}`);
        removeActiveBtn();
        activeBtn.classList.add("bg-red-700")
        displayVideos(data.category)});
}

const loadDetails = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`

    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video)
}

const displayDetails = (video)=>{
    console.log(video)
    const detailContainer = document.getElementById("modal-content")
    detailContainer.innerHTML = `
        <img src='${video.thumbnail}'/>
        <p>${video.description}</p>
    `

    document.getElementById("customModal").showModal();


}



// category
// :  
// "Music"
// category_id
// : 
// "1001"

const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById("categories")
    categories.forEach((item)=>{
        console.log(item)
            const buttonContainer = document.createElement("div");
           buttonContainer.innerHTML = `
                <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
           `
            categoriesContainer.append(buttonContainer)

    })
}



const cardDemo = {
    "category_id": "1001",
    "video_id": "aaab",
    "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
    "title": "Midnight Serenade",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            "profile_name": "Noah Walker",
            "verified": false
        }
    ],
    "others": {
        "views": "543K",
        "posted_date": ""
    },
    "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
}



const displayVideos = (videos)=>{
    
    const videosContainer = document.getElementById("videos")
    videosContainer.innerHTML = ""
    if(videos.length==0){
        videosContainer.classList.remove("grid")
        videosContainer.innerHTML = `
            <div class="h-[400px] flex flex-col justify-center items-center gap-5">
                <img src="Icon.png"/>
                <h2 class="text-center ">No content found here</h2>
            </div>
        `
        return;
    }else{
        videosContainer.classList.add("grid")
    }
    videos.forEach((video)=>{
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
                 <figure class="h-[200px] relative">
                    <img
                    src=${video.thumbnail}
                    alt="Shoes" class="h-full w-full object-cover"/>
                   ${video.others.posted_date?.length ==""? '':`
                         <span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>
                    `}
                </figure>
                <div class="px-0 py-2 flex gap-2">
                    <div>
                        <img class="w-10 h-10 rounded-full" src=${video.authors[0].profile_picture}/>
                    </div>

                    <div class="space-y-2">
                        <h2 class="font-bold">${video.title}</h2>

                        <div class="flex gap-2 items-center">
                            <p class="text-gray-500">${video.authors[0].profile_name}</p>
                           ${video.authors[0].verified == true?` <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`:""}
                        </div>
                        <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-error btn-sm">Details</button></p>
                    </div>
                </div>
        `
        videosContainer.append(card);
        })
    
    }


document.getElementById("searchInput").addEventListener("keyup",(e)=>{
        loadVideos(e.target.value)
})

loadCategories();
loadVideos()