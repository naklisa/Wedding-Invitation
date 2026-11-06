"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InvitationView from "../../../components/InvitationView";
import { supabase, isSupabaseConfigured } from "../../../lib/supabase";

export default function GuestSlugPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";

  // Immediate clean fallback while database query is in-flight
  const initialFallback = slug
    ? decodeURIComponent(slug)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Tamu Undangan";

  const [guestName, setGuestName] = useState<string>(initialFallback);

  useEffect(() => {
    async function resolveGuest() {
      if (!slug) return;

      const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();

      // 1. Try Supabase lookup by slug or id
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from("guests")
            .select("name")
            .eq("slug", decodedSlug)
            .maybeSingle();

          if (!error && data?.name) {
            setGuestName(data.name);
            return;
          }
        } catch (err) {
          console.warn("Guest slug lookup error:", err);
        }
      }

      // 2. Check LocalStorage fallback (for offline or local testing)
      if (typeof window !== "undefined") {
        try {
          const localGuests = localStorage.getItem("wedding_guests");
          if (localGuests) {
            const list = JSON.parse(localGuests);
            const found = list.find(
              (g: any) => (g.slug || "").toLowerCase() === decodedSlug
            );
            if (found?.name) {
              setGuestName(found.name);
              return;
            }
          }
        } catch (e) {
          // ignore
        }
      }

      // 3. Keep fallback
      setGuestName(initialFallback);
    }

    resolveGuest();
  }, [slug, initialFallback]);

  return <InvitationView initialGuestName={guestName} />;
}
