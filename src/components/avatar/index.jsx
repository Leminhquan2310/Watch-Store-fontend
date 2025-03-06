import "./index.css";
import noAvatar from "../../assets/images.png";

// eslint-disable-next-line react/prop-types
function Avatar({ url, circle }) {
  return (
    <div className={`avatar ${circle ? "circle" : ""}`}>
      <img
        // eslint-disable-next-line react/prop-types
        src={url ? url : noAvatar}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
