const content = (data)=>{
    document.getElementById('parent-box').innerHTML=''
    data.map((ele)=>{
        let img  = document.createElement("img")
        img.src=ele.image
        img.setAttribute("class","img")
        img.style.width = "150px"
        let title  = document.createElement("h1")
        title.innerHTML=ele.title
        title.setAttribute("class","title")
        let list = document.createElement('div')
        list.setAttribute("class","list")
        list.append(img,title)
        list.addEventListener("click",()=>{
            window.location.href=`/blog/singleBlog/${ele._id}`
        })
        document.getElementById("parent-box").append(list)
    })
}

fetch("http://localhost:8090/blog/blogs")
.then((data)=>data.json())
.then((json)=>content(json))