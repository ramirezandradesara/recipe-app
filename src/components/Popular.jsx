import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular()
    }, []) // only execute when is mounted

    // async is a keyword that tells the browser that this function is going to take a while to run. We have the data first before we render anything.
    const getPopular = async () => {

        const check = localStorage.getItem('popular');
        if (check) {
            setPopular(JSON.parse(check))
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
            );
            const data = await api.json();
            console.log(data);
            setPopular(data.recipes);

            localStorage.setItem('popular', JSON.stringify(data.recipes));
        }

    }

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>

                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '5rem'
                }}>
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position : relative;


    img{
        border-radius: 2rem;
        position:absolute;
        width: 100%;
        left: 0;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 400;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`; 

const Gradient = styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
background: linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.75));
`;

export default Popular