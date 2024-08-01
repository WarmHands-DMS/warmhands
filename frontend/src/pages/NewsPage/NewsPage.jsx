import {newsData} from "../../lib/dataFeed";
import { Filter } from "../../components/Filter/Filter";
import { Card } from "../../components/Card/Card";
import { Map } from "../../components/Map/Map";

export const NewsPage = () => {

  const data = newsData;

  return (
    <div className="newsPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} zoom={8} center={(7.847, 80.758)} />
      </div>
    </div>
  );
}
