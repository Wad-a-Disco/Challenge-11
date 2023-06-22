# Challenge 11 - Note Taker

This repository contains the solution to Challenge 11 - Note Taker, which is a web application that allows users to create and save notes. The application uses an Express.js backend to handle API requests and serve HTML pages.

## Table of Contents

- [Challenge 11 - Note Taker](#challenge-11---note-taker)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Routes](#api-routes)
  - [Technologies](#technologies)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install and run the Note Taker application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory.
3. Install the required dependencies by running the following command: npm install
4. Start the application by running the following command: npm start
5. Open your web browser and visit `http://localhost:3000` to access the application.

## Usage

The Note Taker application allows users to create, view, and delete notes. Here's how to use the application:

1. To create a new note, click on the "Get Started" button on the homepage. You will be redirected to the notes page.
2. On the notes page, you can enter a note title and note text in the respective input fields.
3. Once you've entered the note content, click the save button (a floppy disk icon) to save the note.
4. The saved notes will appear in the left-hand column. You can click on a note to view its content.
5. To delete a note, click the trash can icon next to the note in the left-hand column.

## API Routes

The Note Taker application provides the following API routes:

- `GET /api/notes`: Retrieves all existing notes from the database.
- `POST /api/notes`: Creates a new note and saves it to the database.

## Technologies

The Note Taker application utilizes the following technologies:

- Express.js: A web application framework for Node.js used to handle API routes and serve HTML pages.
- HTML: The markup language used to structure the application's web pages.
- CSS: The style sheet language used to define the application's visual presentation.
- JavaScript: The programming language used for the application's backend logic and frontend interactivity.

## Contributing

Contributions to the Note Taker application are welcome! If you find any bugs or have suggestions for improvements, please submit an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).


