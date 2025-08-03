# Rick and Morty Character Explorer

This is a React + TypeScript application that allows users to explore characters from the Rick and Morty universe. It integrates with the public Rick and Morty GraphQL API to fetch and display character data.

## Features
🔍 Search characters by name

✅ Order the characters in ascending or descending order

🎯 Select the page number to fetch characters from

🎯 Filter by character status and species

🎯 Write comments on any selected character

❤️ Mark characters as favorites (stored locally)

📱 Responsive design for desktop and mobile

⚡ Powered by Vite, Apollo Client, and Tailwind CSS

## Tech Stack
Frontend Framework: React

Language: TypeScript

GraphQL Client: Apollo Client

Styling: Tailwind CSS

Bundler: Vite


## Installation & Setup
1. Clone the repository
- git clone https://github.com/danielmonroy22/rick-morty-assesment.git
- cd rick-morty-assesment
2. Install dependencies
- npm install
3. Start the development server
- npm run dev
### The app will be available at: http://localhost:5173


## API: Rick and Morty GraphQL API

📡 How the API Works
This app uses the Rick and Morty GraphQL API, which allows you to:

Fetch characters with filters (by name, status, species)

Get character details including image, location, species, and origin

Example GraphQL query used:

graphql
 1. This query is used to retrieve the characters from the API on any page selected, the defaul;t is 1: 
``` query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
      }
      info {
        pages
        count
      }
    }
  }
``` 
2. this query is used to get the charcater by the name when using the search input  
```
 query GetCharacter($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        species
        image
      }
    }
  }
 ``` 
3. this query is used to retrieve character data based on the id
```

  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
;

```


## Development Notes
Vite is used for blazing-fast development and hot module replacement.

Apollo Client handles GraphQL queries and caching.

Tailwind CSS is used for styling and layout.

Comments on characters are also saved per character in local storage.
