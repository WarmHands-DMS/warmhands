import { Link, useNavigate } from 'react-router-dom';
import apiReq from '../../lib/apiReq';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { List } from '../../components/List/List';

export const UserProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiReq.post('/auth/user/logout');
      updateUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await apiReq.get(
          'http://localhost:8800/api/incidents'
        );
        // Filter incidents by userId
        const userIncidents = response.data.filter(
          (incident) => incident.userId === currentUser.id
        );
        setIncidents(userIncidents);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIncidents();
  }, [currentUser.id]);

  return (
    <div className="userProfilePage">
      <div className="container">

        <div className="topic">CSS Vertical Tab</div>

        <div className="content">
            <input type="radio" name="slider" checked id="home" />
            <input type="radio" name="slider" id="blog" />
            <input type="radio" name="slider" id="help" />
            <input type="radio" name="slider" id="code" />
            <input type="radio" name="slider" id="about" />

            <div className="list">
                <label htmlFor="home" className="home">
                    <span>Home</span>
                </label>
                <label htmlFor="blog" className="blog">
                    <span>Blog</span>
                </label>
                <label htmlFor="help" className="help">
                    <span>Help</span>
                </label>
                <label htmlFor="code" className="code">
                    <span>Code</span>
                </label>
                <label htmlFor="about" className="about">
                    <span>About</span>
                </label>
                <div className="slider"></div>
            </div>

            <div className="text-content">
                <div className="home text">
                    <div className="title">Home Content</div>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt eos ex, quaerat dolorum adipisci quisquam? Ut, aut. Corrupti dolorem eos, repellat, totam quas voluptate consequatur illum libero perferendis et assumenda. Sint aperiam a neque eos quis? Saepe, vero obcaecati id cum iste necessitatibus aut dolorum quis ipsa eius dicta minus blanditiis laborum eos pariatur nesciunt minima sequi. Nobis, nostrum minima.</p>
                </div>
                <div className="blog text">
                    <div className="title">Blog Content</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor reprehenderit, delectus enim velit quis modi vel facere maxime amet sit sequi nemo nisi debitis expedita soluta, doloremque ex ullam et quos id similique eius dignissimos odio. Obcaecati ullam mollitia hic illum! Accusantium earum odio dolore, natus consequatur voluptas in! Hic quae distinctio veritatis laboriosam illo dolor voluptates, vero accusantium corporis ab error nemo harum aperiam! Eaque blanditiis voluptas molestiae quam?</p>
                </div>
                <div className="help text">
                    <div className="title">Help</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, laborum? Dolorem voluptates modi porro magni dicta, id minus commodi mollitia saepe unde, iure omnis culpa, praesentium dolorum debitis reiciendis impedit veritatis hic cum reprehenderit assumenda possimus temporibus. Nemo sint cum soluta vitae odit tempore ipsum similique, consectetur quos veritatis voluptatibus.</p>
                </div>
                <div className="code text">
                    <div className="title">Code</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ullam, voluptatem, mollitia amet iure sequi sapiente reprehenderit consectetur a saepe error molestiae vitae pariatur delectus repudiandae ipsa aspernatur eveniet quo maiores dignissimos. Officiis, molestias velit accusamus ipsa consectetur exercitationem voluptatem natus quisquam soluta facilis. Quas, autem harum? Consequuntur blanditiis quasi consequatur, omnis debitis odio ratione excepturi nulla fugit mollitia itaque esse fuga, soluta eos aspernatur? Modi delectus quasi dicta veritatis. Vero, expedita mollitia veritatis magni aperiam maxime ipsum. Ut, debitis.</p>
                </div>
                <div className="about text">
                    <div className="title">About</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, quia repudiandae quisquam nam molestiae non. Itaque repudiandae quam, sed maxime voluptate quos ipsam optio odio ab molestiae facilis numquam repellendus, natus maiores vel soluta accusantium placeat nihil ad cupiditate consequuntur reprehenderit deserunt nam tempora. Voluptates non quia corporis temporibus tempora.</p>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};











      // <div classNameName="details">
      //   <div classNameName="wrapper">
      //     <div classNameName="user-info">
      //       <div classNameName="title">
      //         <h2>User InhtmlFormation</h2>
      //       </div>
      //       <div classNameName="info">
      //         <div classNameName="profileImage">
      //           <img
      //             src={currentUser.avatar || 'no-avatar.png'}
      //             alt="profile-pic"
      //           />
      //         </div>
      //         <div classNameName="details">
      //           <div>
      //             Name:{' '}
      //             <span>{currentUser.fname + ' ' + currentUser.lname}</span>
      //           </div>
      //           <div>
      //             E-mail: <span>{currentUser.email}</span>
      //           </div>
      //         </div>
      //         <div classNameName="btn-sec">
      //           <button
      //             classNameName="update"
      //             onClick={() => navigate('/profile/update')}
      //           >
      //             Update
      //           </button>
      //           <button classNameName="logout" onClick={handleLogout}>
      //             Logout
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // <div classNameName="reports">
      //   <Link classNameName="button" to="/report">
      //     <button>Report New Incident</button>
      //   </Link>
      //   <div classNameName="wrapper">
      //     <div classNameName="title">
      //       <h2>My Reports</h2>
      //       {incidents.length > 2 ? <button>View All</button> : <div></div>}
      //     </div>
      //     <div classNameName="incidents">
      //       {incidents.length > 0 ? (
      //         <List data={incidents} /> // Pass incidents as prop to List component
      //       ) : (
      //         <div classNameName="no-reports">
      //           <img src="/no-reports.svg" alt="No reports yet" />
      //         </div>
      //       )}
      //     </div>
      //   </div>
      // </div>