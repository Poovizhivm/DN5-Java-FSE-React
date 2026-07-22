import React, { Component } from "react";

class Posts extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data.slice(0, 10)
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Blog Posts</h1>

                {this.state.posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;