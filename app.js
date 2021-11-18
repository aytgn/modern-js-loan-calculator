//Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", function (event) {
    //hide results
    document.getElementById("results").style.display = "none";
    //show spinner
    document.getElementById("loading").style.display = "block";
    //fire calculateResults after 2 secs
    setTimeout(calculateResults, 2000);

    event.preventDefault();
  });

function calculateResults(event) {
  //UI vars
  const UIamount = document.querySelector("#amount");
  const UIinterest = document.querySelector("#interest");
  const UIyears = document.querySelector("#years");
  const UImonthlyPayment = document.querySelector("#monthly-payment");
  const UItotalPayment = document.querySelector("#total-payment");
  const UItotalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value / 100 / 12);
  const calculatedPayments = parseFloat(UIyears.value * 12);

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );

    //show results
    document.getElementById("results").style.display = "block";
    //hide spinner
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Check Numbers!");
    document.getElementById("loading").style.display = "none";
  }
}

function showError(error) {
  const errorDiv = document.createElement("div"); //create a div
  errorDiv.className = "alert alert-danger "; //add a representative class
  errorDiv.appendChild(document.createTextNode(error)); //create a text node and append to div

  const card = document.querySelector(".card"); //get card element
  const heading = document.querySelector(".heading"); //get heading element

  if (!document.querySelector(".alert")) {
    //do bellow only if there is not already an error
    card.insertBefore(errorDiv, heading); //insert error div before heading
    setTimeout(clearError, 2500); //clear error after 3secs
  }
}
function clearError() {
  document.querySelector(".alert").remove();
}
