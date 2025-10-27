// const phim = []; // Removed: Unused/Incorrectly referenced
// let page = [1, 2, 3, 4, 5];
const pageURL = "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=";
// tu du lieu data.pagination
  // const pageButton = document.getElementsByClassName("pagination");
  let currentPage = 1;

const renderPhim = (dsPhim) => {
  console.log(dsPhim);
  const parentDiv = document.getElementById("phim");
  const danhSachPhim = dsPhim
    .map(
      (phim) => `
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
}
// bam vo nut nao thi hien thi phim cua trang do

//https://codepen.io/tutsplus/pen/poaQEeq

const paginationButtons = Array.from(document.getElementsByClassName("pagination")); 

document.addEventListener('DOMContentLoaded',() => {
paginationButtons.forEach(button => {
   const buttonId = button.id;
   const pageNumber = button.textContent;
   console.log(button);
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
taiPhim();
});



