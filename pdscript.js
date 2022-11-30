var ShoppingData = JSON.parse(localStorage.getItem("ShoppingData"));
var totall = JSON.parse(localStorage.getItem("totall"));
var totalred = JSON.parse(localStorage.getItem("totalred"));
var htmlflag = localStorage.getItem("htmlflag");
class Shopping {
  constructor(id, img, name, price, numbers) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.price = price;
    this.numbers = numbers;
  }
}

console.log(totall);
function stringify(x) {
  console.log(Object.prototype.toString.call(x));
}
$(function () {
  displayshop();

  function checkMediaQuery() {
    if (window.innerWidth < 800) {
      $("#btn").html(`<i class="fa-solid fa-bars"></i>`);
      $("#mid").removeClass("d-block").addClass("d-none");
      $("#right").removeClass("d-block").addClass("d-none");
      $("#left .text-dark").css({ "font-size": "40px" });
      $("#left").removeClass("col-8").addClass("col-12");
      $("#middle").removeClass("d-none").addClass("d-block");
      $("#middlecon").removeClass("d-block").addClass("d-none");
      $("#middle").css({
        width: "0px",
        height: "0px",
      });
      $("nav").css({ "background-color": "white" });
    }
    if (window.innerWidth > 800) {
      $("#btn").text("Comfy");
      $("#mid").removeClass("d-none").addClass("d-block");
      $("#right").removeClass("d-none").addClass("d-block");
      $("#left .text-dark").css({ "font-size": "80px" });
      $("#left").removeClass("col-12").addClass("col-8");
    }
  }
  window.addEventListener("resize", checkMediaQuery);

  $("#btn").click(function () {
    if (window.innerWidth < 800) {
      $("#middle").css({
        width: "500px",
        height: "600px",
      });
      $("#middlecon").removeClass("d-none").addClass("d-block");
    }
  });

  $(".fa-solid.fa-xmark").click(function () {
    if (window.innerWidth < 800) {
      $("#middle").css({
        width: "0px",
        height: "0px",
      });
      $("#middlecon").removeClass("d-block").addClass("d-none");
    }
  });
});

// ///////

var menu = document.getElementById("menu");
var sidebar = document.getElementById("sidebar");
var xmark = document.getElementById("xmark");

const myTimeout = setInterval(second, 1000);
var flag = 0;
function second() {
  if (flag == 0) {
    menu.style.transform = "scale(1)";
    flag = 1;
  } else {
    menu.style.transform = "scale(1)";
    flag = 0;
  }
}
var flag2 = 0;
var flag3 = 0;
menu.addEventListener("click", function () {
  if (flag2 == 0 && flag3 == 0) {
    sidebar.style.width = "450px";
    flag2 = 1;
  } else if (flag2 == 0 && flag3 == 1) {
    sidebar.style.width = "500px";
    flag2 = 1;
  } else {
    sidebar.style.width = "0px";
    flag2 = 0;
  }
});

xmark.addEventListener("click", function () {
  sidebar.style.width = "0px";
  flag2 = 0;
});

let myMediaQuery = window.matchMedia("(min-width: 800px)");

function widthChangeCallback(myMediaQuery) {
  flag3 = 1;
}

var products;

myMediaQuery.addEventListener("change", widthChangeCallback);

var idd = localStorage.getItem("idd");

$(document).ready(function () {
  if (htmlflag == 0) {
    $.get(
      "https://course-api.com/javascript-store-products",
      function (data, status) {
        $("#mainn").html("");
        products = data;
        console.log(products);
        for (let i = 0; i < 12; i++) {
          if (products[i].id == idd) {
            var text = `
  <div class="col-6">
  <img src="${
    products[i].fields.image[0].url
  }" class="w-100" style="height: 500px" />
  </div>
  <div class="col-6 p-3 text-start">
  <h3 class="text-capitalize">${products[i].fields.name}</h3>
  <h4 class="text-muted fw-light text-capitalize">${
    products[i].fields.company
  }</h4>
  <h5 class="fw-normal">$${priceedit(products[i].fields.price)}</h5>
  <div class="d-flex">
  <div
  class="rounded-circle m-1"
  style="width: 20px; height: 20px; background-color:${
    products[i].fields.colors[0]
  };"
  ></div>
  <div
  class="rounded-circle m-1"
  style="width: 20px; height: 20px; background-color:${
    products[i].fields.colors[1]
  }!important"
  ></div>
  <div
  class="rounded-circle m-1"
  style="width: 20px; height: 20px; background-color:${
    products[i].fields.colors[2]
  };"
  ></div>
  </div>
  <p class="mt-2">
  Cloud bread VHS hell of banjo bicycle rights jianbing umami
  mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher
  waistcoat, authentic chillwave trust fund. Viral typewriter
  fingerstache pinterest pork belly narwhal. Schlitz venmo everyday
  carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag
  kinfolk microdosing gochujang live-edge
  </p>
  <button id="${
    products[i].id
  }" onclick="shop(id)" class="btn btn-primary">Add To Cart</button>
  </div>
  `;

            $("#mainn").append(text);
            $("#breadcrumb").text(`Home/${products[i].fields.name}`);
          }
        }
      }
    );
    function priceedit(pricee) {
      return pricee.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
    }
  } else if (htmlflag == 1) {
    display("all");
  }
});

