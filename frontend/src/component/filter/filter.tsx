import React from "react";
import { AddBookmarkModal } from "../modal/variant/add-bookmark";
import { Button } from "react-bootstrap";
import { Category } from "./category";
import { FilterTable } from "./table";
import { LoadingSpinner } from "../loading-spinner";
import { Search } from "./search";
import { globalContext } from "../../utility/context";

import {
  useUserCategoryBookmarkQuery,
  useUserBookmarkCategoryQuery,
} from "../../generated/graphql";

import {
  Bookmark as BookmarkType,
  Category as CategoryType,
} from "../../utility/type";

export const Filter: React.FC = () => {
  const { dispatchModal } = React.useContext(globalContext);

  // category stuff
  const userCategoryBookmark = useUserCategoryBookmarkQuery();
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  React.useEffect(() => {
    const { loading, data } = userCategoryBookmark;
    if (!loading && data?.user.categories) {
      // add 'no category', set selected to false
      setCategories(
        data.user.categories
          .concat({ id: "0", name: "No Category" })
          .map((e) => ({ ...e, selected: false }))
      );
    }
  }, [userCategoryBookmark.loading]);

  // search
  const [search, setSearch] = React.useState<string>("");

  // bookmark stuff
  const userBookmarkCategory = useUserBookmarkCategoryQuery();
  const [bookmarks, setBookmarks] = React.useState<BookmarkType[]>([]);
  React.useEffect(() => {
    const { loading, data } = userBookmarkCategory;
    if (!loading && data?.user.bookmarks) {
      setBookmarks(
        data.user.bookmarks.map((e) => {
          if (!e.categories || e.categories.length < 1) {
            return { ...e, categories: [{ id: "0", name: "No Category" }] };
          }
          return e;
        })
      );
    }
  }, [userBookmarkCategory.loading]);

  const handleAddBookmark = () =>
    dispatchModal(<AddBookmarkModal categories={categories} />);

  return (
    <div>
      {userCategoryBookmark.loading ? (
        <LoadingSpinner />
      ) : (
        <Category categories={categories} setCategories={setCategories} />
      )}

      {userBookmarkCategory.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Search setSearch={setSearch} />
          <div className="d-grid gap-2">
            <Button variant="success" onClick={handleAddBookmark}>
              Add Bookmark
            </Button>
          </div>

          <FilterTable
            bookmarks={bookmarks}
            categories={categories}
            search={search}
          />
        </>
      )}
    </div>
  );
};
