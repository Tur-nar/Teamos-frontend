"use client";

import Link from "next/link";

type AuthFooterProps = {
  text: string;
  action: string;
  href: string;
};

export default function AuthFooter({
  text,
  action,
  href,
}: AuthFooterProps) {
  return (
    <div className="mt-8 text-center text-sm text-muted-foreground">
      {text}{" "}

      <Link
        href={href}
        className="font-semibold text-primary transition-colors hover:opacity-80"
      >
        {action}
      </Link>
    </div>
  );
}