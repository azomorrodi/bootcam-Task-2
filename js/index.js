let allTransactions = [];

function loadTransactions() {
  fetch("http://localhost:3000/transactions") // Replace with your API endpoint
    .then((response) => response.json())
    .then((data) => {
      allTransactions = data;
      displayTransactions(allTransactions);

      // Hide the load button after transactions are displayed
      document.getElementById("loadTransactionsButton").style.display = "none";

      // Show the search container
      document.getElementById("searchContainer").style.display = "flex";
    })
    .catch((error) => {
      console.error("Error loading transactions:", error);

      // Show an error message to the user
      const transactionsContainer = document.getElementById(
        "transactionsContainer"
      );
      transactionsContainer.innerHTML =
        "<br><p>خطا: تراکنشها بارگذاری نمی شود.لطفا بعدا سعی نمایید</p>";
    });
}

function displayTransactions(transactions) {
  const transactionsContainer = document.getElementById(
    "transactionsContainer"
  );
  const transactionListText = document.createElement("div");
  transactionListText.id = "transactionListText";
  transactionListText.textContent = "لیست تراکنش های شما";

  const table = document.createElement("table");
  const headerRow = table.insertRow();
  headerRow.insertCell().textContent = "تاریخ تراکنش";
  headerRow.insertCell().textContent = "شماره پیگیری ";
  headerRow.insertCell().textContent = "مبلغ";
  headerRow.insertCell().textContent = "نوع تراکنش";
  headerRow.insertCell().textContent = "ردیف";

  // Removed Sorting functionality

  transactions.forEach((transaction) => {
    const row = table.insertRow();
    const formattedTime = new Date(transaction.date).toLocaleTimeString(
      "fa-IR",
      { hour: "2-digit", minute: "2-digit" }
    );
    const formattedDate = new Date(transaction.date).toLocaleDateString(
      "fa-IR"
    );
    const dateTimeCell = row.insertCell();
    dateTimeCell.textContent = `${formattedDate} - ساعت ${formattedTime}`;
    row.insertCell().textContent = transaction.refId;
    const formattedPrice = transaction.price.toLocaleString("fa-IR");
    row.insertCell().textContent = formattedPrice;
    const typeCell = row.insertCell();
    typeCell.className =
      transaction.type === "افزایش اعتبار"
        ? "transaction-type-deposit"
        : "transaction-type-withdrawal";
    typeCell.textContent = transaction.type;
    const formattedId = transaction.id.toLocaleString("fa-IR");
    row.insertCell().textContent = formattedId;
  });

  transactionsContainer.innerHTML = "";
  transactionsContainer.appendChild(transactionListText);
  transactionsContainer.appendChild(table);
}

// Attach event listener to the load button
document
  .getElementById("loadTransactionsButton")
  .addEventListener("click", loadTransactions);

// Attach event listener to the search input
document
  .getElementById("searchInput")
  .addEventListener("input", searchTransactions);

function searchTransactions() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredTransactions = allTransactions.filter((transaction) => {
    const transactionInfo = ` ${transaction.refId}`.toLowerCase();
    return transactionInfo.includes(searchTerm);
  });
  displayTransactions(filteredTransactions);
}