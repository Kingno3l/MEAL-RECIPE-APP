import { useSelector } from 'react-redux';
import MealsItem from './MealsItem';
import '../modules/Meals.css';

const Meals = () => {
  const { mealsData, loading, error } = useSelector((state) => state.meals);
  return (
    <section className="meals-container">
      {loading && (
        <div className="msg-container">
          <p className="loading">Loading...</p>
          <p className="please-wait">please wait</p>
        </div>
      )}
      {error && (
      <div className="msg-container">
        <p>Error!</p>
        <p style={{ color: 'white' }}>Try again later</p>
      </div>
      )}
      {!loading && !error
        && mealsData.map((meal) => (
          <MealsItem
            key={meal?.id}
            id={meal?.id}
            image={meal?.image}
            title={meal?.title}
            amount={meal?.amount}
            unit={meal?.unit}
          />
        ))}
    </section>
  );
};

export default Meals;
