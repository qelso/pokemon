/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetPokemonDetails($pokemon: String = \"pikachu\") {\n  pokemon_v2_pokemon(where: {name: {_ilike: $pokemon}}) {\n    name\n    pokemon_v2_pokemontypes {\n      pokemon_v2_type {\n        name\n      }\n    }\n    id\n    height\n    weight\n    base_experience\n    pokemon_v2_pokemonstats {\n      base_stat\n      pokemon_v2_stat {\n        name\n      }\n    }\n    pokemon_v2_pokemonmoves(limit: 4) {\n      pokemon_v2_move {\n        name\n      }\n    }\n    pokemon_v2_pokemonsprites {\n      sprites\n    }\n    pokemon_v2_pokemonabilities {\n      pokemon_v2_ability {\n        name\n      }\n    }\n    pokemon_v2_pokemonforms {\n      name\n    }\n  }\n}\n  ": types.GetPokemonDetailsDocument,
    "\nquery GetFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {\n    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n  \n": types.GetFavTypePokemonsDocument,
    " query getNonFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {\n    pokemon_v2_pokemon(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n": types.GetNonFavTypePokemonsDocument,
    "\nquery PokemonTypes {\n    pokemon_v2_type {\n      name\n    }\n  }": types.PokemonTypesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetPokemonDetails($pokemon: String = \"pikachu\") {\n  pokemon_v2_pokemon(where: {name: {_ilike: $pokemon}}) {\n    name\n    pokemon_v2_pokemontypes {\n      pokemon_v2_type {\n        name\n      }\n    }\n    id\n    height\n    weight\n    base_experience\n    pokemon_v2_pokemonstats {\n      base_stat\n      pokemon_v2_stat {\n        name\n      }\n    }\n    pokemon_v2_pokemonmoves(limit: 4) {\n      pokemon_v2_move {\n        name\n      }\n    }\n    pokemon_v2_pokemonsprites {\n      sprites\n    }\n    pokemon_v2_pokemonabilities {\n      pokemon_v2_ability {\n        name\n      }\n    }\n    pokemon_v2_pokemonforms {\n      name\n    }\n  }\n}\n  "): (typeof documents)["query GetPokemonDetails($pokemon: String = \"pikachu\") {\n  pokemon_v2_pokemon(where: {name: {_ilike: $pokemon}}) {\n    name\n    pokemon_v2_pokemontypes {\n      pokemon_v2_type {\n        name\n      }\n    }\n    id\n    height\n    weight\n    base_experience\n    pokemon_v2_pokemonstats {\n      base_stat\n      pokemon_v2_stat {\n        name\n      }\n    }\n    pokemon_v2_pokemonmoves(limit: 4) {\n      pokemon_v2_move {\n        name\n      }\n    }\n    pokemon_v2_pokemonsprites {\n      sprites\n    }\n    pokemon_v2_pokemonabilities {\n      pokemon_v2_ability {\n        name\n      }\n    }\n    pokemon_v2_pokemonforms {\n      name\n    }\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {\n    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n  \n"): (typeof documents)["\nquery GetFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {\n    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query getNonFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {\n    pokemon_v2_pokemon(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)[" query getNonFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {\n    pokemon_v2_pokemon(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {\n      name\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery PokemonTypes {\n    pokemon_v2_type {\n      name\n    }\n  }"): (typeof documents)["\nquery PokemonTypes {\n    pokemon_v2_type {\n      name\n    }\n  }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;