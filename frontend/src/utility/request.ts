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

export const createBookmark = `
  mutation Mutation($options: BookmarkOptions!) {
    createBookmark(options: $options) {
      id
      url
      description
      categories {
        id
        name
      }
    }
  }
`;
