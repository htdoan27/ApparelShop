import { useState } from "react";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import "./newUser.css";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const [updateMessage, setUpdateMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const user = { ...inputs };
    try {
      // Assume addUser returns a Promise
      await addUser(user, dispatch);
      setUpdateMessage("Creating successful");
    } catch (error) {

      setUpdateMessage("Creating failed. Please try again.");
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      {updateMessage && <p className="updateMessage">{updateMessage}</p>}
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="john"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Smith"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="john@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 123 456 78"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            name="address"
            type="text"
            placeholder="New York | USA"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
