import Navbar from './Navbar';
import '../styles/About.scss'

const AboutPage = () => {

  
    return (
      <>
        <Navbar />
        <div className='about'>
        <h2 id="inspiration">Inspiration</h2>
        <p>We’re college students, juggling assignments, social lives, and everything in between. We wanted a way to make our daily grind more exciting and productive—so, why not bet on ourselves? Instead of betting on sports teams or stocks, why not place a wager on our own productivity? BetIt was born from the idea that if we could make personal goals fun and competitive, we’d be more motivated to crush them.</p>
        <h2 id="what-it-does">What it does</h2>
        <p>BetIt is an AI-integrated website that helps you achieve your goals and push your limits. By placing wagers, you bet on yourself to complete goals before the deadlines. To win back your wagers, you have to prove to the AI judges what you&#39;ve done before the deadline, and the AI judges will determine if you&#39;ve completed your goal. If you don&#39;t complete it before the deadline, your money will be gone and donated to charity. Compete with your friends and see who can get a higher score!</p>
        <h2 id="how-we-built-it">How we built it</h2>
        <p>For the frontend, we used React, HTML, and SCSS to build the design of the website. It is connected to a Flask backend, which uses Google Firebase as the database and user authentication system and accesses OpenAI’s GPT 4o model to generate AI responses. AWS’s Rekognition was also used for image label generation.</p>
        <h2 id="challenges-we-ran-into">Challenges we ran into</h2>
        <ul>
        <li><p><strong>Linking frontend and backend:</strong> It was challenging linking the React-based frontend and the Flask-based backend as there were many bugs and issues when it came to completing the workflow and database synchronization.</p>
        </li>
        <li><p><strong>Open API Key Issues:</strong> Securing the right API keys and managing access was tricky at first. We wanted to keep everything secure while making sure we could access the powerful tools we needed.</p>
        </li>
        <li><p><strong>Finding the Right AI Models:</strong> Choosing the right AI models to assess goal completion and verifying actions using AWS Rekognition was tough. It took a lot of experimenting to find the right balance between accuracy and ease of use</p>
        </li>
        </ul>
        <h2 id="accomplishments-that-we-re-proud-of">Accomplishments that we&#39;re proud of</h2>
        <ul>
        <li><p><strong>Got OpenAI Working</strong>: We successfully integrated OpenAI for decision-making on whether a user has completed their goal. It’s an innovative way of using AI for productivity, and we’re proud of how it turned out.</p>
        </li>
        <li><p><strong>AWS Rekognition:</strong> We were able to connect AWS Rekognition to validate tasks visually (for example, verifying images of completed tasks or photos of items). It added a whole new level of interactivity to our platform.</p>
        </li>
        <li><p><strong>Almost Shippable Product</strong>: After coding and testing, we have a nearly finished version of BetIt that’s ready for a larger audience. We’re pumped about the user experience and functionality we’ve built.</p>
        </li>
        </ul>
        <h2 id="what-we-learned">What we learned</h2>
        <ul>
        <li><p><strong>Using Open Source APIs:</strong> We gained experience working with powerful open-source APIs like OpenAI and AWS Rekognition, which gave us insight into AI, machine learning, and cloud-based solutions.</p>
        </li>
        <li><p><strong>Building a Scalable Backend:</strong> Building a Flask-based backend that interacts with multiple services (Firebase, OpenAI, AWS) gave us a better understanding of backend architecture and integration.</p>
        </li>
        </ul>
        <h2 id="what-s-next-for-betit">What&#39;s next for BetIt</h2>
        <p>Moving forward, we plan to add new features, including customizable challenges, detailed progress tracking, and rewards for milestone achievements. There are more ways AI can be used in various aspects of workflow, such as estimating task difficulty. We also aim to enhance social features, allowing users to create groups and set shared goals. Additionally, we’re looking into adding more analytics to help users better understand their productivity patterns and refine their goal-setting strategies. These features would help boost the popularity of the webpage amongst young adults. </p>


        </div>
      </>
    );
  }
  
  export default AboutPage;