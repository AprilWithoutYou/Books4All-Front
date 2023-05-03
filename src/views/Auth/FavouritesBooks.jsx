import React, { useState } from "react";
import { useSelector } from "react-redux";
import FavouritesCards from "./FavouriteCards";
import Paginado from "../../components/Paginado/Paginado";
import { Link } from "react-router-dom";

const FavouritesBooks = () => {
    const  favourites = useSelector(state => state.dbUser.Books)

    const [currentPage, setCurrentPage] = useState(1)
    const booksForPage = 8;
    const lastBook = currentPage * booksForPage;
    const firstBook = lastBook - booksForPage;
    const currentBooks = favourites.slice(firstBook, lastBook);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(favourites.length / booksForPage); i++) {
        pageNumber.push(i)

    }
    if (currentBooks.length < 1 && currentPage > 1) setCurrentPage(currentPage - 1)

    return(
        <>
        <h3>My Favourites</h3>
        {
            currentBooks && currentBooks.map( (book, index) => {
                return(
                    <FavouritesCards 
                    key={index}
                    id={book.id}
                    image={book.image}
                    categories={book.categories}
                    name={book.title}

                    />
                )
            })
        }
        <div class="d-flex justify-content-around">
               {favourites.length?
                <Paginado
                booksPerPage={booksForPage}
                numberBooks={favourites.length}
                setPage={setCurrentPage}
                currentPage={currentPage}
                currentBooks={currentBooks}
                indexFirstBook={firstBook}
                />:<div class="d-flex flex-column">
                <h4>Not having any favorite books added yet? It's time to explore and find your next favorite reads! </h4>
                <Link style={{ textDecoration: "none" }} to={`/books`}><button className="btn btn-secondary">Books</button></Link>
                </div>
                }
            </div>
        </>
    )
}

export default FavouritesBooks;