const resolvers = {
  RootQuery: {
    posts(root, args, context) {
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
      return posts; 
    }, 
  }, 
}; 

export default resolvers;