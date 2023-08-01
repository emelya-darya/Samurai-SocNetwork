type MessagesListPropsType = {
   userId: number
}
const MessagesList: React.FC<MessagesListPropsType> = ({ userId }) => {
   return (
      <>
         <h1>Mesages list</h1>
         <p>{userId}</p>
      </>
   )
}

export { MessagesList }
