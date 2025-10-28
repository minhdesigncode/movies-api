// Khai báo biến
const page = [];
const pageURL = "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=";
const numberOfPages = 8; 
// Khai báo lại biến currentPage (Nên khai báo ở phạm vi toàn cục)
let currentPage = 1;

for (let i = 1; i <= numberOfPages; i++) {
    page.push({
        id: i,
        name: `Trang ${i}`,
        url: `${pageURL}${i}`
    });
}
console.log(page);

const renderPhim = (dsPhim) => {
  const parentDiv = document.getElementById("phim");
  const danhSachPhim = dsPhim.map((phim) => `
    <div>
      <img class="phim-poster" src="${phim.poster_url}" alt="${phim.name}">
      <h2>${phim.name}</h2>
      <p>${phim.year}</p>
    </div>
  `).join("");
  
  if (parentDiv) {
    parentDiv.innerHTML = danhSachPhim;
  } 
};

window.taiPhim = function taiPhim(pageNumber) {
    const pageIndex = page.findIndex(item => item.id === pageNumber);
    console.log(`Đang tải phim cho trang: ${pageNumber}`);
    if (pageIndex !== -1) 
        {fetch(`${pageURL}${pageNumber}`) 
.then((response) => response.json())
.then((data)=> {
    renderPhim(data.items);
    console.log(data);
}).catch(
    (err) => {
        console.error(err);
    }
)};
// Lưu ý: Biến pageURLBase chưa được khai báo. Chỉ dùng pageURL.
console.log(`${pageURL}${pageNumber}`);
}

// --- Hàm Render Nút Phân Trang ĐÃ SỬA LỖI ---
const renderPaginationButtons = (pages) => {
    const buttonHTML = pages.map(page => {
        return `
            <button 
                onclick="taiPhim(${page.id})" 
                class="pagination" 
                id="${page.id}"
            >
                ${page.id}
            </button>
        `;
    }).join(''); 
        document.getElementById('pagination-container').innerHTML = buttonHTML;
};
renderPaginationButtons(page);
taiPhim(1);