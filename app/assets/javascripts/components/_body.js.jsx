class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewFruit = this.addNewFruit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteFruit = this.deleteFruit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this);
  }

  handleFormSubmit(name, description){
    let body = JSON.stringify({fruit: {name: name, description: description} })

    let config = {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                   body: body
                 }

    fetch('/api/v1/fruits', config)
    .then((response) => {return response.json()})
    .then((fruit)=>{
      this.addNewFruit(fruit)
    })
  }

  addNewFruit(fruit){
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    })
  }

  handleDelete(id){
    let config = {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                 }
    fetch(`/api/v1/fruits/${id}`, config)
    .then((response) => { 
      console.log('Item was deleted!')
      this.deleteFruit(id)
    })
  }

  deleteFruit(id){
    let newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
    this.setState({fruits: newFruits})
  }

  handleUpdate(fruit){
    let config = {
                    method: 'PUT',
                    body: JSON.stringify({fruit: fruit}),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                 }
    fetch(`/api/v1/fruits/${fruit.id}`, config)
    .then((response) => { 
      this.updateFruit(fruit)
    })
  }

  updateFruit(fruit){
    let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
    newFruits.push(fruit)
    this.setState({
      fruits: newFruits
    })
  }

  componentDidMount(){
    fetch('/api/v1/fruits.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ fruits: data }) });
  }

  render(){
    return(
      <div>
        <NewFruit handleFormSubmit={this.handleFormSubmit} />
        <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
      </div>
    )
  }
}