import { ProfileIncidentCard } from '../Card/ProfileIncidentCard';
import './List.scss';

export const ProfileIncidentList = ({ data, onDelete }) => {
  return (
    <div className="list">
      {data.map((item) => (
        <ProfileIncidentCard key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};
