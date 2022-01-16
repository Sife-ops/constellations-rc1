import React from "react";
import { AddBookmarkModal } from "../modal/variant/add-bookmark";
import { BookmarkType } from "../../utility/type";
import { Button } from "react-bootstrap";
import { Category } from "./category";
import { FilterTable } from "./table";
import { Search } from "./search";
import { globalContext } from "../../utility/context";
import { useUserCategoryBookmarkQuery } from "../../generated/graphql";

export const Filter: React.FC = () => {
  const { globalState } = React.useContext(globalContext);

  const { data, loading, error } = useUserCategoryBookmarkQuery({
    variables: { userId: globalState.userId! },
  });

  if (!loading) console.log(data);

  const { dispatchModal } = React.useContext(globalContext);

  const [categories, setCategories] = React.useState(() => {
    if (data) return data.user.categories;
    return [];
  });

  const [search, setSearch] = React.useState<string>("");

  // const handleAddBookmark = () =>
  //   dispatchModal(<AddBookmarkModal categories={categories} />);

  return <div>filter</div>;

  // return (
  //   <div>
  //     <Category
  //       //
  //       categories={categories}
  //       setCategories={setCategories}
  //     />
  //     <Search setSearch={setSearch} />
  //     <div className="d-grid gap-2">
  //       <Button variant="success" onClick={handleAddBookmark}>
  //         Add Bookmark
  //       </Button>
  //     </div>
  //     <FilterTable
  //       bookmarks={bookmarks}
  //       categories={categories}
  //       search={search}
  //     />
  //   </div>
  // );
};
