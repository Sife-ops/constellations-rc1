export const createBookmark = `
  mutation ($options: BookmarkCreateOptions!, $userId: Int!) {
    createBookmark(options: $options, userId: $userId) {
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

export const userBookmark = `
  query ($id: Int!) {
    user(id: $id) {
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

export const updateBookmark = `
  mutation ($options: BookmarkUpdateOptions!, $id: Int!) {
    updateBookmark(options: $options, id: $id)
  }
`;

export const deleteBookmark = `
  mutation ($id: Int!) {
    deleteBookmark(id: $id)
  }
`;

export const updateCategory = `
  mutation ($name: String!, $id: Int!) {
    updateCategory(name: $name, id: $id)
  }
`;

export const deleteCategory = `
  mutation ($id: Int!) {
    deleteCategory(id: $id)
  }
`;
