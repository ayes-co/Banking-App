export default function StatCard({ label, value, note }) {
  return (
    <article style={{ padding: '1rem', borderRadius: '16px', background: '#fff', boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)' }}>
      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{label}</div>
      <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{value}</div>
      {note ? <div style={{ marginTop: '0.35rem', color: '#334155' }}>{note}</div> : null}
    </article>
  )
}

