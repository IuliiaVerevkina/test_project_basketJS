if (!localStorage.getItem("goods")) {
  localStorage.setItem("goods", JSON.stringify([]));
}
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
	keyboard: false
});

document.querySelector("button.add_new").addEventListener('click', function(e) {
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
    goods.push(["good" + goods.length, name, price, count, 0, 0, 0]);
    localStorage.setItem("goods", JSON.stringify(goods));

    // update interface display
    //update_goods()
	myModal.hide()
  } else {
	Swal.fire({
    icon: "error",
    title: "ERROR",
    text: "Please fill in all lines",
  });
  }
});
