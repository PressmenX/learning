export default function UserProfile({username = "Guest", status = "offline", bio}) {
  return (
    <div>
      <h2>{username}</h2>
      <h3>Status : {status === "offline" ? "⚫offline" : "🟢online"}</h3>
      <p>{bio}</p>
    </div>
  )
}