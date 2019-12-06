import logger from '../../helpers/logger';

const posts = [{
  id: 2,
  text: "Lorem ipsum",
  user: {
    avatar: "/uploads/avatar1.png",
    username: "Test User"
  }
},
{
  id: 1,
  text: "Lorem ipsum",
  user: {
    avatar: "/uploads/avatar2.png",
    username: "Test User 2"
  }
}];

export default function resolver() {
  const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        return posts;
      },
    },

    RootMutation: {
      addPost(root, { post, user }, context) {
        logger.log({ level: 'info', message: 'Post was created' });
        const postObject = {
          ...post,
          user,
          id: posts.length + 1,
        };
        posts.push(postObject);
        return postObject;
      }
    }
  };
  return resolvers;
}
export default resolvers;