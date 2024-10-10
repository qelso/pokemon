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
    "\nquery GetFavTypePokemons($favouriteType: String = \"dark\", $first: Int = 1, $last: Int = 151) {\n    pokemon_v2_pokemonspecies(order_by: {id: asc}, where: { pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}} ,id: {_gte: $first, _lte: $last}}, limit: 200) {\n      id\n      name\n      pokemon_v2_pokemons(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}) {\n        name\n        id\n        pokemon_v2_pokemonsprites {\n          sprites(path: \"front_default\")\n        }\n        pokemon_v2_pokemontypes {\n          pokemon_v2_type {\n            name\n          }\n        }\n      }\n    }\n  }\n  \n": types.GetFavTypePokemonsDocument,
    " query GetNonFavTypePokemons($favouriteType: String = \"grass\", $first: Int = 1, $last: Int = 151, $_eq: String = \"grass\") {\n  pokemon_v2_pokemonspecies(order_by: {id: asc}, where: {pokemon_v2_pokemons: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}, id: {_gte: $first, _lte: $last}}, limit: 200) {\n    id\n    name\n    pokemon_v2_pokemons(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}) {\n      name\n      id\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n}\n\n": types.GetNonFavTypePokemonsDocument,
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
export function gql(source: "\nquery GetFavTypePokemons($favouriteType: String = \"dark\", $first: Int = 1, $last: Int = 151) {\n    pokemon_v2_pokemonspecies(order_by: {id: asc}, where: { pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}} ,id: {_gte: $first, _lte: $last}}, limit: 200) {\n      id\n      name\n      pokemon_v2_pokemons(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}) {\n        name\n        id\n        pokemon_v2_pokemonsprites {\n          sprites(path: \"front_default\")\n        }\n        pokemon_v2_pokemontypes {\n          pokemon_v2_type {\n            name\n          }\n        }\n      }\n    }\n  }\n  \n"): (typeof documents)["\nquery GetFavTypePokemons($favouriteType: String = \"dark\", $first: Int = 1, $last: Int = 151) {\n    pokemon_v2_pokemonspecies(order_by: {id: asc}, where: { pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}} ,id: {_gte: $first, _lte: $last}}, limit: 200) {\n      id\n      name\n      pokemon_v2_pokemons(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}) {\n        name\n        id\n        pokemon_v2_pokemonsprites {\n          sprites(path: \"front_default\")\n        }\n        pokemon_v2_pokemontypes {\n          pokemon_v2_type {\n            name\n          }\n        }\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: " query GetNonFavTypePokemons($favouriteType: String = \"grass\", $first: Int = 1, $last: Int = 151, $_eq: String = \"grass\") {\n  pokemon_v2_pokemonspecies(order_by: {id: asc}, where: {pokemon_v2_pokemons: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}, id: {_gte: $first, _lte: $last}}, limit: 200) {\n    id\n    name\n    pokemon_v2_pokemons(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}) {\n      name\n      id\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n}\n\n"): (typeof documents)[" query GetNonFavTypePokemons($favouriteType: String = \"grass\", $first: Int = 1, $last: Int = 151, $_eq: String = \"grass\") {\n  pokemon_v2_pokemonspecies(order_by: {id: asc}, where: {pokemon_v2_pokemons: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}, id: {_gte: $first, _lte: $last}}, limit: 200) {\n    id\n    name\n    pokemon_v2_pokemons(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}) {\n      name\n      id\n      pokemon_v2_pokemonsprites {\n        sprites(path: \"front_default\")\n      }\n      pokemon_v2_pokemontypes {\n        pokemon_v2_type {\n          name\n        }\n      }\n    }\n  }\n}\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery PokemonTypes {\n    pokemon_v2_type {\n      name\n    }\n  }"): (typeof documents)["\nquery PokemonTypes {\n    pokemon_v2_type {\n      name\n    }\n  }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;