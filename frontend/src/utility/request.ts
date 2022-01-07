export const TestQuery = `
  query {
    users {
      id
      username
    }
  }
`;

export const userBookmark = `
  query Query($userId: Int!) {
    user(id: $userId) {
      id
      username
      bookmarks {
        id
        url
        description
        categories {
          id
          name
        }
      }
    }
  }
`;
