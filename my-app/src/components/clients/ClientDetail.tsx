import Link from "next/link";

export interface Client {
  id: string;
  name: string;
}

export default function ClientDetail({ client }: { client: Client }) {
  return (
    <div>
      <h2>{client.name}</h2>
      <Link href={`/clients/${client.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
} 