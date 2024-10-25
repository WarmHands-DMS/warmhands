import './Widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Import the down arrow icon
import ReportIcon from '@mui/icons-material/Report';
import FloodIcon from '@mui/icons-material/Flood';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import CycloneIcon from '@mui/icons-material/Cyclone';
import LandslideIcon from '@mui/icons-material/Landslide';
import TsunamiIcon from '@mui/icons-material/Tsunami';
import EarthquakeIcon from '@mui/icons-material/MonitorHeart';

export const Widget = ({ type, totalCount, previousCount }) => {
  let data;

  switch (type) {
    case 'flood':
      data = {
        title: 'FLOOD',
        link: 'View all',
        icon: (
          <FloodIcon
            className="icon"
            style={{
              color: 'rgb(0, 14, 164)',
              backgroundColor: 'rgba(76, 130, 255, 0.248)',
            }}
          />
        ),
      };
      break;
    case 'fire':
      data = {
        title: 'FIRE',
        link: 'View all',
        icon: (
          <FireIcon
            className="icon"
            style={{
              color: 'rgb(248, 66, 0)',
              backgroundColor: 'rgba(255, 139, 76, 0.248)',
            }}
          />
        ),
      };
      break;
    case 'cyclone':
      data = {
        title: 'CYCLONE',
        link: 'View all',
        icon: (
          <CycloneIcon
            className="icon"
            style={{
              color: 'rgb(44, 44, 44)',
              backgroundColor: 'rgba(61, 61, 61, 0.248)',
            }}
          />
        ),
      };
      break;
    case 'landslide':
      data = {
        title: 'LANDSLIDE',
        link: 'View all',
        icon: (
          <LandslideIcon
            className="icon"
            style={{
              color: 'rgb(0, 174, 6)',
              backgroundColor: 'rgba(82, 255, 76, 0.248)',
            }}
          />
        ),
      };
      break;
    case 'tsunami':
      data = {
        title: 'TSUNAMI',
        link: 'View all',
        icon: (
          <TsunamiIcon
            className="icon"
            style={{
              color: 'rgb(0, 23, 128)',
              backgroundColor: 'rgba(85, 153, 255, 0.248)',
            }}
          />
        ),
      };
      break;
    case 'earthquake':
      data = {
        title: 'EARTHQUAKE',
        link: 'View all',
        icon: (
          <EarthquakeIcon
            className="icon"
            style={{
              color: 'rgb(168, 135, 0)',
              backgroundColor: 'rgba(255, 218, 85, 0.489)',
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  // Calculate the percentage change
  const percentageChange =
    previousCount > 0
      ? ((totalCount - previousCount) / previousCount) * 100
      : totalCount > 0
      ? 100
      : 0;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{totalCount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div
          className={`percentage ${
            percentageChange > 0
              ? 'positive'
              : percentageChange < 0
              ? 'negative'
              : ''
          }`}
        >
          {percentageChange > 0 ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}{' '}
          {/* Display up or down arrow */}
          {percentageChange.toFixed(2)}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};
