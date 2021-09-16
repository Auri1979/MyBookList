class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
const defaultBooks = [
	{
		title: 'Book 1',
		author: 'Brad Traversy',
		isbn: '12345'
	},
	{
		title: 'Book 2',
		author: 'Mehul Mohan',
		isbn: '6789'
	}
]
class Store{
    static getsBooks(){
        let books;
        if (localStorage.getItem('books')===null){
            books=[];
           //console.log("vacio");
        }
        else{
            books = JSON.parse(localStorage.getItem('books')); 
            console.log(books);
        }
        return books;
    }
    static addBook(book){
        const books = Store.getsBooks();
        books.push(book);
        console.log("libroañadido");
        localStorage.setItem('books',JSON.stringify([Store.getsBooks(), book]));//actualiza el store

    }
   /*  static removeBook(isbn){
        const books = Store.getsBooks();
        books.splice(book);

        localStorage.setItem('books',JSON.stringify([Store.getsBooks(), book]));//actualiza el store
    } */
    
}
class UI{
    static displayBooks(){
        const books = Store.getsBooks();
        defaultBooks.forEach(book => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.getElementById('book-list'); // get the #book-list DOM node here
        
        const row = document.createElement('tr');// create a TR row element here (document.createElement)
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            `;
            list.appendChild(row);
    }   
    static clearFieldsUI(){
        document.querySelector("#title").value ="";
        document.querySelector("#author").value ="";
        document.querySelector("#isbn").value ="";
    }
    static deleteBook(target){
        if(target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    } 
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    
    } 
}
UI.displayBooks();

document.querySelector('#book-form').addEventListener('submit', addABook, false);

function addABook(e) {
	// prevent actual submission
	e.preventDefault();

	// Capturar los valores del Form
        const title = document.querySelector("#title").value;
        const author= document.querySelector("#author").value;
        const isbn = document.querySelector("#isbn").value;

	// Crear un nuevo objeto book
    const book = new Book(title, author, isbn);
        if(title === "" || author === "" || isbn === "") {
            //console.log("hola");
            UI.showAlert('Por favor, rellene los campos', 'danger');
        } else {
        // Añadir el objeto book creado a UI (mostrarlo en HTML)
            UI.addBookToList(book);
            //console.log("dentro de añadir libro");
            Store.addBook(book);

            UI.showAlert('Libro añadido', 'success');
            
            UI.clearFieldsUI();          
        }
}
document.getElementById('book-list').addEventListener('click', handleRemove);

function handleRemove(e) {
  UI.deleteBook(e.target);
  UI.showAlert('Libro borrado', 'success');
}