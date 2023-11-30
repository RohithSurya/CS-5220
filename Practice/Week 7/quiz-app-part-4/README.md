**Assignment**
You are a developer tasked with building a Quiz Application that allows professors to create quizzes with related questions. The application should follow RESTful principles and support the management of Professors, Quizzes, and Questions.

---

### Data Models

-   **Professors:**

    -   `id`: (unique identifier)
    -   `first`: (String)
    -   `last`: (String)
    -   `university`: (String)
    -   `degree`: (String)
    -   `specialties`: (Array of String)

-   **Quizzes:**

    -   `id`: (unique identifier)
    -   `name`: (String)
    -   `instructions`: (String)
    -   `created`: (Date)
    -   `language_type`: (String)
    -   `tags`: (Array of String)
    -   `question_ids`: (Array of references to questions)
    -   `professor_id`: (references to a professor)

-   **Questions:**
    -   `id`: (unique identifier)
    -   `text`: (String)
    -   `points`: (Number)
    -   `type`: (String)
    -   `answers`: (Array of Objects)

---

### Mock JSON Data

Create mock data for the three resources used in the Quiz Application: Professors, Quizzes, and Questions.

-   Create a JSON file representing mock data for each resources
-   Include at least 2 sample entries per resource
-   Ensure that the mock data accurately reflects the structure of each resource as outlined.

### Application Structure

Ensure that the project is well-structured with proper folder and file organization. The project should have an "api" folder. Within the "api" folder, there should be a sub-folder "routes." This "routes" folder should contain all the resource routes where each resource is contained in an individual .js file.

### API Endpoints

**Professors:**

1. Retrieve all professors

    - optional query parameters that allows for filtering professors by specialties

2. Retrieve a professor by ID

    - optional query parameters that allows for retrieving data associated to the professor's own quizzes

3. Add a professor

4. Update a professor

**Quizzes**

1. Retrieve all quizzes

    - optional query parameter that allows for filtering quizzes by `language`

2. Retrieve a quiz by ID.

    - optional query parameter()s that allows for retrieving data associated to questions and/or answers

3. Add a quiz.

    - `created` date should be handled by the server.

    - `question_ids` should be handled by the server and set as an empty array

4. Update a quiz.

    - `created` cannot be modified

5. Delete a quiz

**Questions**

1. Add a new question.

2. Update a question information.

3. Delete a question.

    - handles removing the question from the quiz it was associated to in the question_ids array

**Goals**

-   Proper implementation of the specified API endpoints.
-   Correct handling of path parameters, query parameters and request payloads.
-   Proper association and deletion of related data.
-   Clear and readable code that uses Node.js, Express.js with Express Router.
