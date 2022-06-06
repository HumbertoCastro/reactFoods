import React from "react";

const byId = (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

class Food extends React.Component {
  state = {
    food: {},
    loading: true,
  }
  
  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const { match: { params: { foodId } } } = this.props;
    console.log(foodId);
    fetch(byId(foodId)).then(x => x.json()).then((resposta) => {
      console.log(resposta.meals);
      this.setState({
        food: resposta.meals,
        loading: false,
      })
    })
  }

  renderIngredients = () => {
    const { food } = this.state;
    const comida = food[0];
    const ingredients = Object.entries(comida).filter(x => x[0].includes('strIngredient'))
    .filter((y) => y[1]).map((z) => z[1]);
    console.log(ingredients);
    return (
      <ol>
        {
          ingredients.map((x) => <li>{ x }</li>)
        }
      </ol>
    )
  }

  render() {
    const { food, loading } = this.state;
    console.log(food);
    return(
      <div>
        {
          loading ? null : <div>
            <h1>{ food[0].strMeal }</h1>
            <img src={ food[0].strMealThumb  } />
            {
              this.renderIngredients()
            }
          </div>
        }
      </div>
    )
  }
}

export default Food;