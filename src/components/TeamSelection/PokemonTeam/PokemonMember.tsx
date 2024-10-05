import { visitWithTypeInfo } from "graphql"

type PokemonMemberProps = {
    name: string
}
export default function PokemonMember({name}:PokemonMemberProps) {
    return <div style={{background: name ? "white":"light-gray", border:"1px solid gray", height:"20px"}}>
        {name}
    </div>
}