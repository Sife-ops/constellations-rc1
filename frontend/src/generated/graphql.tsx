import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  categories?: Maybe<Array<Category>>;
  description: Scalars['String'];
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type BookmarkCreateOptions = {
  categoryIds?: InputMaybe<Array<Scalars['Int']>>;
  description: Scalars['String'];
  url: Scalars['String'];
};

export type BookmarkUpdateOptions = {
  categoryIds?: InputMaybe<Array<Scalars['Int']>>;
  description?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  bookmarks?: Maybe<Array<Bookmark>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkCreate: Bookmark;
  bookmarkDelete: Scalars['Boolean'];
  bookmarkUpdate: Bookmark;
  categoryCreate: Category;
  categoryDelete: Scalars['Boolean'];
  categoryUpdate: Category;
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  mutAuthTest: Scalars['String'];
  register: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
};


export type MutationBookmarkCreateArgs = {
  options: BookmarkCreateOptions;
};


export type MutationBookmarkDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationBookmarkUpdateArgs = {
  id: Scalars['Int'];
  options: BookmarkUpdateOptions;
};


export type MutationCategoryCreateArgs = {
  name: Scalars['String'];
};


export type MutationCategoryDeleteArgs = {
  id: Scalars['Int'];
};


export type MutationCategoryUpdateArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: Bookmark;
  bookmarks: Array<Bookmark>;
  categories: Array<Category>;
  category: Category;
  hello: Scalars['String'];
  queryAuthTest: Scalars['String'];
  user: User;
  users: Array<User>;
};


export type QueryBookmarkArgs = {
  id: Scalars['Int'];
};


export type QueryCategoryArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  bookmarks?: Maybe<Array<Bookmark>>;
  categories?: Maybe<Array<Category>>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type BookmarkCreateMutationVariables = Exact<{
  options: BookmarkCreateOptions;
}>;


export type BookmarkCreateMutation = { __typename?: 'Mutation', bookmarkCreate: { __typename?: 'Bookmark', id: string, url: string, description: string, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null | undefined } };

export type BookmarkDeleteMutationVariables = Exact<{
  bookmarkDeleteId: Scalars['Int'];
}>;


export type BookmarkDeleteMutation = { __typename?: 'Mutation', bookmarkDelete: boolean };

export type BookmarkUpdateMutationVariables = Exact<{
  options: BookmarkUpdateOptions;
  bookmarkUpdateId: Scalars['Int'];
}>;


export type BookmarkUpdateMutation = { __typename?: 'Mutation', bookmarkUpdate: { __typename?: 'Bookmark', id: string, url: string, description: string, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null | undefined } };

export type CategoryCreateMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CategoryCreateMutation = { __typename?: 'Mutation', categoryCreate: { __typename?: 'Category', id: string, name: string } };

export type CategoryDeleteMutationVariables = Exact<{
  categoryDeleteId: Scalars['Int'];
}>;


export type CategoryDeleteMutation = { __typename?: 'Mutation', categoryDelete: boolean };

export type CategoryUpdateMutationVariables = Exact<{
  name: Scalars['String'];
  categoryUpdateId: Scalars['Int'];
}>;


export type CategoryUpdateMutation = { __typename?: 'Mutation', categoryUpdate: { __typename?: 'Category', id: string, name: string } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type QueryAuthTestQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryAuthTestQuery = { __typename?: 'Query', queryAuthTest: string };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type UserBookmarkCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBookmarkCategoryQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username: string, bookmarks?: Array<{ __typename?: 'Bookmark', id: string, url: string, description: string, categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null | undefined }> | null | undefined } };

export type UserCategoryBookmarkQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCategoryBookmarkQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, username: string, categories?: Array<{ __typename?: 'Category', id: string, name: string, bookmarks?: Array<{ __typename?: 'Bookmark', id: string, url: string, description: string }> | null | undefined }> | null | undefined } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string }> };


export const BookmarkCreateDocument = gql`
    mutation BookmarkCreate($options: BookmarkCreateOptions!) {
  bookmarkCreate(options: $options) {
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
export type BookmarkCreateMutationFn = Apollo.MutationFunction<BookmarkCreateMutation, BookmarkCreateMutationVariables>;

/**
 * __useBookmarkCreateMutation__
 *
 * To run a mutation, you first call `useBookmarkCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkCreateMutation, { data, loading, error }] = useBookmarkCreateMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useBookmarkCreateMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkCreateMutation, BookmarkCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkCreateMutation, BookmarkCreateMutationVariables>(BookmarkCreateDocument, options);
      }
export type BookmarkCreateMutationHookResult = ReturnType<typeof useBookmarkCreateMutation>;
export type BookmarkCreateMutationResult = Apollo.MutationResult<BookmarkCreateMutation>;
export type BookmarkCreateMutationOptions = Apollo.BaseMutationOptions<BookmarkCreateMutation, BookmarkCreateMutationVariables>;
export const BookmarkDeleteDocument = gql`
    mutation BookmarkDelete($bookmarkDeleteId: Int!) {
  bookmarkDelete(id: $bookmarkDeleteId)
}
    `;
