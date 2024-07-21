# WarmHands - Disaster Management System

![WarmHands_logo](frontend/src/assets/warmhands-logo-full.png)

This is a Disaster Management System developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). This system allows users to report incidents related to natural disasters and notifies users in the affected area after admin verification.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Development Server](#running-the-development-server)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Users can report incidents with details and photos.
- Admin verification of reported incidents.
- Email notifications to users in the affected area after admin confirmation.
- Responsive and user-friendly interface built with React.js.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/WarmHands-DMS/warmhands.git
   cd warmhands
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   cd..
   cd backend
   npm install
   cd ..
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

## Running the Development Server

Running the Frontend:

```bash
npm start
```

Running the backend server:

```bash
npm run dev
```

## Usage

1. Open your browser and go to `http://localhost:5173`.
2. Register or log in to the system.
3. Report an incident by filling out the incident report form.
4. Admin will verify the report.
5. Verified incidents will trigger email notifications to users in the affected area.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
