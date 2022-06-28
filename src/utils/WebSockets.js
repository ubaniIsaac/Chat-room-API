class WebSockets {
    users = [];

    subscribeOtherUser(room, otherUserId) {
        const userSockets = this.users.filter(
            (user) => user.id === otherUserId
        );
        userSockets.map((userInfo) => {
            const socketConn = global.importScripts.sockets.connected(userInfo.socketId);
            if (socketConn) {
                socketConn.join(room);
            }
        })
    }

    connection(client) {
        client.on("disconnect", () => {
            this.users = this.users.filter((user) => user.socketId !== client.id)
        });

        client.on("identify", (userId) => {
            this.users.push({
                socketId: client.id,
                userId: userId,
            });
        });

        client.on("subscribe", (room, otherUserId = "") => {
            this.subscribeOtherUser(room, otherUserId);
            client.join(room);
        });
        client.on("unscubscribe", (room) => {
            client.leave(room);
        });
    }
}




module.exports = new WebSockets() 