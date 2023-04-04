import {useRouter} from "next/router"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Pokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!router.isReady) return;
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setisLoading(false);
                setPokemon(json);
            })
    }, [router.isReady]);

    return (
        <div className="container">
        {isLoading ? (
            <div class="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> 
        ) : null}
         
        {pokemon ? (
            <div className="card text-bg-dark">
                <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                className="card-img-top"
                alt="..."
                style={{height: "200px", width: "200px"}}
                />
                <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                    <p className="card-text">Pokemon number: {pokemon.id}</p>
                    <p className="card-text">Weight: {pokemon.weight} </p>
                    <Link href="/" legacyBehavior>
                        <a className="btn btn-primary">
                            back
                        </a>
                    </Link>
                </div>
            </div>
        ) : null}

            
        </div>
    
    )
}