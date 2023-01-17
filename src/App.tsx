import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([])
  const [pokemonResults, setPokemonResults] = useState<any[]>([])

  const typeAhead = (query: any): Promise<string[]> => {
    //store api result in an arry
      fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((res) => {
          return res.json()
        })
        .then((res) => {
          setPokemonResults(res.results)
        })
        //lets filter the array
        //starts with may be better for 
        return new Promise((resolve, reject) => {
          resolve(
            pokemonResults.filter(p => p.name.toLowerCase().startsWith(query.toLowerCase())
            )
          ) 
        })
  }
  useEffect(() => {
    (async () => {
      if(!query) {
        return
      }
      const data = await typeAhead(query)
      setResults(data)
      console.log(results, "results")
    })()
  }, [query])
  

  return (
    <div className="App">
      <h1>Pokemon filter</h1>
      <div>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
        <div>
          {results.map(r => <div key={r.name}>{r.name}!</div>)}
        </div>
      </div>
    </div>
  )
}

export default App
