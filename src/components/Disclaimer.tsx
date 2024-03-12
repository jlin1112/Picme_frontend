import module from '../components/css/Disclaimer.module.css'

export default function Disclaimer(props:{handleDisclaimerClose:any}) {
  return (
    <div className={module.container}>
      <h1 className={module.h1}>Disclaimer</h1>
      <h2 className={module.heading}>
        Welcome to <i>Picme,</i> a demonstration web application developed for
        portfolio purposes. This application is designed to showcase my
        development skills and is not intended for commercial use or real-world
        application.
      </h2>
      <h2 className={module.h2}>Demo Accounts and User Registration</h2>
      <p>
        <b>
          <i>Picme</i> offers pre-created demo accounts for users to explore the
          application's features.
        </b>{" "}
        These accounts are reset periodically to their default state.{" "}
        <b>
          The use of these demo accounts is strongly recommended to experience
          the application without the need for email submission.
        </b>{" "}
        While users have the option to register for their own accounts,{" "}
        <b>
          I emphasize that using demo accounts is the preferred and safer
          option.
        </b>{" "}
        For those opting to create a personal account, an email verification
        process is implemented for new user registrations to enhance security
        and verify account authenticity.
      </p>
      <h2 className={module.h2}>Email Verification</h2>
      <p>
        To create a personal account, users will need to provide a valid email
        address for the verification process. I recommend the use of an email
        address that does not contain sensitive personal information, as this
        application is intended solely for demonstration purposes.{" "}
        <b>
          However, using demo accounts is strongly recommended to avoid the need
          for email verification.
        </b>{" "}
        By providing an email address for account creation, you consent to
        receiving an email for verification purposes. The use of personal
        accounts and any personal information provided is at your own risk.
      </p>
      <h2 className={module.h2}>Data and Privacy</h2>
      <p>
        I advise against the use of real or sensitive personal data. Any data
        entered into the application, including email addresses, is for
        demonstration purposes only and should be considered non-confidential.
        The application does not store real personal data for any commercial use
        and is not subject to data protection laws applicable to consumer or
        commercial applications.
      </p>
      <h2 className={module.h2}>Cookie</h2>
      <p>
        "Picme" uses a cookie to maintain user sessions for those who register
        and log in. This cookie is essential for keeping users logged in and
        does not track personal information or browsing activities. By using
        this application, you consent to the use of this session cookie for its
        intended purpose.
      </p>
      <h2 className={module.h2}>Usage</h2>
      <p>By using <i>Picme,</i> you acknowledge that this
        application is a demonstration tool and agree to use it responsibly and
        at your own risk. The functionalities and data in "Picme" are provided
        without any warranties or guarantees.</p>
      <h2 className={module.h2}>Content and Conduct</h2>
      <p>
        Users are expected to adhere to our community guidelines, which
        encourage respect and prohibit inappropriate content. However, <i>Picme</i> is
        not responsible for user-generated content and conduct.
      </p>
      <h2 className={module.h2}>Maintenance and Availability</h2>
      <p>
        <i>Picme</i> is a project in development, and as such, it may undergo
        changes, experience downtime, or be discontinued at any time without
        notice. Your understanding and responsible use of <i>Picme</i> are
        appreciated. If you have any feedback or inquiries regarding this
        project, please feel free to contact me.
      </p>


      <button onClick={props.handleDisclaimerClose}>Continue</button>
    </div>
  );
}
