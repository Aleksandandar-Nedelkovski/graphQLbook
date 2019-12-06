import logger from '../../helpers/logger';

const { db } = this;
const { Post } = db.models;


export default function resolver() {
  const resolvers = {
    RootQuery: {
      posts(root, args, context) {
        return Post.findAll({ order: [["createdAt", "DESC"]] });
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