/////////////////////////////////////////////////////////

var flagg = 0;
var totall = 0;
var totalred = 0;
function shop(idd) {
  flagg = 0;
  for (let i = 0; i < ShoppingData.length; i++) {
    if (ShoppingData[i].id == idd) {
      flagg = 1;
      ShoppingData[i].numbers += 1;
      break;
    }
  }
  if (flagg == 0) {
    for (let i = 0; i < 12; i++) {
      if (products[i].id == idd) {
        ShoppingData.push(
          new Shopping(
            products[i].id,
            products[i].fields.image[0].url,
            products[i].fields.name,
            priceedit(products[i].fields.price),
            1
          )
        );
        break;
      }
    }
  }
  displayshop();
  console.log(ShoppingData);
}

function displayshop() {
  totall = 0;
  totalred = 0;
  $("#sidebar #middl").html("");
  for (let i = 0; i < ShoppingData.length; i++) {
    //  ShoppingData[i].price
    text = `
            <div class="w-100 d-flex justify-content-between align-items-center">
            <div class="d-flex m-3" style="height: 60px">
              <img
                src="${ShoppingData[i].img}"
                class="rounded p-1"
                style="width: 100px; height: 60px"
              />
              <div class="m-1">
                <div class="h6 pb-1 text-capitalize">${ShoppingData[i].name}</div>
                <p class="pb-1 m-0">$${ShoppingData[i].price}</p>
                <div id="${ShoppingData[i].id}" onclick="remove(id)"
                  class="text-muted d-flex align-items-start justify-content-start"
                >
                  remove
                </div>
              </div>
            </div>

            <div class="m-3">
              <i id="${ShoppingData[i].id}" onclick="up(id)" class="fa-solid fa-caret-up fs-4" style="color: brown"></i>
              <p class="m-0 text-center fs-4">${ShoppingData[i].numbers}</p>
              <i id="${ShoppingData[i].id}" onclick="down(id)" class="fa-solid fa-caret-down fs-4" style="color: brown"></i>
            </div>
          </div>
            `;

    $("#sidebar #middl").append(text);
    totall += ShoppingData[i].price * ShoppingData[i].numbers;
    totalred += ShoppingData[i].numbers;
  }
  var textt = `
  Total: $${numberWithCommas(totall.toFixed(2))}
  `;
  $("#total").text(textt);
  $("#red").text(totalred);
  localStorage.setItem("ShoppingData", JSON.stringify(ShoppingData));
}

function priceedit(pricee) {
  return pricee.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
}

function down(idd) {
  for (let i = 0; i < ShoppingData.length; i++) {
    if (ShoppingData[i].id == idd) {
      if (ShoppingData[i].numbers != 1) {
        ShoppingData[i].numbers -= 1;
        break;
      }
    }
  }
  displayshop();
}

