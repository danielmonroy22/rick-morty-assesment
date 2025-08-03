### Rick and Morty Character Explorer

This is a React + TypeScript application that allows users to explore characters from the Rick and Morty universe. It integrates with the public Rick and Morty GraphQL API to fetch and display character data.

### Features
🔍 Search characters by name

🎯 Filter by character status and species

❤️ Mark characters as favorites (stored locally)

📱 Responsive design for desktop and mobile

⚡ Powered by Vite, Apollo Client, and Tailwind CSS

### Tech Stack
Frontend Framework: React

Language: TypeScript

GraphQL Client: Apollo Client

Styling: Tailwind CSS

Bundler: Vite

### API: Rick and Morty GraphQL API

## Installation & Setup
1. Clone the repository
## git clone https://github.com/danielmonroy22/rick-morty-assesment.git
## cd rick-morty-assesment
2. Install dependencies
## npm install
3. Start the development server
## npm run dev
## The app will be available at: http://localhost:5173

📡 How the API Works
This app uses the Rick and Morty GraphQL API, which allows you to:

Fetch characters with filters (by name, status, species)

Get character details including image, location, species, and origin

Example GraphQL query used:

graphql
1. 
- this query is used to retrieve the charcaters from the api in page 1
query {
    characters(page: 1) {
      results {
        id
        name
        species
        image
      }
    }
  }
2. 
- this query is used to get the charcater by the name whe using the search input  
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
3. 
- this query is used to retrieve character data based on the id

  export const GET_CHARACTER_BY_ID = gql`
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
`;


### Development Notes
Vite is used for blazing-fast development and hot module replacement.

Apollo Client handles GraphQL queries and caching.

Tailwind CSS is used for styling and layout.

Favorite characters are stored using localStorage for persistence between sessions.

Comments on characters are also saved per character in local storage.
