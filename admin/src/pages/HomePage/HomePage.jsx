import {Sidebar} from "../../components/Sidebar/Sidebar"
import {Navbar} from "../../components/Navbar/Navbar"
import { Widget } from "../../components/Widget/Widget"
import { Chart } from "../../components/Chart/Chart"
import { FeatureChart } from "../../components/FeatureChart/FeatureChart"

export const HomePage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="home-container">
        <Navbar />
        <div className="widget-section">
          <span className="main-title">Disasters</span>
          <div className="widgets">
            <Widget type="flood" />
            <Widget type="fire" />
            <Widget type="cyclone" />
            <Widget type="landslide" />
            <Widget type="tsunami" />
            <Widget type="earthquake" />
          </div>
        </div>
        <div className="chart-section">
          <span className="main-title">Charts</span>
          <div className="charts">
            <FeatureChart />
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}