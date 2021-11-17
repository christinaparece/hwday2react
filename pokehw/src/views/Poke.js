import React, { Component } from 'react'
import * as Yup from 'yup';
import {Formik, Field, Form} from 'formik';
import Table from 'react-bootstrap/Table';

const formSchema = Yup.object().shape({
    "pokemon": Yup.string().required("pokemon is required")
})

const initialValues={
    pokemon: ''
}

export default class Poke extends Component {

    constructor(){
        super();
        this.state={
            pokemon:'',
            badName: false

        }
    }
  
    handleSubmit=({pokemon})=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                pokemon: {
                    'name':data['name'],
                    'ability_name': data['ability_name'],
                    'base_experience': data['base_experience'],
                    'sprite_front_shiny': data['sprite_front_shiny']
                },
                badName: false
             }, ()=>console.log(this.state.pokemon)) 
        })
        .catch(error=>{console.error(error); this.setState({badName:true})})
        }
    
    render() {
        return (
            <div>
                  <h1>POKEMON</h1>
                <Formik initialValues={initialValues}
                            validationSchema={formSchema}
                            onSubmit={
                                (values, {resetForm})=>{
                                    this.handleSubmit(values);
                                    resetForm(initialValues);
                                }
                            }
                            >
                            {
                                 ({errors, touched})=>(
                                     <Form>
                                        <label htmlFor="Pokemon" className="form-label">Pokemon</label>
                                        <Field name="Pokemon" className="form-control" />
                                        {errors.pokemon && touched.pokemon ? (<div style={{color:'red'}}>{errors.pokemon}</div>):null}
    
                                
                                        <button type="submit" className="btn btn-primary">Search</button>
    
                                    </Form>
                                 )
                                }
                    </Formik> 

                    {this.state.pokemon}
                    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Ability Name</th>
      <th>Base Experience</th>
      <th>Sprite</th>
    
    </tr>
  </thead>
  <tbody>
      {this.state.pokemon.map(
          pokemon => (
            <tr key= {pokemon.name}>
                <td>{pokemon.name}</td>
                <td>{pokemon.ability_name}</td>
                <td>{pokemon.base_experience}</td>
                <td>{pokemon.sprite}</td>
          </tr>
          ) 
      )
      }
    
  </tbody>
</Table>      
                </div>
            )
                        }
                    }