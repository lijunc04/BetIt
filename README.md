## Inspiration

We’re college students, juggling assignments, social lives, and everything in between. We wanted a way to make our daily grind more exciting and productive—so, why not bet on ourselves? Instead of betting on sports teams or stocks, why not place a wager on our own productivity? BetIt was born from the idea that if we could make personal goals fun and competitive, we’d be more motivated to crush them.

## What it does

BetIt is an AI-integrated website that helps you achieve your goals and push your limits. By placing wagers, you bet on yourself to complete goals before the deadlines. To win back your wagers, you have to prove to the AI judges what you've done before the deadline, and the AI judges will determine if you've completed your goal. If you don't complete it before the deadline, your money will be gone and donated to charity. Compete with your friends and see who can get a higher score!

## How we built it

For the frontend, we used React, HTML, and SCSS to build the design of the website. It is connected to a Flask backend, which uses Google Firebase as the database and user authentication system and accesses OpenAI’s GPT 4o model to generate AI responses. AWS’s Rekognition was also used for image label generation.

## Challenges we ran into

* **Linking frontend and backend:** It was challenging linking the React-based frontend and the Flask-based backend as there were many bugs and issues when it came to completing the workflow and database synchronization.

* **Open API Key Issues:** Securing the right API keys and managing access was tricky at first. We wanted to keep everything secure while making sure we could access the powerful tools we needed.

* **Finding the Right AI Models:** Choosing the right AI models to assess goal completion and verifying actions using AWS Rekognition was tough. It took a lot of experimenting to find the right balance between accuracy and ease of use

## Accomplishments that we're proud of

* **Got OpenAI Working**: We successfully integrated OpenAI for decision-making on whether a user has completed their goal. It’s an innovative way of using AI for productivity, and we’re proud of how it turned out.

* **AWS Rekognition:** We were able to connect AWS Rekognition to validate tasks visually (for example, verifying images of completed tasks or photos of items). It added a whole new level of interactivity to our platform.

* **Almost Shippable Product**: After coding and testing, we have a nearly finished version of BetIt that’s ready for a larger audience. We’re pumped about the user experience and functionality we’ve built.


## What we learned

* **Using Open Source APIs:** We gained experience working with powerful open-source APIs like OpenAI and AWS Rekognition, which gave us insight into AI, machine learning, and cloud-based solutions.

* **Building a Scalable Backend:** Building a Flask-based backend that interacts with multiple services (Firebase, OpenAI, AWS) gave us a better understanding of backend architecture and integration.

## What's next for BetIt
Moving forward, we plan to add new features, including customizable challenges, detailed progress tracking, and rewards for milestone achievements. There are more ways AI can be used in various aspects of workflow, such as estimating task difficulty. We also aim to enhance social features, allowing users to create groups and set shared goals. Additionally, we’re looking into adding more analytics to help users better understand their productivity patterns and refine their goal-setting strategies. These features would help boost the popularity of the webpage amongst young adults. 
