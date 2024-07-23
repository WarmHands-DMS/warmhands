// import {SearchBar} from "../../components/SearchBar/SearchBar";

export const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textPart">
        <div className="wrapper">
          <h1 className="title">
            Welcome to <br />
            Disaster Management System
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            adipisci culpa veniam fuga autem. Delectus adipisci culpa veniam
            fuga autem.
          </p>
          {/* <SearchBar />         */}
          <div className="hero-btn">
            <a href="">Latest Updates</a>
            <a href="">Report Disaster</a>
          </div>
        </div>
      </div>
      <div className="imagePart">img</div>
    </div>
  );
}
