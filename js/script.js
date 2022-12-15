var img = document.getElementById("popcat1");
var count = document.getElementById("score");
var Score = document.getElementById('my_score');
var health = 100;
var max_health = 100;
var score = 0;
var audio = new Audio('./icon-sound/pop.mp3');
const element = document.getElementById("display");
const element2 = document.getElementById("HP");
const element3 = document.getElementById("score");

// mouseclick event
img.addEventListener("mousedown", function () {
  increaseScore();
  if (health > 0) {
    img.src = './image/Treasure2.png';
    audio.play();
  }
  drawHealthbar(display, 10, 10, 650, 60, health, max_health);
  dead()
});

img.addEventListener("mouseup", function () {
  if (health > 0) {
    img.src = './image/Treasure1.png';
  }
  audio.play();
});

// touch event
img.addEventListener("touchstart", function () {
  increaseScore();
  if (health > 0) {
    img.src = './image/Treasure2.png';
    audio.play();
  }

});

img.addEventListener("touchmove", function () {
  if (health > 0) {
    img.src = '/image/Treasure1.png';
  } else {
    img.src = './image/Treasure3.png';
  }
  audio.play();
});


var display = document.getElementById('display').getContext('2d');

function drawHealthbar(canvas, x, y, width, height, health, max_health,) {
  if (health >= max_health) { health = max_health; }
  if (health <= 0) { health = 0; }
  canvas.fillStyle = '#000000';
  canvas.fillRect(x, y, width, height);
  var colorNumber = Math.round((1 - (health / max_health)) * 0xff) * 0x10000 + Math.round((health / max_health) * 0xff) * 0x100;
  var colorString = colorNumber.toString(16);
  if (colorNumber > 0x100000) {
    canvas.fillStyle = '#' + colorString;
  } else if (colorNumber << 0x100000 && colorNumber > 0x10000) {
    canvas.fillStyle = '#0' + colorString;
  } else if (colorNumber << 0x10000) {
    canvas.fillStyle = '#00' + colorString;
  }
  canvas.fillRect(x + 1, y + 1, (health / max_health) * (width - 2), height - 2);
}

function startcount() {
  drawHealthbar(display, 10, 10, 640, 50, health, max_health);
  img.src = './image/Treasure1.png';
}

function increaseScore() {
  score++;
  health = health - 5;
  console.log({ health });
  count.innerHTML = score;
}

function dead() {
  if (health == 0) {
    element.remove();
    element2.remove();
    score = "กดที่สมบัติเพื่อรับรางวัล";
    count.innerHTML = score;
    img.src = './image/Treasure3.png';
    img.style.margin = "15%  0";
    alert("โอ๊ะ! ดูเหมือนว่าคุณเปิดกล่องสมบัตินี้ได้สำเร็จ ลองดูข้างในกันเถอะ");

    console.log(img.src);
    console.log(health);
    audio.play();
    document.getElementById("score").style.padding = "10% 15% 0";
  } else if (health < 0) {
    count.innerHTML = "";
    document.getElementById("score").style.padding = "15% 15% 0";

    var txt;
    setTimeout(() => {
      if (confirm("CODE: gamertocoder-419 นำ Code นี้ไปกรอกในหน้าถัดไปกันเลย!")) {
        location.replace("Api.html");
      } else {
        location.replace("Blockpop.html");
      }
      document.getElementById("demo").innerHTML = txt;
    }, 500);

  }

}

//--------------------------------สำหรับAPI----------------------------//
fetch("https://gamertocoder.garena.co.th/api/minigames")
  .then((response) => {
    if (response.status !== 200) {
      return response.status;
    }
    return response.json();
  })
  .then((data) => {
    if (typeof data == "number") {
      // alert(data);
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
          '<div class="name" onclick="changeName(' + currentData.name + ')"> ชื่อ: ' + currentData.name + '</div>'
          + '<img src="' + currentData.icon + '"/>'
          + '<div>ประเภท: ' + genre_string + '</div>'
          + '<div class="detail">' + currentData.description + '</div>'
          + '<a href="' + currentData.icon + '">link</a>';
        html.trim();
        newListItem.innerHTML = html;
        document.getElementById("list").appendChild(newListItem);
      }
    }
  });