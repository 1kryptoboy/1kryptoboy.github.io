# My Firebase App

This project is a simple web application that connects to Firebase Firestore and handles user authentication. It allows users to log in and log out, displaying a welcome message upon successful authentication.

## Project Structure

```
my-firebase-app
├── scripts
│   ├── firebaseConfig.js  # Contains Firebase configuration and initialization
│   ├── auth.js             # Handles user authentication
│   └── firestore.js        # Interacts with Firestore database
├── index.html              # Main HTML file for the website
├── styles.css              # Styles for the website
└── README.md               # Documentation for the project
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd my-firebase-app
   ```

2. **Install Firebase**:
   Make sure to include the Firebase SDK in your project. You can use the CDN links in the `index.html` file.

3. **Configure Firebase**:
   Update the `scripts/firebaseConfig.js` file with your Firebase project's configuration details.

4. **Open the application**:
   Open `index.html` in your web browser to view the application.

## Functionality

- **User Authentication**: Users can sign in with their email and password. Upon successful login, a welcome message is displayed.
- **Log Off**: Users can log out, which will hide the welcome message and show the login form again.
- **Firestore Integration**: The application is set up to interact with Firestore, allowing for future data storage and retrieval functionalities.

## Future Enhancements

- Implement Firestore data reading and writing functionalities in `scripts/firestore.js`.
- Add form validation for user inputs.
- Enhance the UI with additional styles and features.