function up(idd) {
  for (let i = 0; i < ShoppingData.length; i++) {
    if (ShoppingData[i].id == idd) {
      ShoppingData[i].numbers += 1;
      break;
    }
  }
  displayshop();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function remove(idd) {
  for (let i = 0; i < ShoppingData.length; i++) {
    if (ShoppingData[i].id == idd) {
      ShoppingData.splice($.inArray(ShoppingData[i], ShoppingData), 1);
    }
  }
  displayshop();
}

///////////////////////////////
var filter = "";

function alll() {
  filter = $("#all").text();
  display(filter);
}
function ikea() {
  filter = $("#ikea").text();
  display(filter);
}
function marcos() {
  filter = $("#marcos").text();
  display(filter);
}
function caressa() {
  filter = $("#caressa").text();
  display(filter);
}
function liddy() {
  filter = $("#liddy").text();
  display(filter);
}

function display(filter) {
  $("#mainn").html("");
  $("#mainn").html(`<div class="row">
      <div class="col-2">
        <input
          id="input"
          type="text"
          placeholder="search..."
          class="form-control"
          onkeyup="keyup()"
        />
        <h4 class="mt-5">Company</h4>
        <p id="all" onclick="alll()" class="text-secondary ms-3 mt-3">All</p>
        <p id="ikea" onclick="ikea()" class="text-secondary ms-3">Ikea</p>
        <p id="marcos" onclick="marcos()" class="text-secondary ms-3">Marcos</p>
        <p id="caressa" onclick="caressa()" class="text-secondary ms-3">Caressa</p>
        <p id="liddy" onclick="liddy()" class="text-secondary ms-3">Liddy</p>
      </div>
      <div class="col-10">
        <div class="row">

         </div>
    </div>
    `);
  $.get(
    "https://course-api.com/javascript-store-products",
    function (data, status) {
      products = data;

      for (let i = 0; i < 12; i++) {
        if (filter.toLowerCase() == products[i].fields.company) {
          var text = `
  <div class="col-4 text-center position-relative classs">
  <div
          class="position-absolute top-0 start-50 translate-middle-x mt-5 clickk"
        >
          <i
            class="fa-solid fa-magnifying-glass p-2 m-1 text-white bg-danger fs-3 rounded-circle"
            id="${products[i].id}"
            onclick="pd(id)"
          ></i>
          <i
            class="fa-solid fa-cart-shopping p-2 m-1 text-white bg-danger fs-3 rounded-circle"
            id="${products[i].id}"

            onclick="shop(id)"
          ></i>
        </div>
    <img src="${products[i].fields.image[0].url}" class="w-100 rounded" />
    <div class="text-secondary m-2 text-capitalize">${
      products[i].fields.name
    }</div>
    <div class="text-secondary m-2 fw-bold">${priceedit(
      products[i].fields.price
    )}</div>
  </div>
  `;
          $("#mainn .col-10 .row").append(text);
          $("#breadcrumb").text("Home/Products");
        } else if (filter.toLowerCase() == "all") {
          var text = `
      <div class="col-4 text-center position-relative classs">
      <div
          class="position-absolute top-0 start-50 translate-middle-x mt-5 clickk"
        >
          <i
            class="fa-solid fa-magnifying-glass p-2 m-1 text-white bg-danger fs-3 rounded-circle"
            id="${products[i].id}"
            onclick="pd(id)"
          ></i>
          <i
            class="fa-solid fa-cart-shopping p-2 m-1 text-white bg-danger fs-3 rounded-circle"
            id="${products[i].id}"

            onclick="shop(id)"
          ></i>
        </div>
        <img src="${products[i].fields.image[0].url}" class="w-100 rounded" />
        <div class="text-secondary m-2 text-capitalize">${
          products[i].fields.name
        }</div>
        <div class="text-secondary m-2 fw-bold">$${priceedit(
          products[i].fields.price
        )}</div>
      </div>
      `;

          $("#mainn .col-10 .row").append(text);
          $("#breadcrumb").text("Home/Products");
        }
      }
    }
  );
}

function search(word) {
  $("#mainn .col-10 .row").html("");

  for (let i = 0; i < 12; i++) {
    if (products[i].fields.name.toLowerCase().includes(`${word}`)) {
      var text = `
  <div class="col-4 text-center position-relative classs">
  <div
  class="position-absolute top-0 start-50 translate-middle-x mt-5 clickk"
>
  <i
    class="fa-solid fa-magnifying-glass p-2 m-1 text-white bg-danger fs-3 rounded-circle"
    id="${products[i].id}"
    onclick="pd(id)"
  ></i>
  <i
    class="fa-solid fa-cart-shopping p-2 m-1 text-white bg-danger fs-3 rounded-circle"
    id="${products[i].id}"

    onclick="shop(id)"
  ></i>
</div>
    <img src="${products[i].fields.image[0].url}" class="w-100 rounded" />
    <div class="text-secondary m-2 text-capitalize">${
      products[i].fields.name
    }</div>
    <div class="text-secondary m-2 fw-bold">${priceedit(
      products[i].fields.price
    )}</div>
  </div>
  `;

      $("#mainn .col-10 .row").append(text);
    }
  }
  if ($("#mainn .col-10 .row").html() == "") {
    var text = `
    <p class="fs-5 text-danger">Not found<p/>
`;

    $("#mainn .col-10 .row").append(text);
  }
}

var word = "";
function keyup() {
  word = $("#input").val();
  search(word);
}

function allproducts() {
  htmlflag = 1;
  localStorage.setItem("htmlflag", htmlflag);
}

function pd(idd) {
  htmlflag = 0;
  localStorage.setItem("htmlflag", htmlflag);
  localStorage.setItem("idd", idd);
  location.href = "productdetails.html";
}

var flagg = 0;
function shop(idd) {
  flagg = 0;
  for (let i = 0; i < ShoppingData.length; i++) {
    if (ShoppingData[i].id == idd) {
      flagg = 1;
      ShoppingData[i].numbers += 1;
      break;
    }
  }
  if (flagg == 0) {
    for (let i = 0; i < 12; i++) {
      console.log(products[i].id);

      if (products[i].id == idd) {
        ShoppingData.push(
          new Shopping(
            products[i].id,
            products[i].fields.image[0].url,
            products[i].fields.name,
            priceedit(products[i].fields.price),
            1
          )
        );
        break;
      }
    }
  }
  displayshop();
}
