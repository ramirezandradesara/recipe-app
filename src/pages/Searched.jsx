import React from 'react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'

function Searched() {

        const [searchedRecipes, setSearchedRecipes] = useState([]);
        let params = useParams();

        const getSearched = async (name) => {
            const data = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=9`
            )
    
            const recipes = await data.json()
            console.log(recipes)
            setSearchedRecipes(recipes.results)
        }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]) // from routes in pages

    return (
        <Grid>
            {searchedRecipes.map(item => {
                return (
                    <Cards key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <h4>{item.title}</h4>
                    </Cards>
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;

const Cards = styled.div`	
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
        text-align: center;
        padding: 1rem;
    }
`;

export default Searched;