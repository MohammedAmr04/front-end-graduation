import { useSelector, useDispatch } from "react-redux";
import { clearWishlist } from "../../store/wishlist/wishlistSlice";
import BookCard from "../../components/common/card/BookCard";
import "./Wishlist.css";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container my-5 pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Wishlist</h2>
        {wishlistItems.length > 0 && (
          <button 
            className="btn btn-outline-danger"
            onClick={() => dispatch(clearWishlist())}
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center my-5">
          <h4>Your wishlist is empty</h4>
          <p>Add books to your wishlist by clicking the heart icon on any book card</p>
        </div>
      ) : (
        <div className="flex-wrap gap-4 mx-auto d-flex">
          {wishlistItems.map((book) => (
            <div
              key={book.id}
              className="mx-auto mb-4"
              style={{ width: "260px" }}
            >
              <BookCard item={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}