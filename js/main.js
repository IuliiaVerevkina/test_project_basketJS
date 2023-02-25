

if (!localStorage.getItem("goods")) {
  localStorage.setItem("goods", JSON.stringify([]));
}
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
  keyboard: false,
});

let options = {
  valueNames: ["name", "price"],
};
let userList;

document
  .querySelector("button.add_new")
  .addEventListener("click", function (e) {
    const name = document.getElementById("good_name").value;
    const price = document.getElementById("good_price").value;
    const count = document.getElementById("good_count").value;
    // are all fields filled
    if (name && price && count) {
      // reset
      document.getElementById("good_name").value = "";
      document.getElementById("good_price").value = "";
      document.getElementById("good_count").value = "1";

      // replacing an empty array
      const goods = JSON.parse(localStorage.getItem("goods"));
      goods.push(["good_" + goods.length, name, price, count, 0, 0, 0]);
      localStorage.setItem("goods", JSON.stringify(goods));

      // update interface display
      update_goods();
      myModal.hide();
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Please fill in all lines",
      });
    }
  });

update_goods();

function update_goods() {
  let resultPrice = 0;
  let tbody = document.querySelector(".list");
  tbody.innerHTML = "";
  document.querySelector(".cart").innerHTML = "";
  let goods = JSON.parse(localStorage.getItem("goods"));
  if (goods.length) {
    table1.hidden = false;
    table2.hidden = false;
    for (let i = 0; i < goods.length; i++) {
      tbody.insertAdjacentHTML(
        "beforeend",
        `
        <tr class="align-middle">
        <td>${i + 1}</td>
        <td class="name">${goods[i][1]}</td>
        <td class="price">${goods[i][2]}</td>
        <td>${goods[i][3]}</td>
        <td><button class="btn btn-danger good_delete" data-delete="${
          goods[i][0]
        }">&#10006;</button></td>
        <td><button class="btn btn-primary good_delete" data-goods="${
          goods[i][0]
        }">&#10149;</button></td>
        </tr>
      `
      );
      if (goods[i][4] > 0) {
        goods[i][6] =
          goods[i][4] * goods[i][2] -
          goods[i][4] * goods[i][2] * goods[i][5] * 0.01;
        resultPrice += goods[i][6];
        document.querySelector(".cart").insertAdjacentHTML(
          "beforeend",
          `
        <tr class="align-middle">
        <td>${i + 1}</td>
        <td class="price_name">${goods[i][1]}</td>
        <td class="price_one">${goods[i][2]}</td>
        <td class="price_count">${goods[i][4]}</td>
        <td class="price_discount"><input data_goodId="${
          goods[i][0]
        }" type="text" value="${goods[i][5]}" min = "0" max="100"></td>
        <td> ${goods[i][6]}</td>
        <td><button class="btn btn-danger good_delete" data-delete="${
          goods[i][0]
        }">&#10006;</button></td>
        </tr>
        `
        );
      }
    }
    userList = new List("goods", options);
  } else {
    table1.hidden = true;
    table2.hidden = true;
  }
  document.querySelector(".price_result").innerHTML = resultPrice + "&#8364;";
}

document.querySelector(".list").addEventListener("click", function (e) {
  if (!e.target.dataset.delete) {
    return;
  }
  Swal.fire({
    title: "Attention!",
    text: "Are you sure you want to delete the item?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      let goods = JSON.parse(localStorage.getItem("goods"));
      for (let i = 0; i < goods.length; i++) {
        if (goods[i][0] === e.target.dataset.delete) {
          goods.splice(i, 1);
          localStorage.setItem("goods", JSON.stringify(goods));
          update_goods();
        }
      }
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
});

document.querySelector(".list").addEventListener("click", function (e) {
  if (!e.target.dataset.goods) {
    return;
  }
  let goods = JSON.parse(localStorage.getItem("goods"));
  for (let i = 0; i < goods.length; i++) {
    if (goods[i][3] > 0 && goods[i][0] === e.target.dataset.goods) {
      goods[i].splice(3, 1, goods[i][3] - 1);
      goods[i].splice(4, 1, goods[i][4] + 1);
      localStorage.setItem('goods', JSON.stringify(goods));
      update_goods();
    }
  }
});
document.querySelector(".cart").addEventListener("click", function (e) {
  if (!e.target.dataset.delete) {
    return;
  }
  let goods = JSON.parse(localStorage.getItem("goods"));
  for (let i = 0; i < goods.length; i++) {
    if (goods[i][4] > 0 && goods[i][0] === e.target.dataset.delete) {
      goods[i].splice(3, 1, goods[i][3] + 1);
      goods[i].splice(4, 1, goods[i][4] - 1);
      localStorage.setItem("goods", JSON.stringify(goods));
      update_goods();
    }
  }
});
