import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setLoading, setUsers } from "./Reducers/UserReducer";
import { MoonLoader } from "react-spinners";

const ViewUser = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.app);

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const userdata = await axios.get(
        `https://65575a72bd4bcef8b6127cfb.mockapi.io/users/${params.id}`
      );
      dispatch(setUsers(userdata.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row p-5 text-bg-secondary justify-content-center">
          {data.loading ? (
            <MoonLoader
              className=" position-fixed text-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
              color="rgba(4, 163, 255, 1)"
            />
          ) : (
            <div className="container">
              <h1 className=" text-center m-5">User Details</h1>
              <table key={data.users.id} className="table table-striped ">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{data.users.name}</td>
                  </tr>
                  <tr>
                    <th>User Name</th>
                    <td>{data.users.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.users.email}</td>
                  </tr>
                  <tr>
                    <th>Street</th>
                    <td>{data.users.street}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{data.users.city}</td>
                  </tr>
                  <tr>
                    <th>Zipcode</th>
                    <td>{data.users.zipcode}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{data.users.phone}</td>
                  </tr>
                  <tr>
                    <th>Company Name</th>
                    <td>{data.users.companyname}</td>
                  </tr>
                  <tr>
                    <th>Catch Phrase</th>
                    <td>{data.users.catchPhrase}</td>
                  </tr>
                </tbody>
              </table>
              <Link className="btn btn-danger m-3" to={"/"}>
                <i class="fa-solid fa-house p-2"></i>Back to Home
              </Link>
              <Link to="/create-user" className="btn btn-success m-3">
                
                <i class="fa-solid fa-circle-plus p-2"></i>Create User
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
