import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_POSTS = gql`{ 
  posts { 
    id
    text
    user {
      avatar
      username
    }
  }
}`;

// const GET_POSTS = gql`
//   query postsFeed($page: Int, $limit: Int) { 
//     postsFeed(page: $page, limit: $limit) { 
//       posts {
//         id
//         text
//         user {
//           avatar
//           username
//         }
//       }
//     }
//   }
// `;

export default class Feed extends Component {
	state = {
		postContent: null
	}
	handlePostContentChange = (event) => {
		this.setState({ postContent: event.target.value })
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const newPost = {
			id: this.state.posts.length + 1,
			text: this.state.postContent,
			user: {
				avatar: "/uploads/avatar3.png",
				username: "Fake User"
			}
		};
		this.setState((prevState) => ({
			posts: [newPost, ...prevState.posts],
			postContent: ""
		}));
	}
	render() {
		const { postContent } = this.state;

		return (
			<div className='container'>
				<div className='postForm'>
					<form onSubmit={this.handleSubmit}>
						<textarea value={postContent} onChange=
							{this.handlePostContentChange} placeholder='Write your custom post!' />
						<input type='submit' value='Submit' />
					</form>
				</div>
				<div className='feed'>
					<Query query={GET_POSTS}>
						{({ loading, error, data }) => {
							if (loading) return 'Loading...';
							if (error) return error.message;
							const { posts } = data;
							return posts.map((post, i) =>
								<div key={post.id} className='post'>
									<div className='header'>
										<img src={post.user.avatar} />
										<h2>{post.user.username}</h2>
									</div>
									<p className='content'>
										{post.text}
									</p>
								</div>
							)
						}}
					</Query>
				</div>
			</div>
		)
	}
}

// export default graphql(GET_POSTS, {
// 	props: ({ data: { loading, error, posts } }) => ({
// 		loading,
// 		posts,
// 		error
// 	})
// })(Feed)