export type BookmarkDeleteMutationFn = Apollo.MutationFunction<BookmarkDeleteMutation, BookmarkDeleteMutationVariables>;

/**
 * __useBookmarkDeleteMutation__
 *
 * To run a mutation, you first call `useBookmarkDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkDeleteMutation, { data, loading, error }] = useBookmarkDeleteMutation({
 *   variables: {
 *      bookmarkDeleteId: // value for 'bookmarkDeleteId'
 *   },
 * });
 */
export function useBookmarkDeleteMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkDeleteMutation, BookmarkDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkDeleteMutation, BookmarkDeleteMutationVariables>(BookmarkDeleteDocument, options);
      }
export type BookmarkDeleteMutationHookResult = ReturnType<typeof useBookmarkDeleteMutation>;
export type BookmarkDeleteMutationResult = Apollo.MutationResult<BookmarkDeleteMutation>;
export type BookmarkDeleteMutationOptions = Apollo.BaseMutationOptions<BookmarkDeleteMutation, BookmarkDeleteMutationVariables>;
export const BookmarkUpdateDocument = gql`
    mutation BookmarkUpdate($options: BookmarkUpdateOptions!, $bookmarkUpdateId: Int!) {
  bookmarkUpdate(options: $options, id: $bookmarkUpdateId) {
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
export type BookmarkUpdateMutationFn = Apollo.MutationFunction<BookmarkUpdateMutation, BookmarkUpdateMutationVariables>;

/**
 * __useBookmarkUpdateMutation__
 *
 * To run a mutation, you first call `useBookmarkUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkUpdateMutation, { data, loading, error }] = useBookmarkUpdateMutation({
 *   variables: {
 *      options: // value for 'options'
 *      bookmarkUpdateId: // value for 'bookmarkUpdateId'
 *   },
 * });
 */
export function useBookmarkUpdateMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkUpdateMutation, BookmarkUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkUpdateMutation, BookmarkUpdateMutationVariables>(BookmarkUpdateDocument, options);
      }
export type BookmarkUpdateMutationHookResult = ReturnType<typeof useBookmarkUpdateMutation>;
export type BookmarkUpdateMutationResult = Apollo.MutationResult<BookmarkUpdateMutation>;
export type BookmarkUpdateMutationOptions = Apollo.BaseMutationOptions<BookmarkUpdateMutation, BookmarkUpdateMutationVariables>;
export const CategoryCreateDocument = gql`
    mutation CategoryCreate($name: String!) {
  categoryCreate(name: $name) {
    id
    name
  }
}
    `;
export type CategoryCreateMutationFn = Apollo.MutationFunction<CategoryCreateMutation, CategoryCreateMutationVariables>;

/**
 * __useCategoryCreateMutation__
 *
 * To run a mutation, you first call `useCategoryCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryCreateMutation, { data, loading, error }] = useCategoryCreateMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCategoryCreateMutation(baseOptions?: Apollo.MutationHookOptions<CategoryCreateMutation, CategoryCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryCreateMutation, CategoryCreateMutationVariables>(CategoryCreateDocument, options);
      }
export type CategoryCreateMutationHookResult = ReturnType<typeof useCategoryCreateMutation>;
export type CategoryCreateMutationResult = Apollo.MutationResult<CategoryCreateMutation>;
export type CategoryCreateMutationOptions = Apollo.BaseMutationOptions<CategoryCreateMutation, CategoryCreateMutationVariables>;
export const CategoryDeleteDocument = gql`
    mutation CategoryDelete($categoryDeleteId: Int!) {
  categoryDelete(id: $categoryDeleteId)
}
    `;
export type CategoryDeleteMutationFn = Apollo.MutationFunction<CategoryDeleteMutation, CategoryDeleteMutationVariables>;

/**
 * __useCategoryDeleteMutation__
 *
 * To run a mutation, you first call `useCategoryDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryDeleteMutation, { data, loading, error }] = useCategoryDeleteMutation({
 *   variables: {
 *      categoryDeleteId: // value for 'categoryDeleteId'
 *   },
 * });
 */
export function useCategoryDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CategoryDeleteMutation, CategoryDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryDeleteMutation, CategoryDeleteMutationVariables>(CategoryDeleteDocument, options);
      }
export type CategoryDeleteMutationHookResult = ReturnType<typeof useCategoryDeleteMutation>;
export type CategoryDeleteMutationResult = Apollo.MutationResult<CategoryDeleteMutation>;
export type CategoryDeleteMutationOptions = Apollo.BaseMutationOptions<CategoryDeleteMutation, CategoryDeleteMutationVariables>;
export const CategoryUpdateDocument = gql`
    mutation CategoryUpdate($name: String!, $categoryUpdateId: Int!) {
  categoryUpdate(name: $name, id: $categoryUpdateId) {
    id
    name
  }
}
    `;
