// Render phim fetch API
// Viết hàm render, truyền vô  dsPhim, render các div
// Render Nút paginations -> hàm logic giúp xử lý các nút phân trang -> render ra giao diện nút -> bấm nút hiện truyền trang vô phim dựa trên fetch API của trang
// 
const page = [];
const pageURL = "https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=";
const numberOfPages = 10; 

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

// let traiCay = ["Cam", "Buoi", "Xoai", "Quyt"];

// console.log(traiCay.length);

// for (let i = 0; i <= traiCay.length - 1; i++) {
//     console.log(traiCay[i])
// }


// render ra tat ca cac nut phan trang 
const renderPaginationButtons = (dsButtons) => {
    // for (let i = 0; i <= dsButton.length - 1; i++)
    //     {console.log(dsButton[i])}
    // dsButtons là mảng [1, 2, 3, '...', 2504]
    // btn là phần tử của mảng
    const buttonHTML = dsButtons.map(btn => {
        return `
            <button 
                onclick="taiPhim(${btn})" 
                class="pagination" 
            >
                ${btn}
            </button>
        `;
    }).join(''); 
    document.getElementById('pagination-container').innerHTML = buttonHTML;
        console.log(buttonHTML);
};

window.taiPhim = function taiPhim(pageNumber) {
    // const currentPageIndex = page.findIndex(item => item.id === pageNumber);
    // console.log(`Đang tải phim cho trang: ${pageNumber}`);
    // console.log(currentPageIndex );
    // if (currentPageIndex !== -1) 
        {fetch(`${pageURL}${pageNumber}`) 
.then((response) => response.json())
.then((data)=> {
    renderPhim(data.items);
    console.log(data);
    let page = getPaginationItems(data.pagination.totalPages, pageNumber, 5);
    renderPaginationButtons(page);
    console.log(page);
}).catch(
    (err) => {
        console.error(err);
    }
)};

console.log(`${pageURL}${pageNumber}`);
}
taiPhim(1);

//Concept hiển thị nhiều nút 
// 1. **totalItems**: > 2900 
// 2. **itemsPerPage**: 10 (Số phim mỗi trang)
// 3. **totalPage**: Math.ceil(totalItems / itemsPerPage) -> 290
// 4. **currentPage**: Ví dụ: 15 (Trang đang xem)
// 5. **maxButtonsToShow**: Ví dụ: 7 (Số nút trang tối đa bạn muốn hiển thị)
/**
 * Tạo danh sách các nút trang (bao gồm dấu ba chấm) cho pagination.
 * @param {number} totalPages - Tổng số trang (ví dụ: 2504).
 * @param {number} currentPage - Trang hiện tại (bắt đầu từ 1).
 * @param {number} siblingCount - Số lượng trang hiển thị ở mỗi bên của trang hiện tại (mặc định là 2).
 * @returns {Array<(number|string)>} - Mảng các trang cần hiển thị (số hoặc '...').
 */
function getPaginationItems(totalPages, currentPage, siblingCount = 2) {
    // Luôn hiển thị trang đầu tiên và trang cuối cùng
    const firstPage = 1;
    const lastPage = totalPages;

    // Tính toán phạm vi các trang xung quanh trang hiện tại
    const startPage = Math.max(firstPage + 1, currentPage - siblingCount);
    const endPage = Math.min(lastPage - 1, currentPage + siblingCount);

    const pages = [];

    // 1. Thêm trang đầu tiên
    pages.push(firstPage);


    // 2. Thêm dấu ba chấm bên trái nếu cần
    // Nếu trang bắt đầu của phạm vi lân cận lớn hơn trang thứ 2
    if (startPage > firstPage + 1) {
        pages.push('...');
    } else if (startPage === firstPage + 1) {
        // Nếu chỉ thiếu trang 2 (tức là startPage = 2) thì hiển thị trực tiếp
        // (để tránh hiển thị '1 ... 2' khi currentPage = 4 và siblingCount = 2)
        // Đây là trường hợp khi currentPage đủ gần trang 1
        for (let i = firstPage + 1; i < startPage; i++) {
            pages.push(i);
        }
    }


    // 3. Thêm các trang lân cận
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    // 4. Thêm dấu ba chấm bên phải nếu cần
    // Nếu trang kết thúc của phạm vi lân cận nhỏ hơn trang áp chót
    if (endPage < lastPage - 1) {
        pages.push('...');
    } else if (endPage === lastPage - 1) {
        // Nếu chỉ thiếu trang áp chót, hiển thị trực tiếp
        // (để tránh hiển thị '... 2503 ... 2504' khi currentPage = 2501 và siblingCount = 2)
        for (let i = endPage + 1; i < lastPage; i++) {
            pages.push(i);
        }
    }

    // 5. Thêm trang cuối cùng (chỉ khi không trùng với trang đầu)
    if (lastPage > firstPage) {
        // Đảm bảo trang cuối cùng không bị trùng lặp
        if (pages[pages.length - 1] !== lastPage) {
             // Thêm trang cuối cùng nếu chưa được thêm
             pages.push(lastPage);
        } else {
             // Nếu trang cuối cùng đã được thêm, ta loại bỏ các dấu ba chấm hoặc trang
             // lặp lại có thể xảy ra ở cuối mảng nếu trang cuối cùng nằm trong
             // phạm vi lân cận (vd: totalPages=10, currentPage=9)
             // Ta đã thêm firstPage ở đầu, và lastPage có thể được thêm trong vòng lặp lân cận,
             // hoặc ở bước này, nhưng ta cần tránh trùng lặp.
             // Logic trên đã cố gắng tránh trùng lặp, ta chỉ cần đảm bảo nó không thêm lại lần nữa.
        }
    }

    // Logic kiểm tra và loại bỏ dấu ba chấm dư thừa (nếu có)
    const finalPages = [];
    for (const item of pages) {
        const lastItem = finalPages[finalPages.length - 1];
        if (item === '...' && lastItem === '...') {
            continue; // Bỏ qua dấu ba chấm liền kề
        }
        if (item === lastPage && lastItem === lastPage) {
            continue; // Bỏ qua trang cuối cùng liền kề
        }
        if (item === firstPage && lastItem === firstPage) {
             continue; // Bỏ qua trang đầu tiên liền kề
        }
        finalPages.push(item);
    }

    return finalPages;
}
