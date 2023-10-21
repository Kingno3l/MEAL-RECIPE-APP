import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import arrowLeft from '../asset/arrowLeft.svg';
import { getMealsDetails } from '../redux/Details/DetailSlice';
import '../modules/MealDetail.css';

const MealsDetails = () => {
  const { loading, error, mealsDetail } = useSelector((state) => state.mealsDetail);
  const dispatch = useDispatch();
  const mealInfo = {
    id: mealsDetail?.id,
    image: mealsDetail?.images,
    title: mealsDetail?.title,
    nutrients: mealsDetail?.nutrient,
  };

  useEffect(() => {
    if (mealsDetail?.error) {
      dispatch(getMealsDetails(mealsDetail?.id));
    }
  }, [dispatch, mealsDetail?.id, mealsDetail?.error]);
  return (
    <div>
      <Link to="/">
        <button type="button" className="arrow-left-btn">
          <img src={arrowLeft} alt="arrow left" />
        </button>
      </Link>
      <div>
        {loading && <p style={{ color: 'white' }}>Loading!</p>}
        {error && <p style={{ color: 'white' }}>Error...</p>}
        {!loading && !error && mealsDetail
            && (
            <div key={mealInfo?.id} id={mealInfo?.id} className="meals-detail-container">
              <div className="meal-detail-content">
                {mealInfo.image === undefined ? (<p style={{ color: 'white', fontSize: '20px' }}>No image</p>)
                  : (<img src={mealInfo.image} alt="meals" style={{ width: '200px', marginLeft: '30px' }} />)}
                <p style={{
                  color: 'white', fontFamily: 'Roboto', fontSize: '15px', textAlign: 'center',
                }}
                >
                  {mealInfo.title}
                </p>
              </div>
              <div className="table-section">
                <div className="table-section-content">
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Unit</th>
                      <th>DailyNeeds</th>
                    </tr>
                    {mealsDetail.nutrient ? (
                      mealsDetail.nutrient.map((nutrient) => (
                        <tr key={nutrient.id}>
                          <td>{nutrient.name}</td>
                          <td>{nutrient.amount}</td>
                          <td>{nutrient.unit}</td>
                          <td>{nutrient.percentOfDailyNeeds}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ color: 'white' }}>
                          No nutrients available
                        </td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>

            </div>
            )}
      </div>
    </div>

  );
};

export default MealsDetails;
