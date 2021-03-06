const menu_button = document.querySelectorAll('.menu button');
const container = document.querySelector('.container');
const sub_container = document.querySelector('.sub-container');
const card_menu = document.querySelector('.card-menu');
const texttiles = document.querySelectorAll('.texttile');
const title = document.querySelector('#title');
const footer = document.querySelector('footer');
const header = document.querySelector('header');
const content_area = document.querySelector('.content-area');
const search_bar = document.querySelector('.search-bar')
const search_icon = document.querySelector('#icon-search');
const search_box = document.querySelector('#search-box');
const search_input = document.querySelector('#mySearch');
const clear_icon = document.querySelector('#icon-clear');
const searchResultListTemplate = document.querySelector("[search-result-list]")
const linkListContainer = document.querySelector("[card-list-container]")
const linkListTemplate = document.querySelector("[data-card-list-template]")
const contentListTemplate = document.querySelector('[content-list-template]')
const contentListContainer = document.querySelector('[content-list-container]')

const ANIM_DURATION = 300
let current_btn;
let card_data = [];
let search_result_list = []

fetch("https://raw.githubusercontent.com/ZoeyLe3294/wiki_webpage/main/Website/assets/database")
    .then(res => res.json())
    .then(data => {
        card_data = data
        search_result_list = data.map(entry=>{
            let searchResult = search_list_generate (entry)
            return {id:entry.id, category:entry.category, name:entry.name, language:entry.language, element:searchResult}
        })
    })
