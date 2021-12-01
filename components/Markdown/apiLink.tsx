export default function apiLink({ apiName, displayName }) {
  return (
    <a
      href={`https://docs.cypress.io/api/commands/${apiName}`}
      target="_blank"
      rel="noreferrer"
    >
      {displayName}
    </a>
  )
}
