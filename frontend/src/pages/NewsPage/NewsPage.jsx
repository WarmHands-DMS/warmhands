import {newsData} from "../../lib/dataFeed";
import { Filter } from "../../components/Filter/Filter";
import { Card } from "../../components/Card/Card";

export const NewsPage = () => {

  const data = newsData;

  return (
    <div className="newsPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map(item => (
            <Card key={item.id} item={item}/>
          ))}
        </div>
      </div>
      <div className="mapContainer">map</div>
    </div>
  )
}