export type CategoryUpdateMutationFn = Apollo.MutationFunction<CategoryUpdateMutation, CategoryUpdateMutationVariables>;

/**
 * __useCategoryUpdateMutation__
 *
 * To run a mutation, you first call `useCategoryUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCategoryUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [categoryUpdateMutation, { data, loading, error }] = useCategoryUpdateMutation({
 *   variables: {
 *      name: // value for 'name'
 *      categoryUpdateId: // value for 'categoryUpdateId'
 *   },
 * });
 */
export function useCategoryUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CategoryUpdateMutation, CategoryUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CategoryUpdateMutation, CategoryUpdateMutationVariables>(CategoryUpdateDocument, options);
      }
export type CategoryUpdateMutationHookResult = ReturnType<typeof useCategoryUpdateMutation>;
export type CategoryUpdateMutationResult = Apollo.MutationResult<CategoryUpdateMutation>;
export type CategoryUpdateMutationOptions = Apollo.BaseMutationOptions<CategoryUpdateMutation, CategoryUpdateMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const QueryAuthTestDocument = gql`
    query QueryAuthTest {
  queryAuthTest
}
    `;

/**
 * __useQueryAuthTestQuery__
 *
 * To run a query within a React component, call `useQueryAuthTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryAuthTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryAuthTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryAuthTestQuery(baseOptions?: Apollo.QueryHookOptions<QueryAuthTestQuery, QueryAuthTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryAuthTestQuery, QueryAuthTestQueryVariables>(QueryAuthTestDocument, options);
      }
export function useQueryAuthTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryAuthTestQuery, QueryAuthTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryAuthTestQuery, QueryAuthTestQueryVariables>(QueryAuthTestDocument, options);
        }
export type QueryAuthTestQueryHookResult = ReturnType<typeof useQueryAuthTestQuery>;
export type QueryAuthTestLazyQueryHookResult = ReturnType<typeof useQueryAuthTestLazyQuery>;
export type QueryAuthTestQueryResult = Apollo.QueryResult<QueryAuthTestQuery, QueryAuthTestQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($password: String!, $username: String!) {
  register(password: $password, username: $username)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UserBookmarkCategoryDocument = gql`
    query UserBookmarkCategory {
  user {
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

/**
 * __useUserBookmarkCategoryQuery__
 *
 * To run a query within a React component, call `useUserBookmarkCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBookmarkCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBookmarkCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserBookmarkCategoryQuery(baseOptions?: Apollo.QueryHookOptions<UserBookmarkCategoryQuery, UserBookmarkCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBookmarkCategoryQuery, UserBookmarkCategoryQueryVariables>(UserBookmarkCategoryDocument, options);
      }
export function useUserBookmarkCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBookmarkCategoryQuery, UserBookmarkCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBookmarkCategoryQuery, UserBookmarkCategoryQueryVariables>(UserBookmarkCategoryDocument, options);
        }
export type UserBookmarkCategoryQueryHookResult = ReturnType<typeof useUserBookmarkCategoryQuery>;
export type UserBookmarkCategoryLazyQueryHookResult = ReturnType<typeof useUserBookmarkCategoryLazyQuery>;
export type UserBookmarkCategoryQueryResult = Apollo.QueryResult<UserBookmarkCategoryQuery, UserBookmarkCategoryQueryVariables>;
export const UserCategoryBookmarkDocument = gql`
    query UserCategoryBookmark {
  user {
    id
    username
    categories {
      id
      name
      bookmarks {
        id
        url
        description
      }
    }
  }
}
    `;

/**
 * __useUserCategoryBookmarkQuery__
 *
 * To run a query within a React component, call `useUserCategoryBookmarkQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCategoryBookmarkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCategoryBookmarkQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCategoryBookmarkQuery(baseOptions?: Apollo.QueryHookOptions<UserCategoryBookmarkQuery, UserCategoryBookmarkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserCategoryBookmarkQuery, UserCategoryBookmarkQueryVariables>(UserCategoryBookmarkDocument, options);
      }
export function useUserCategoryBookmarkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserCategoryBookmarkQuery, UserCategoryBookmarkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserCategoryBookmarkQuery, UserCategoryBookmarkQueryVariables>(UserCategoryBookmarkDocument, options);
        }
export type UserCategoryBookmarkQueryHookResult = ReturnType<typeof useUserCategoryBookmarkQuery>;
export type UserCategoryBookmarkLazyQueryHookResult = ReturnType<typeof useUserCategoryBookmarkLazyQuery>;
export type UserCategoryBookmarkQueryResult = Apollo.QueryResult<UserCategoryBookmarkQuery, UserCategoryBookmarkQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;