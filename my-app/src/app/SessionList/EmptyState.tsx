"use client";

import React from "react";
import Link from "next/link";
import CaduceusIcon from "@/components/CaduceusIcon";
import styles from "./EmptyState.module.css";

// Accept hasClients as a prop
export default function EmptyState({ hasClients }: { hasClients: boolean }) {
  return (
    <div className={styles.container}>
      <CaduceusIcon className={styles.icon} />
      <h2 className={styles.title}>
        {hasClients ? "No session notes yet" : "No clients yet"}
      </h2>
      <p className={styles.message}>
        {hasClients
          ? "When you finish your first recording, your notes will appear here."
          : "Add a client before you can record a session."}
      </p>
      {hasClients ? (
        <Link href="/session/record" className={styles.button}>
          Record a Session
        </Link>
      ) : (
        <Link href="/clients/new" className={styles.button}>
          Add Client
        </Link>
      )}
    </div>
  );
}
