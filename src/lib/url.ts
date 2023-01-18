function pushState(searchParams: URLSearchParams) {
  const newRelativePathQuery =
    window.location.pathname + "?" + searchParams.toString();
  history.pushState(null, "", newRelativePathQuery);
}

export function setId(id: number) {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [k, v] of searchParams.entries()) {
    searchParams.delete(k);
  }
  searchParams.set("id", id.toString());
  pushState(searchParams);
}

export function setPage(page: number) {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [k, v] of searchParams.entries()) {
    searchParams.delete(k);
  }
  searchParams.set("page", page.toString());
  pushState(searchParams);
}

export function setSelectedProduct(i: number) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.append("selected", i.toString());
  pushState(searchParams);
}

export function unsetSelectedProduct() {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete("selected");
  pushState(searchParams);
}
