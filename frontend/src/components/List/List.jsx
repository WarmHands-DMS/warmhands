import { Card } from '../Card/Card';
import './List.scss';

export const List = ({ data }) => {
  return (
    <div className="list">
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};
