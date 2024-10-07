document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  document.getElementById("book-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });

    document.getElementById("book-form").reset();
    fetchBooks();
  });
});

async function fetchBooks() {
  const response = await fetch("/api/books");
  const data = await response.json();
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  data.books.forEach((book) => {
    const li = document.createElement("li");
    li.innerText = `${book.title} by ${book.author}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", async () => {
      await fetch(`/api/books/${book.id}`, { method: "DELETE" });
      fetchBooks();
    });
    li.appendChild(deleteBtn);
    bookList.appendChild(li);
  });
}