// card_data = [
//     {
//         "id": "1",
//         "category": "item",
//         "name": "Axe ",
//         "language": "vi",
//         "context": "Rất bén",
//         "detail": "Tăng 1 cục xúc xắc khi thực hiện tấn công"
//     },
//     {
//         "id": "2",
//         "category": "item",
//         "name": "Sacrificial Dagger ",
//         "language": "vi",
//         "context": "1 mảnh sắt được tạo hình và bao phủ bởi những biểu tượng bí ẩn và nhuốm màu máu ",
//         "detail": "Tăng 3 cục xúc xắc cho tấn công Might\nĐổi lại: đổ Knowledge xúc xắc\n6+ Bình an\n3-5 Mất 1 điểm tinh thần\n0-2 Nhận 2 xúc xắc phản dame vật lý và không thể thực hiện tấn công"
//     },
//     {
//         "id": "3",
//         "category": "item",
//         "name": "Blood Dagger ",
//         "language": "vi",
//         "context": "Con dao 2 lưỡi. Hút máu chủ sở hữu để hoạt động ",
//         "detail": "Sử dụng 1 Speed tăng 3 cục xúc xắc khi thực hiện tấn công.\nKhông thể bỏ lại hoặc trao đổi\nNếu bị cướp, chịu 2 cục xúc xắc sát thương vật lý"
//     },
//     {
//         "id": "4",
//         "category": "item",
//         "name": "Revolver ",
//         "language": "vi",
//         "context": "Món vũ khí tuy cũ nhưng có lực ",
//         "detail": "Tăng 1 cục xúc xắc cho tấn công tầm gần hoặc tầm xa bằng Speed và gây sát thương vật lý"
//     },
//     {
//         "id": "5",
//         "category": "item",
//         "name": "Medical Kit ",
//         "language": "vi",
//         "context": "Túi y tế  ",
//         "detail": "Đổ Knowledge để có cơ hội hồi máu khởi điểm cho bản thân hoặc đồng minh cùng phòng:\n8+ Tăng tối đa 3 điểm chỉ số vật lý\n6-7 Tăng tối đa 2 điểm chỉ số vật lý\n4-5 Tăng 1 điểm chỉ số vật lý\n0-3 Không hiệu quả"
//     }
// ]
// search_result_list = card_data.map(entry=>{
//     let searchResult = search_list_generate (entry)
//     return {id:entry.id, category:entry.category, name:entry.name, language:entry.language, element:searchResult}
// })
title.addEventListener('animationend',() => {
    footer.classList.add('fade-in-anim');
    header.classList.add('fade-in-anim');
},{once:true})
search_icon.addEventListener('click',()=>{
    search_bar.classList.toggle('active');
    search_input.value="";
    search_box.classList.add("hide");
})
clear_icon.addEventListener('click',()=>{
    search_input.value="";
    search_box.classList.add("hide");
})
search_input.addEventListener("input",(e)=>{
    const value = e.target.value.toLowerCase().trim()
    search_box.classList.remove("hide")
    search_result_list.forEach(result=>{
        // const isVisible = result.name.includes(value)
        const isVisible = result.name.toLowerCase().startsWith(value)
        result.element.classList.toggle("hide",!isVisible)
    })
})
let cardMenu_isOpen = false;
let content_isOpen = false;
menu_button.forEach(item => item.addEventListener('click',activeLink));
function activeLink(){
    let id = this.id;
    menu_button.forEach((item) => {
        let current_texttile = item.parentNode.querySelector('.texttile');
        if(current_texttile) {
            if (item.id == id) {
                current_texttile.classList.toggle('active'); 
            }else {
                current_texttile.classList.remove('active');
            }
        }
    })
    
    if (current_btn) {
        if (current_btn==id) {
            card_menu_anim(false)
            menu_button.forEach((item)=>{
                if (item.id != id) {
                    item.classList.toggle('scale-reset-anim');
                    item.classList.remove('scale-down-anim');
                    item.classList.toggle('inactive');
                }else{
                    item.classList.toggle('active');
                }
            })
            search_bar.classList.remove('active');
            title.classList.toggle('close');
            
            current_btn=null;
        }else {
            setTimeout(() => {
                card_menu_list_generate(this.value);
            }, ANIM_DURATION);

            card_menu_anim(true)
            menu_button.forEach((item)=>{
                if (item.id == id) {
                   item.classList.remove('scale-down-anim');
                   item.classList.toggle('active');
                   item.classList.toggle('inactive');
                }else{
                    item.classList.add('scale-down-anim');
                    item.classList.remove('scale-reset-anim');
                    item.classList.remove('active');
                    item.classList.add('inactive');
                }
            })
            current_btn = id;
        }
    } else {
        content_isOpen ? card_menu_anim(true) : card_menu_anim(false)
        card_menu_list_generate(this.value)
        menu_button.forEach((item)=>{
            if (item.id != id) {
                item.classList.add('scale-down-anim') ;
                item.classList.remove('scale-reset-anim') ;
                item.classList.toggle('inactive');
            }else{
                item.classList.toggle('active');
            }
        })
        title.classList.add('close');
        current_btn = id;
    }
    

}
function card_menu_Promise (){
    const myCardPromise = new Promise((resolve, reject) => {
            card_menu.classList.add('close');
            card_menu.classList.remove('open');
            resolve('success');
      });
    return myCardPromise
}
function content_Promise (){
    const myContentPromise = new Promise((resolve, reject) => {
            contentListContainer.classList.add('inactive');
            contentListContainer.classList.remove('active');
            resolve('success');
      });
    return myContentPromise
}
function card_menu_anim(repeat){
    if (repeat) {
        if (cardMenu_isOpen){
            card_menu_Promise().then((message)=>{
                setTimeout(() => {
                    card_menu.classList.add('open');
                    card_menu.classList.remove('close');
                }, ANIM_DURATION);
            })
        } else {
            card_menu.classList.add('open');
            card_menu.classList.remove('close');
            cardMenu_isOpen = true;
        }
        if (content_isOpen){
            content_Promise().then((message)=>{
                setTimeout(() => {
                    contentListContainer.classList.add('active');
                    contentListContainer.classList.remove('inactive');
                }, ANIM_DURATION);
            })
        } else {
            contentListContainer.classList.add('active');
            contentListContainer.classList.remove('inactive');  
            content_isOpen = true;
        }
    }else{

        if (cardMenu_isOpen){
            card_menu.classList.add('close');
            card_menu.classList.remove('open');
            cardMenu_isOpen = false;
        } else {
            card_menu.classList.add('open');
            card_menu.classList.remove('close');
            cardMenu_isOpen = true;
        }
        if (content_isOpen){
            contentListContainer.classList.add('inactive');
            contentListContainer.classList.remove('active'); 
            content_area.classList.remove('focus');
            content_isOpen = false;
        } else {
            contentListContainer.classList.add('active');
            contentListContainer.classList.remove('inactive'); 
            content_area.classList.add('focus'); 
            content_isOpen = true;
        }
    }
    console.log('cardMenu_isOpen '+cardMenu_isOpen)
    console.log('content_isOpen '+content_isOpen)
}
function card_menu_list_generate(val){
    linkListContainer.innerHTML=''
    contentListContainer.innerHTML=''
    card_data.forEach(result => {
        if (result.category == val) {
            //load link_list
            const linkList = linkListTemplate.content.cloneNode(true).children[0]
            const link = linkList.querySelector('[data-header]')
            link.textContent = result.name.toUpperCase()
            linkList.addEventListener('click',()=>{
                document.getElementById(result.name.toLowerCase()).scrollIntoView({behavior: 'smooth' })
            })
            linkListContainer.append(linkList)
            //load content
            const contentList = contentListTemplate.content.cloneNode(true).children[0]
            const content_title = contentList.querySelector('.content-title')
            const content_description = contentList.querySelector('.content-description')
            const content_detail = contentList.querySelector('.content-detail')
            content_title.textContent = result.name
            content_title.id = result.name.toLowerCase()
            content_description.textContent = result.context
            content_detail.textContent = result.detail
            contentListContainer.append(contentList)
        }
    })
}
function search_list_generate (data) {
    const searchResult = searchResultListTemplate.content.cloneNode(true).children[0]
    //set img
    const img = searchResult.querySelector("img")
    switch (data.category){
        case 'item': img.src = "/wiki_webpage/Website/assets/img/icon_item.svg"
        break;
        case 'omen': img.src = "/wiki_webpage/Website/assets/img/icon_omen.svg"
        break;
        case 'event': img.src = "/wiki_webpage/Website/assets/img/icon_event.svg"
        break;
        case 'room': img.src = "/wiki_webpage/Website/assets/img/icon_room.svg"
        break;
    }
    //set name
    const name = searchResult.querySelector("[name]")
    name.textContent = data.name.toUpperCase()
    //set anchor link ...
    searchResult.addEventListener('click',()=>{
        title.classList.add('close');
        
        card_menu.classList.remove('close');
        card_menu.classList.remove('open');

        content_area.classList.add('focus');
        contentListContainer.innerHTML=''
        const result = card_data.filter((res)=>{
            return res.name.toUpperCase()==data.name.toUpperCase()
        })[0]
        menu_button.forEach((item)=>{
            item.classList.remove('scale-reset-anim');
            item.classList.toggle('scale-down-anim',item.value != result.category);
            item.classList.toggle('inactive',item.value != result.category);
            item.classList.toggle('active',item.value == result.category);
            let current_texttile = item.parentNode.querySelector('.texttile');
            if (current_texttile) {
                current_texttile.classList.toggle('active',item.value == result.category);
                current_texttile.classList.toggle('inactive',item.value != result.category);
            }
            if(item.value == result.category) current_btn = item.id
        })
        const contentList = contentListTemplate.content.cloneNode(true).children[0]
        const content_title = contentList.querySelector('.content-title')
        const content_description = contentList.querySelector('.content-description')
        const content_detail = contentList.querySelector('.content-detail')
        content_title.textContent = result.name
        content_title.id = result.name.toLowerCase()
        content_description.textContent = result.context
        content_detail.textContent = result.detail
        contentListContainer.append(contentList)
        content_isOpen=true;
        // cardMenu_isOpen = true;
        contentListContainer.classList.toggle('inactive',!content_isOpen)
        contentListContainer.classList.toggle('active',content_isOpen)
    })

    search_box.append(searchResult)
    return searchResult;
}
document.onclick = function (e){
    if(e.target.id !="search-box"){
        search_box.classList.add("hide");
    }
}