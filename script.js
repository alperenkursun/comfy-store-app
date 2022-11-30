var ShoppingData = JSON.parse(localStorage.getItem("ShoppingData"));
var totall = JSON.parse(localStorage.getItem("totall"));
var totalred = JSON.parse(localStorage.getItem("totalred"));
var htmlflag = 0;
displayshop();
class Shopping {
  constructor(id, img, name, price, numbers) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.price = price;
    this.numbers = numbers;
  }
}

$(function () {
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

myMediaQuery.addEventListener("change", widthChangeCallback);

///////////////////////////////////////
var products;
$(document).ready(function () {
  $.get(
    "https://course-api.com/javascript-store-products",
    function (data, status) {
      $("#featured").html("");
      products = data;
      console.log(products);
      for (let i = 0; i < 3; i++) {
        var text = `
          <div  class="col-4 text-center position-relative classs">
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
            <img src="${
              products[i].fields.image[0].url
            }" class="w-100 rounded" "/>
            <div class="text-secondary m-2 text-capitalize">${
              products[i].fields.name
            }</div>
            <div class="text-secondary m-2 fw-bold">$${priceedit(
              products[i].fields.price
            )}</div>
          </div>
          `;

        $("#featured").append(text);
      }
    }
  );
});

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

function displayshop() {
  totall = 0;
  totalred = 0;
  $("#sidebar #middl").html("");
  for (let i = 0; i < ShoppingData.length; i++) {
    var pricee = priceedit(ShoppingData[i].price);
    console.log(pricee);
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
                <p class="pb-1 m-0">$${pricee}</p>
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
  localStorage.setItem("totall", JSON.stringify(totall));
  localStorage.setItem("totalred", JSON.stringify(totalred));
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

function allproducts() {
  htmlflag = 1;
  localStorage.setItem("htmlflag", htmlflag);
}
