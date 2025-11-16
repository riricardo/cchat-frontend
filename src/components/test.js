function generateChats() {
  let chats = [];

  for (let i = 1; i <= 100; i++) {
    const isUser = i % 2 === 1; // odd = direct chat

    const user1Id = `userId${i * 2 - 1}`;
    const user2Id = `userId${i * 2}`;

    // Group only if not a 1:1 chat
    const group = isUser
      ? null
      : {
          groupId: `g${i}`,
          groupName: `Group ${i}`,
          groupImageUrl: `https://picsum.photos/200?group=${i}`,
        };

    chats.push({
      id: String(i),
      isUserChat: isUser,

      users: [
        {
          id: user1Id,
          name: `Fulano ${i * 2 - 1}`,
          profileImageUrl: `https://picsum.photos/200?user=${i * 2 - 1}`,
        },
        {
          id: user2Id,
          name: `Fulano ${i * 2}`,
          profileImageUrl: `https://picsum.photos/200?user=${i * 2}`,
        },
      ],

      group,
    });
  }

  return chats;
}

let chats = generateChats();

export default chats;
