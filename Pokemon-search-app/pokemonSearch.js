// get every element
const inputSearchElem = document.getElementById('search-input');
const buttonSerach = document.getElementById('search-button');
const nameElem = document.getElementById('pokemon-name');
const idElem = document.getElementById('pokemon-id');
const weightElem = document.getElementById('weight');
const heightElem = document.getElementById('height');
const spritesElem = document.getElementById('sprite');
const typesElem = document.getElementById('types');
const HPElem = document.getElementById('hp');
const attackElem = document.getElementById('attack');
const defenseElem = document.getElementById('defense');
const spAttackElem = document.getElementById('special-attack');
const spDefenseElem = document.getElementById('special-defense');
const speedElem = document.getElementById('speed');

// click search button to do the main logic
buttonSerach.addEventListener('click', async () => {
  const inputVal = inputSearchElem.value.toLowerCase();

  if (!inputVal) {
    alert("Pokémon not found");    
    return;
  }

  const pokemonAPI = await fetchPokemonAPI(inputVal);

  if (!pokemonAPI) {
    alert( "Pokémon not found");
    return;
  }

  const pokName = pokemonAPI.name;
  const pokId = pokemonAPI.id;
  const pokWeight = pokemonAPI.weight;
  const pokHeight = pokemonAPI.height;
  const pokSprites = pokemonAPI.sprites.front_default;
  const pokTypesArr = pokemonAPI.types;
  const pokStats = pokemonAPI.stats;

  // initialize to empty
  nameElem.textContent = '';
  idElem.textContent = '';
  weightElem.textContent = '';
  heightElem.textContent = '';
  
  // render the pokemonAPI
  nameElem.textContent = pokName.toUpperCase();
  idElem.textContent = `#${pokId}`;
  weightElem.textContent = `Weight: ${pokWeight}`;
  heightElem.textContent = `Height: ${pokHeight}`;

  // remder pokemon sprites
  pokemonSpritesRender(pokSprites);

  // render pokemon types
  pokemonTypesRender(pokTypesArr);

  // render pokemon stats
  pokemonStatsRender(pokStats);
});

// fetch pokeAPI
const fetchPokemonAPI = async (inputVal) => {
  try {
    const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputVal}`);
    const response = await fetchPokemon.json();
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// function for rendering pokemon sprites
const pokemonSpritesRender = (sprite) => {
  if (!sprite) {
    spritesElem.src = '';
    spritesElem.style.display = 'none';
  } else {
    spritesElem.src = sprite;
    spritesElem.style.display = 'block';
  }
}

// function for pokemon type and render it
const pokemonTypesRender = (types) => {
  typesElem.innerHTML = '';

  types.forEach(type => {
    typesElem.innerHTML += `<div class="types-pokemon-div" style="background-color: var(--${type.type.name})">${type.type.name}</div>`;
  })
};

// render pokemon stats 
const pokemonStatsRender = (stats) => {
  const statHp = stats.find(stat => stat.stat.name === 'hp');
  const statAttack = stats.find(stat => stat.stat.name === 'attack');
  const statDefense = stats.find(stat => stat.stat.name === 'defense');
  const statSpAttack = stats.find(stat => stat.stat.name === 'special-attack');
  const statSpDefense = stats.find(stat => stat.stat.name === 'special-defense');
  const statSpeed = stats.find(stat => stat.stat.name === 'speed');

  HPElem.textContent = statHp.base_stat;
  attackElem.textContent = statAttack.base_stat;
  defenseElem.textContent = statDefense.base_stat;
  spAttackElem.textContent = statSpAttack.base_stat;
  spDefenseElem.textContent = statSpDefense.base_stat;
  speedElem.textContent = statSpeed.base_stat;
};