fetch("https://gamertocoder.garena.co.th/api/minigames")
.then((response) => {
  if (response.status !== 200) {
    return response.status;
  }
  return response.json();
})
.then((data) => {
  if (typeof data == "number") {
    alert(data);
  } else {
    for (let i = 0; i < data.length; i++) {
      const currentData = data[i];
      const newListItem = document.createElement("li");
      newListItem.classList.add("card");
      const genre_array = currentData.genre;
      let genre_string = genre_array[0];
      if (genre_array.length > 1) {
        for (let j = 1; j < genre_array.length; j++) {
          genre_string = genre_string + ", " + genre_array[j];
        }
      }
      const html =
        '<div class="name" onclick="changeName(' + currentData.name +')"> ชื่อ: ' + currentData.name + '</div>'
        + '<a href="' + currentData.icon + '"><img src="' + currentData.icon + '"/></a>'
        + '<div>ประเภท: ' + genre_string + '</div>'
        + '<div class="detail">' + currentData.description + '</div>'
        + '<a href="https://play.google.com/store/apps/details?id=com.sandboxol.blockymods&hl=th&gl=US" class="button">Play Now</a>';
      html.trim();
      newListItem.innerHTML = html;
      document.getElementById("list").appendChild(newListItem);
    }
  }
});

function welcome(){
  setTimeout(() => {
    alert("ในหน้านี้ จะมีปุ่มอยู่ 3ปุ่ม 1.โลโก้เกม Blockman GO จะนำพาคุณกลับไปยังจุดเริ่มต้น - 2.Redeem ที่จะดูผู้จัดทำ - 3.Play now จะนำคุณไปที่หน้า Download เกม Blockman GO"); 
  }, 1000);
}
