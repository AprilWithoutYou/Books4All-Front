import React, { useEffect } from "react";
import "./CartDetail.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../NavBar/Navbar";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  addOneCopy,
  deleteOneBook,
  deleteOneCopy,
  getBookDetail,
} from "../../Redux/actions";
import Footer from "../Footer/Footer";
import { PayButton } from "../PayButton/PayButton";
import { setCart } from "../../Redux/actions/localStorage";
import { BsTrash } from "react-icons/bs";
// import { removeBookFromCart } from "../actions/cartActions";
import { toast } from "react-toastify";

export default function CartDetail(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  setCart("cart", cart);
  const bookTitle = useSelector((state) => state.bookDetail);
  console.log(bookTitle);

  let totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.subtotal),
    0
  );
  totalAmount = totalAmount.toFixed(2);

  let totalCopy = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.quantity),
    0
  );

  const addCopy = (id) => {
    dispatch(addOneCopy(id));
  };

  const deleteCopy = (id) => {
    dispatch(deleteOneCopy(id));
  };
  const deleteThisBook = (id) => {
    dispatch(deleteOneBook(id));
    dispatch(getBookDetail(id));

    toast(`You removed ${bookTitle.map((b) => b.title)} from the cart !`, {
      position: "bottom-right",
      style: {
        background: "linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)",
        color: "white",
      },
      progressBar: {
        backgroundColor: "red",
      },
      autoClose: 2500,
      closeOnClick: true,
    });
  };

  return (
    <div className="container-xl ">
      <div className="cart-container">
        {cart.length === 0 ? (
          <p>There are no books in your shopping cart</p>
        ) : (
          <div className="allContainer">
            <div className="books-container">
              <div className="cardHeader">
                <h1 className="titleCarrito">Your cart</h1>
                <p>
                  TOTAL ({totalCopy} books) <span>${totalAmount}</span>
                </p>
                <p>
                  The items in your cart are not reserved. Finish the purchase
                  process now to get hold of them.
                </p>
              </div>

              {cart.map((book) => (
                <div className="book-card" key={book.bookId}>
                  <div className="img-cont">
                    <img src={book.image} alt="Not Found" />
                  </div>
                  <div className="infoPrincipal">
                    <div className="book-info">
                      <div className="data">
                        <h2>{book.title}</h2>
                        <div className="data2">
                          <h3>{book.author}</h3>
                          <h3 className="cat">{book.categories}</h3>
                        </div>
                      </div>
                      <div className="quantity">
                        {book.quantity > 1 ? (
                          <AiOutlineMinus
                            onClick={() => {
                              deleteCopy(book.bookId);
                            }}
                            className="down"
                          />
                        ) : (
                          <AiOutlineMinus className="inactiveDown" />
                        )}
                        <span class="mx-3">{book.quantity}</span>
                        <AiOutlinePlus
                          onClick={() => {
                            addCopy(book.bookId);
                          }}
                          className="up"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="d-flex">
                        <p className="book-price">${book.subtotal}</p>
                      </div>

                      <div className="deleteButton">
                        <BsTrash
                          onClick={() => {
                            deleteThisBook(book.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div class="d-flex flex-column" className="cart-summary">
              <PayButton cart={cart}>Checkout</PayButton>
              <div className="orderSummary">
                <p>Order summary</p>
                <div className="priceSummary">
                  <span>{totalCopy} products</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="delivery">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div class="border" className="total">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="cart-summary">
        <h2>Cart Detail</h2>
        <p>Titles Total Amount: {cart.length}</p>
        <p>Books Total Amount: {totalCopy}</p>
        <p>Total Due: ${totalAmount} USD</p>
        <PayButton cart={cart}>Checkout</PayButton>
      </div>
      <Footer />
    </div>
  );
}
