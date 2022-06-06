import React from "react";
import FoodCard from "../components/FoodCard";
import Header from "../components/Header";

const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';
const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php';
const categories = 'https://www.themealdb.com/api/json/v1/1/categories.php';
const filterByName= (name) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
const filterByCategory = (category) => `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`

class PaginaInicial extends React.Component {
  state = {
    food: [],
    loading: false,
  }
  
  componentDidMount() {
    this.FetchFoodapi();
  }

  FetchFoodapi = () => {
    fetch(allMeals).then(x => x.json()).then((resposta) => {
      console.log(resposta);
      this.setState({
        food: resposta.meals,
        loading: true,
      })
    })
  }

  ChangeState = (stateNew, category) => {
    console.log(stateNew, category);
    if (category) {
      fetch(filterByCategory(stateNew)).then(x => x.json()).then(resposta => {
        console.log(resposta);
        this.setState({
          food: resposta.meals,
        })
      })
    } else {
      fetch(filterByName(stateNew)).then(x => x.json()).then(resposta => {
        console.log(resposta);
        this.setState({
          food: resposta.meals,
        })
      })
    }
  }

  render() {
    const { loading, food } = this.state;
    return(
      <div>
          <Header onClick={ this.ChangeState } />
          {
            loading ? (<div>
              {
                food.map(comida => <FoodCard food={ comida } />)
              }
            </div> ) : <p>loading falso</p>  
          }
      </div>
    )
  }
}

export default PaginaInicial;