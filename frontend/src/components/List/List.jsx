import { Card } from "../Card/Card";
import {newsData} from "../../lib/dataFeed";
import "./List.scss"

export const List = () => {
  return (
    <div className="list">
        {newsData.map((item) => (
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}
