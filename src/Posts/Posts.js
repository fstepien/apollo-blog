import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link className="button" to={"/post/new"}>
          New Post
        </Link>
        <ol className="posts-listing">
          <Query query={POSTS_QUERY}>
            {({ data, loading, fetchMore }) => {
              if (loading) return "Loading...";
              const { posts } = data;
              return (
                <React.Fragment>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>
                        <p>{post.title}</p>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      className="button"
                      onClick={() =>
                        fetchMore({
                          variables: {
                            skip: posts.length
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              posts: [...prev.posts, ...fetchMoreResult.posts]
                            });
                          }
                        })
                      }
                    >
                      Load More
                    </button>
                  </li>
                </React.Fragment>
              );
            }}
          </Query>
        </ol>
      </div>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 10, skip: $skip) {
      id
      createdAt
      title
      body
    }
  }
`;
