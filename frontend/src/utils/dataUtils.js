
export const sortPosts = (posts, typeSort) => {
  if (typeSort !== "" || typeSort !== "none") {
    if (typeSort === "vote") {
      return posts.sort((a, b) => b.voteScore-a.voteScore);
    }

    if (typeSort === "-vote") {
      return posts.sort((a, b) => a.voteScore-b.voteScore);
    }

    if (typeSort === "date") {
      return posts.sort((a, b) => b.timestamp-a.timestamp);
    }

    if (typeSort === "-date") {
      return posts.sort((a, b) => a.timestamp-b.timestamp);
    }
  }
  return posts;
}
