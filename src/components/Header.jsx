import React from "react";
const categories = 'https://www.themealdb.com/api/json/v1/1/categories.php';

class Header extends React.Component {
  state = {
    categories: [],
    loading: true,
    valorDoInput: '',
  }

  componentDidMount() {
    this.fetchCategorys();
  }

  fetchCategorys = () => {
    fetch(categories).then(x => x.json()).then(Response => {
      console.log(Response);
      this.setState({
        categories: Response.categories,
        loading: false,
      });
    })
  }

  SearchFood = () => {
    const { valorDoInput } = this.state;
    const { onClick } = this.props;
    onClick(valorDoInput, false);

  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      valorDoInput: value,
    });
  }

  render() {
    const { loading, categories } = this.state;
    const { onClick } = this.props;
    return(
      <div>
        <h1>PAGINA DE COMIDAS</h1>
        {
          loading ? <p>Loading...</p> : <div>
            {
              categories.map(cat => {
                return (
                  <button
                    onClick={ () => {
                      onClick(cat.strCategory, true);
                    }}
                  >
                    {
                      cat.strCategory
                    }
                  </button>
                )
              })
            }
          </div>
        }
        <input type="text" onChange={ this.handleChange } />
        <button onClick={ this.SearchFood }>Pesquisar</button>
      </div>
    )
  }
}

export default Header;