import { use } from "react"
import CardRankingUser from "../components/cardRankingUser/CardRankingUser"
import css from "./Ranking.module.css"

interface PropRanking {
  fetchRanking: Promise<
    {
      name: string
      totalPoints: number
      totalBottles: number
      id: string
    }[]
  >
}

export default function Ranking({ fetchRanking }: PropRanking) {
  const ranking = use(fetchRanking)
  return (
    <main className={css.main}>
      <h1>Ranking</h1>
      {/* <div className={css.podium_container}>
        <Podium
          alt="user"
          avatarImg="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
          position="second"
          points={100}
          bottle={10}
          name="Camilo"
        />
        <Podium
          alt="user"
          avatarImg="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
          position="first"
          points={100}
          bottle={10}
          name="Camilo"
        />
        <Podium
          alt="user"
          avatarImg="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
          position="third"
          points={100}
          bottle={10}
          name="Camilo"
        />
      </div>
      <CardRankingUser
        position={1}
        alt="user"
        avatar="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
      /> */}
      <div className={css.ranking_container}>
        {ranking.map(({ id, name, totalBottles, totalPoints }, index) => (
          <CardRankingUser
            key={id}
            position={index + 1}
            alt="user"
            avatar="https://i.pinimg.com/736x/f3/ac/43/f3ac43129773f5335327ef926bddc2af.jpg"
            points={totalPoints}
            bottles={totalBottles}
            name={name}
          />
        ))}
      </div>
    </main>
  )
}
