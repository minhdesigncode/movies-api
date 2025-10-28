// const phim = []; // Removed: Unused/Incorrectly referenced
// let page = [1, 2, 3, 4, 5];
const pageURL = "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=";
// tu du lieu data.pagination
  // const pageButton = document.getElementsByClassName("pagination");
  let currentPage = 1;

const renderPhim = (dsPhim) => {
  console.log(dsPhim);
  const parentDiv = document.getElementById("phim");
  const danhSachPhim = dsPhim.map((phim) => `
    <div>
      <img class="phim-poster" src=${phim.poster_url} alt="">
      <h2>${phim.name}</h2>
      <p>${phim.year}</p>
    </div>
  `
    )
    .join("");
  parentDiv.innerHTML = danhSachPhim;
};

// render ra tat ca cac nut phan trang
// concept: Page number/Current page = buttonId 
const taiPhim = (pageNumber = 1) => {
   currentPage = pageNumber;
    console.log(`Đang tải phim cho trang: ${currentPage}`);
    fetch(`${pageURL}${pageNumber}`)
.then((response) => response.json())
// biến đổi data thành json
.then((data)=> {
    renderPhim(data.items);
    console.log(data);
}).catch(
    (err) => {
        console.log(err);
    }
);
console.log(`${pageURL}${pageNumber}`)
}
// bam vo nut nao thi hien thi phim cua trang do

//https://codepen.io/tutsplus/pen/poaQEeq


// const clickPhim = () => {

//     const button1 = document.getElementById('1');
//     if (button1) {
//         button1.addEventListener('click', (event) => {
//             // event.preventDefault();
//             console.log('Nút số 1 đã được bấm. Đang render trang phim 1...');
//             taiPhim(1);
//         });
//     }
//     const button2 = document.getElementById('2');
//     if (button2) {
//         button2.addEventListener('click', (event) => { // Đã sửa từ button1 thành button2
//             event.preventDefault();
//             console.log('Nút số 2 đã được bấm. Đang render trang phim 2...'); // Đã sửa tin nhắn
//             taiPhim(2);
//         });
//     }
//     const button3 = document.getElementById('3');
//     if (button3) { 
//         button3.addEventListener('click', (event) => { 
//             event.preventDefault();
//             console.log('Nút số 3 đã được bấm. Đang render trang phim 3...'); // Đã sửa tin nhắn
//             taiPhim(3);
//         });
//     }
    
//     const button4 = document.getElementById('4');
//     if (button4) { 
//         button4.addEventListener('click', (event) => { 
//             event.preventDefault();
//             console.log('Nút số 4 đã được bấm. Đang render trang phim 4...'); // Đã sửa tin nhắn
//             taiPhim(4);
//         });
//     }

//     const button5 = document.getElementById('5');
//     if (button5) { 
//         button5.addEventListener('click', (event) => { 
//             event.preventDefault();
//             console.log('Nút số 4 đã được bấm. Đang render trang phim 4...'); // Đã sửa tin nhắn
//             taiPhim(5);
//         });
//     }
//     // Ghi chú: Bạn cần gọi hàm này sau khi DOM đã được tải.
//     // Ví dụ: window.onload = clickPhim;
// };
// taiPhim(1);
// window.onload = clickPhim;

// ======
// =======

// const paginationButtons = document.getElementsByClassName("pagination"); 
const paginationButtons = Array.from(document.getElementsByClassName("pagination")); 
// console.log(paginationButtons);

document.addEventListener('DOMContentLoaded',() => {
paginationButtons.forEach(button => {
  //  const buttonId = button.id;
  //  console.log(buttonId);
   console.log(button.id);
   console.log(button.textContent);
    if (pageNumber) {
        button.addEventListener('click', () => {
            const pageToLoad = Number(pageNumber);
            console.log(pageToLoad);
            // Only fetch if clicking a different page
            if (pageToLoad !== currentPage) {
                taiPhim(pageToLoad);
            }
        });
    }
});
});

taiPhim();




