## Project Objective:

```
Using this public sample of appliance reviews from Amazon:
https://datarepo.eng.ucsd.edu/mcauley_group/data/amazon_v2/categoryFilesSmall/Appliances_5.json.gz
Write a simple CLI or web app (your choice) that allows you to enter a search keyword and displays the first matching review from the set. One review is displayed at a time and you can execute one of the following commands:
1. Next - display the next matching review
2. Guess Type - using OpenAI, guess the type of product being reviewed in the displayed review (e.g. refrigerator, blender, etc.)
3. Summarize - using OpenAI, summarize the review in 10 words or fewer

Your project should be delivered in a shared Github repo along with instructions on how to run the application locally.
```

## Getting Started

1. Create `.env` in root directory and populate `OPENAI_API_KEY`
2. Install dependencies `npm i`
3. Run development server `npm run dev`
4. Webapp is accessible via [http://localhost:3000](http://localhost:3000)

## Assumptions

- Data Volume
  - The review dataset is assumed to be under 10,000 lines. It is managed client-side due to its modest size. For larger datasets, a more robust solution involving databases, indexing, and a CDN might be necessary.
- User Load
  - The application is designed for minimal concurrent users, hence no implementation of rate limiting for API calls at this stage.
- User Interface
  - It is assumed that users have access to a keyboard and screen. There is currently limited screen reader support and limited ADA compliance.

## Design Decisions

- UI Library - MaterialUI
  - Chosen for its familiarity and standardization in the industry. No specific design guidelines were provided for this project.
- Framework - NextJS
  - Selected for its integrated API capabilities, allowing for server-side calls to manage the OPENAI_API_KEY securely.
- Testing
  - Current version does not include test coverage due to its simplicity and limited user base.
- Client-Side Filtering
  - Implemented for performance efficiency given the manageable size of the review data.

## Improvements

- State management
  - Currently, the application uses direct prop-passing, ideal for its small scale and limited number of components. If the application was bigger, I would consider state management solutions like Context API or Redux to improve component communication.
- Remove duplicate reviews
  - Implement strategies to remove duplicates, potentially using unique identifiers like timestamp and reviewer name, or through preprocessing before database import.
- Keyword Highlighting
  - Enhance user experience by highlighting search terms within the reviews.
- Advanced Search Options
  - Introduce complex search functionalities, including logical operators like AND/OR.
- Optimize OpenAI Queries
  - Add limitations to existing OpenAI query to better formulate response.
- Test coverage
  - Introduce test coverage for critical components to ensure reliability, particularly if scaling for production use.

## Screenshots

![image](https://github.com/iq/optiversal-nextjs-reviews/assets/28940587/1cbb51c2-8f5b-4310-8707-83766889493c)
![image](https://github.com/iq/optiversal-nextjs-reviews/assets/28940587/4b9cca0d-0074-413b-8a60-5784ad5d768f)
