/* eslint-disable react/no-unescaped-entities */
import "./about_page.css";
import human1 from "../../../assets/human/human1.png";
import human2 from "../../../assets/human/human2.png";
import human3 from "../../../assets/human/human3.png";
import about1 from "../../../assets/about-image/about1.png";

const stats = [
  { icon: "👤", number: "10.5k", label: "Sellers active on our site" },
  { icon: "🛍️", number: "33k", label: "Monthly product sale" },
  { icon: "⭐", number: "45.5k", label: "Customers active in our site" },
  { icon: "📊", number: "25k", label: "Annual gross sale in our site" },
];

const team = [
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: human1,
  },
  {
    name: "Emma Watson",
    position: "Managing Director",
    image: human2,
  },
  {
    name: "Will Smith",
    position: "Product Designer",
    image: human3,
  },
];
function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for precision and elegance, Watch-Store has
            been the premier destination for luxury and high-quality timepieces
            since 2010. Our journey began with a simple mission: to bring
            timeless craftsmanship and modern innovation together in every watch
            we offer. From classic mechanical masterpieces to cutting-edge
            smartwatches, we curate an exclusive collection from the world’s
            most renowned brands. Each timepiece is carefully selected to ensure
            exceptional quality, durability, and style—because we believe a
            watch is more than just an accessory; it’s a statement of
            sophistication and individuality. At Watch-Store, we are committed
            to delivering excellence, not just in our products but also in our
            service. With a seamless online shopping experience, expert customer
            support, and a guarantee of authenticity, we make sure every
            customer finds the perfect watch to match their lifestyle. Join us
            on this journey of time, where every second counts, and elegance
            never fades.
          </p>
        </div>
        <img src={about1} alt="Shopping" className="about-image" />
      </div>
      <div className="stats-section">
        {stats.map((stat, index) => (
          <div key={index} className={"stat-card"}>
            <span className="stat-icon">{stat.icon}</span>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="team-section">
        {team.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-avatar" />
            <h4>{member.name}</h4>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
