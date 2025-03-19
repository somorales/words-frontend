# Lexi

## [See the App!]()

![lexi Logo](./src/assets/images/lexi-logo.png)

## Description

Lexi is an app designed to optimize your language learning in an intuitive and personalized way. It works as your own interactive dictionary.

#### [Client Repo here](https://github.com/somorales/words-frontend)

#### [Server Repo here](https://github.com/somorales/words-backend)

## Technologies, Libraries & APIs used

- **Frontend:** React, HTML5, CSS3, JavaScript
- **Backend:** Node.js
- **Styling:** Tailwind
- **HTTP client:** Axios
- **Deployment:** Netlify (Frontend), Render & Mongo Atlas (Backend)

## Backlog Functionalities

- **Word:** -View all words -Create word -Delete word -View a word -Edit word -Search word.

# Client Structure

## User Stories

- sign up - As a user I want to sign up on the webpage so that I can see the app.
- login - As a user I want to be able to log in on the webpage so that I can get back to my account.
- logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account.
- homepage - As a user I want to be able to access the homepage so that I can see all my words.
- wordpage- As a user can view the details of a word.
- editwordpage- As a user can edit the information of an existing word.
- createwordpage- As a user can create a new word.

## Client Routes

| Path              | Page           | Components     | Permissions | Behavior                                              |
| ----------------- | -------------- | -------------- | ----------- | ----------------------------------------------------- |
| `/`               | Home           | HomePage       | Private     | Displays the homepage with a list of all saved words. |
| `/signup`         | SignUpPage     | SignUpForm     | Public      | Allows users to create an account.                    |
| `/login`          | LoginPage      | LoginForm      | Public      | Allows users to log in to their account.              |
| `/logout`         | -              | LogoutFunction | Private     | Logs out the user and redirects to the login page.    |
| `/words/:id`      | WordPage       | WordDetails    | Private     | Displays the details of a specific word.              |
| `/words/:id/edit` | EditWordPage   | EditWordForm   | Private     | Allows users to edit an existing word.                |
| `/words/create`   | CreateWordPage | CreateWordForm | Private     | Allows users to create a new word.                    |

## Other Components

- **Navbar:** A navigation bar with links to different sections of the app (Home and Profile).
- **Footer:** Link to my website.

## Links

### Project

[Repository Link Client](https://github.com/somorales/words-frontend)

[Repository Link Server](https://github.com/somorales/words-backend)

[Deploy Link]()

### Model Planning

[Model Planning Link](https://www.figma.com/design/WQVDchfxFC2seCF5ZRXZKc/Lexi?node-id=0-1&t=pXIPXMF0FTKgnq4G-1)
