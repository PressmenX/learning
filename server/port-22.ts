import net from "node:net"

const server = net.createServer((socket)=> {
  socket.write("Connect to Client From server!")
})

server.listen(22, '127.0.01')