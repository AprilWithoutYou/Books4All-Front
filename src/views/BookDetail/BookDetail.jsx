import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetail, addToCart, getUserFromDb } from '../../Redux/actions'
import { useEffect, useState } from 'react';
import { ReviewFormPage } from '../../components/ReviewForm/ReviewFormPage';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import style from '../BookDetail/BookDetail.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { setCart } from '../../Redux/actions/localStorage';
import { PostUser } from '../../components/PostUser/PostUser';
import { toast } from 'react-toastify';
import swal from 'sweetalert';



const BookDetail = (props) => {

    const dispatch = useDispatch();
    const { bookId } = useParams();
    const { loginWithPopup, isAuthenticated, user } = useAuth0();

    PostUser(user, isAuthenticated)

    const eachBook = useSelector((state) => state.bookDetail)
    const role = useSelector((state) => state.role)

    const bookName = eachBook?.map((book) => book.title)
    const cart = useSelector((state) => state.cart)
    setCart('cart', cart)
    const stock = eachBook?.map(book => book.stock)

    const [show, setShow] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showBook, setShowBook] = useState(false);
    const[loader, setLoader]= useState(false)
    let [counter, setCounter] = useState(0)

    const navigate = useNavigate()
    const theme= useSelector(state=>state.theme)
    const dbUser = useSelector(state => state.dbUser);

    let bookIds = [];

    dbUser.Boughts?.forEach(function (bought) {
        bought.books.forEach(function (book) {
            bookIds.push(book.bookId);
        });
    });



    const clickHandler = () => {
        setShow(!show)
    }
    const handleShowReview = () => {
        if (!isAuthenticated) {
            swal("please sign up for leave a review!", {
                buttons: false,
                timer: 1400,
              }); 
            loginWithPopup()
        } else {
            let isBought = bookIds?.find(Id => Id === bookId)
            if (isBought) {
                setShowReview(!showReview)
            } else {
                toast.error('If you want to leave a review you must buy this book')
            }
        }
    }

    const handleClick = () => {
        navigate(-1);
    }

    let bookInCart = {}

    const handleClickAddCart = (event) => {
        function generarIdUnico() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        const bookInCart = {
            id: generarIdUnico(),
            bookId: bookId,
            quantity: 1,
        }
        dispatch(addToCart(bookInCart))
        toast(`You have added ${bookName} to the cart !`, { //toastify desde la vista del detalle del libro
            position: "bottom-right",
            style: {
                background:'linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)',
              color: "white",
            },
            progressBar: {
              backgroundColor: "red",
            },
            autoClose: 1000,
            closeOnClick: true,
          });


    }

    const handleRest = () => {
        setCounter(--counter)
    }


    useEffect(() => {
        setLoader(true)      
        setTimeout(() => {
           setLoader(false);
         }, 300);
        if (bookId) {
            dispatch(getBookDetail(bookId));
        }
        dispatch(getUserFromDb(user?.nickname))
},  [showReview, user]);




    return (
        <div className={style.mainContainer}>
            <div>


                {eachBook?.map((el) => {

                    return (
                        <div>
                            <div>
                                <img className={style.backButton} src="https://res.cloudinary.com/dvldakcin/image/upload/v1681620387/Countries/back_lblp4n.png" onClick={handleClick} />
                                <div className={style.allContentContainer}>
                                    <div className={style.imgContainer}>
                                        
                                        <img className={style.bookImg} alt='Not found' src={el.image} width='350px' height='200px'></img>
                                    </div>
                                    <div className={style.contentContainer}>
                                        <h1 className={style.title}>{el?.title}</h1>
                                        <h2 className={style.subtitle}>Authors: {el?.authors}</h2>
                                        <h3 className={style.subtitleCategory}>{el?.categories}</h3>
                                        <div className='d-flex justify-content-start'>
                                            <div className={style.container_price}>
                                                <h3 className={style.price}>${el?.price}</h3>
                                            </div>
                                            {counter > 0 && <button className="btn btn-secondary " onClick={handleRest}>-</button>}

                                            {counter > 0 && <input disabled className='input_add bg-light ms-1 border border-0' style={{ width: '4%' }} value={counter} type='text' placeholder={0} ></input>}
                                            {counter < stock && <button className="btn btn-secondary" onClick={handleClickAddCart}>+</button>
                                            }


                                            {!stock ? <p>"Lo sentimos no tenemos stock de este libro"</p> :
                                                <button type="button" className="btn btn-dark mt-1 ms-3" onClick={handleClickAddCart}>Add to cart</button>

                                            }

                                        </div>
                                            <div>
                                            {
                                                role?.name === 'admin' && <Link to={`/admin/modify/${el.id}`}><button class='btn btn-primary'>Edit</button></Link>
                                            }
                                            </div>

                                    </div>
                                </div>
                                <hr />
                                <div className={style.buttonContainer}>
                                    <img src='https://res.cloudinary.com/dvldakcin/image/upload/v1681705343/Countries/down-arrow_rlhmtn.png' className={style.description} onClick={clickHandler} />
                                </div>
                                {show && <p className={style.descriptionContent}>{el.description}</p>}
                                <hr />
                                    <div className={style.subtitleReview}>{el?.Reviews?.length !== 0 ? el?.Reviews?.map(el => {
                                        return (
                                           el.active && <ReviewCard role={role} body={el.body} id={el.id} user_name={el.user_name} rating={el.rating} picture={dbUser.picture} />
                                        )
                                    }) : ""}</div>
                            </div>
                        </div>
                    )
                })}

                <div className={style.buttonContainer}>
                    <button onClick={handleShowReview} className={style.reviewButton}>Leave a review</button>
                </div>
                {showReview && <ReviewFormPage reviews={eachBook[0].Reviews} id={bookId} setShowReview={setShowReview} showReview={showReview} />}

            </div>
        </div>

    );
}
export { BookDetail };