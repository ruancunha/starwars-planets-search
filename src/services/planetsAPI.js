const fetchPlanets = () => fetch('https://swapi-trybe.herokuapp.com/api/planets/')
  .then((response) => response.json())
  .then((data) => data.token);

export default fetchPlanets;
