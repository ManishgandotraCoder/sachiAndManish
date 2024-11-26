// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import CallIcon from "@mui/icons-material/Call";
import { useState } from "react";
import "./styles.css";

const ContactComponent = () => {
  const [fields, setFields] = useState({
    name: "",
    message: "",
    email: "",
    phone: "",
    subject: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!fields.name.trim()) newErrors.name = "Name is required.";
    if (!fields.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(fields.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!fields.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!fields.subject.trim() || fields.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }
    if (!fields.message.trim()) {
      newErrors.message = "Message is required.";
    }
    return newErrors;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors on change
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const fieldErrors = validateFields();

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const accountSid = "AC65721a3910c03fa33b61c6c5555b93df"; // Replace with your actual SID
      const authToken = "184ea91533099596b4b4c87932cf684f"; // Replace with your actual Auth Token
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

      const data = new URLSearchParams();
      data.append("To", "+918800463103");
      data.append("From", "+12085563949");
      data.append(
        "Body",
        `Hi, my name is ${fields.name} (${fields.phone}, ${fields.email}). I want to connect for ${fields.message}`
      );

      const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        },
      });

      if (response.ok) {
        setSuccessMessage(
          "Message sent successfully. We will reach you within the next 24 hours. Thank you!"
        );
        setFields({
          name: "",
          message: "",
          email: "",
          phone: "",
          subject: "",
        }); // Clear form fields
      } else {
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="white-version rn-contact-area rn-section-gap section-separator responsive-padding"
      id="contact"
    >
      <div className="white-version container">
        <div className="row">
          <div className="col-lg-12">
            <div className="white-version section-title text-center">
              <h2 className="title">Contact With Me</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 white-version contact-about">
            <div className="white-version contact-about-area">
              <div className="thumbnail">
                <img src="/main/ethan.png" alt="contact-img" />
              </div>
              <div className="title-area">
                <h4 style={{ color: "#3c3e41" }}>Manish Gandotra</h4>
                <span>Senior Software Developer</span>
              </div>
              <div className="description">
                <p>
                  I am available for work. Connect with me via email or phone.
                </p>
                <span className="phone">
                  Phone:{" "}
                  <a href="tel:+918800463103" title="Call Manish Gandotra">
                    +91 880 046 3103
                  </a>
                </span>
                <span className="mail">
                  Email:{" "}
                  <a
                    href="mailto:manishgandotra@icloud.com"
                    title="Email Manish Gandotra"
                  >
                    manishgandotra@icloud.com
                  </a>
                </span>
              </div>
              <div className="social-area">
                <div className="name">CONNECT WITH ME</div>
                <div className="social-icons" style={{ marginTop: "10px" }}>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/manish-gandotra-b53413b8/"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn Profile"
                    className="rn-btn"
                  >
                    <i className="feather-linkedin"></i>
                    {/* <LinkedInIcon /> */}
                  </a>
                  <a
                    href="tel:+918800463103"
                    className="rn-btn"
                    aria-label="Call"
                  >
                    <i className="feather-phone"></i>
                    {/* <CallIcon /> */}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="contact-input" data-aos-delay="600">
              <div className="contact-form-wrapper">
                <form onSubmit={sendMessage} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      title="Name is required"
                      required
                    />
                    {errors.name && <p className="error-msg">{errors.name}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && (
                      <p className="error-msg">{errors.phone}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className="error-msg">{errors.email}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      required
                    />
                    {errors.subject && (
                      <p className="error-msg">{errors.subject}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={fields.message}
                      onChange={handleChange}
                      required
                    />
                    {errors.message && (
                      <p className="error-msg">{errors.message}</p>
                    )}
                  </div>

                  <a
                    type="submit"
                    className="rn-btn"
                    style={{ width: "100%", textAlign: "center" }}
                  >
                    SEND MESSAGE
                  </a>
                  {errors.form && <p className="error-msg">{errors.form}</p>}
                  {successMessage && (
                    <p className="success-msg">{successMessage}</p>
                  )}
                </form>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
