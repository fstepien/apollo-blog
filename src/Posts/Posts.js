import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <ul>
        <Query query={POSTS_QUERY}>
          {({ data, loading }) => {
            if (loading) return "Loading...";
            const { posts } = data;
            return posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    );
  }
}

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      createdAt
      title
      body
    }
  }
`;
