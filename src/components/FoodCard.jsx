import React from "react";
import { Link } from "react-router-dom";

class FoodCard extends React.Component {
  state = {
    favFood: false,
  }
  componentDidMount() {
    const { food } = this.props;
    this.verifyFav();
  }

  verifyFav = () => {
    const { food: { idMeal } } = this.props
    if (localStorage.getItem('comidas')) {
      const comidasFavs = JSON.parse(localStorage.getItem('comidas'));
      if (comidasFavs.some((comida) => comida.idMeal === idMeal)) {
        console.log('comida favorita');
        this.setState({
          favFood: true,
        })
      }
    }
  }

  fav = ({ target: { checked } }) => {
    const { food } = this.props;
    if (!checked) {
      console.log('remover');
      const comidasFavs = JSON.parse(localStorage.getItem('comidas'));
      const filtradas = comidasFavs.filter((comida) => comida.idMeal !== food.idMeal)
      localStorage.setItem('comidas', JSON.stringify(filtradas));
      this.setState({
        favFood: false,
      })
    } else {
      console.log('adicionar');
      if (localStorage.getItem('comidas')) {
        const comidasFavs = JSON.parse(localStorage.getItem('comidas'));
        comidasFavs.push(food);
        localStorage.setItem('comidas', JSON.stringify(comidasFavs))
      } else {
        const array = [food];
        localStorage.setItem('comidas', JSON.stringify(array))
      }
      this.setState({
        favFood: true,
      })
    }
  }

  render() {
    const { food } = this.props;
    const { favFood } = this.state;
    return(
      <div>
        <Link to={ `/food/${ food.idMeal }` }>
          <h1>{ food.strMeal }</h1>
          <img src={ food.strMealThumb } alt="food card" />
        </Link>
        Fav: 
        <input type="checkbox" checked={ favFood } onClick={ this.fav } />
      </div>
    )
  }
}

export default FoodCard;