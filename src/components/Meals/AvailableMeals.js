import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

//run only one time
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  //fetch the meals
  useEffect(() => {
    const fetchMeals = async () => {
      const request = await fetch(
        "https://react-movies-55a43-default-rtdb.firebaseio.com/meals.json"
      );
      if (!request.ok) {
        throw new Error("Something went wrong!.");
      }
      const data = await request.json();
      setMeals(data);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
