import { useDispatch, useSelector } from 'react-redux';
import mealLogo from '../asset/meal logo.png';
import { searchDataFromServer } from '../redux/Meals/MealSlice';
import '../modules/Header.css';

const Header = () => {
  const { error } = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  const handleSearchMeals = (e) => {
    const searchValue = e.target.elements.searchInput.value;
    e.preventDefault();
    dispatch(searchDataFromServer(searchValue));
    e.target.elements.searchInput.value = '';
  };
  return (
    <header>
      <div className="header-left">
        <img src={mealLogo} alt="meal logo" style={{ width: '40px' }} />
        <h1>Ayk foods</h1>
      </div>
      <form onSubmit={handleSearchMeals} id="form-input">
        <input
          type="text"
          placeholder="search meal recipe by name"
          id="user-input"
          name="searchInput"
        />
      </form>
      {error && <p style={{ color: 'white' }}>Meal Recipe Not Found</p>}
    </header>
  );
};

export default Header;
