
////////////////////////////----------------- FIRST PAGE FETCH TO DISPLAY ALL POSTS ----------------//////////////////////////////


fetch("/src-json-files/post-file.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {

             document.getElementById('app').innerHTML = 
                `${data.map(function(post) {
                    return `
                    <div class="flex justify-center">
                    <div id=${post.id} class="max-w-4xl py-4 px-8 bg-white shadow-lg rounded-lg my-6 ml-8"> 
                        <h4 class="title text-gray-800 text-2xl font-semibold">  ${post.title} </h4>
                        <p class="body mt-2 text-gray-600"> ${post.body} </p> <br>
                        <div class="flex justify-end mt-4">
                            <a class="button text-xl font-medium text-indigo-500" href="/src/singlepost.html">View All Comments</a>
                        </div>
                    </div>
                    </div>
                    `
                    }).join('')}`
                    
            })
    .catch(function (err) {
        console.log(err)
    });


//////////////////////////-------- SECOND PAGE FETCH FOR SINGLE POST AND COMMENTS------------////////////////////////////

    fetch("/src-json-files/post-file.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function(singledata) {

            return fetch("/src-json-files/comments-file.json")
                .then(function (resp) {
                    return resp.json();
                })
                .then(function(com) {



                                //------------- SEARCH BAR LOGIC ---------------/



                    let singlePost = singledata.find(p => p.id == "1"); 

                    const searchBar = document.getElementById('searchBar');

                    searchBar.addEventListener('keyup', (e) => {
                        const searchComments = e.target.value;
                        const filteredComments = com.filter( comments => {
                        return comments.name.includes(searchComments) || comments.email.includes(searchComments);
                        });
                        console.log(filteredComments);
                    })


                             //------------- SINGLE POST AND COMMENTS HTML TEMPLATE ------/



                    document.getElementById('singlepost').innerHTML = 
                    `<div class="flex justify-center">
                        <div class="max-w-4xl py-4 px-8 bg-white shadow-lg rounded-lg my-10 ml-8"> 
                        <h4 class="title text-gray-800 text-4xl font-semibold">  ${singlePost.title} </h4>
                        <p class="body mt-4 text-gray-600" > ${singlePost.body} </p> <br>
                        </div>
                    </div>
                    <h4 class="ml-24 mb-4 text-lg font-semibold text-gray-900">All Comments</h4>
                        ${com.map(function(comments) {
                            return `
                                <div class="flex my-5 ml-24 mr-24">
                                    <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                        <strong>${comments.name}</strong> <span class="text-xs text-gray-400">${comments.email}</span>
                                        <p class="text-sm">
                                            ${comments.body}
                                        </p>
                                    </div>
                                </div>`
                            })
                        .join('')}`
                    })
                })
        .catch(function (err) {
            console.log(err)
        });