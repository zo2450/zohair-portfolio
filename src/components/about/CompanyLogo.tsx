import Image from "next/image";
import { Row, Text } from "@once-ui-system/core";

interface CompanyLogoProps {
  name: string;
  src?: string;
  size: number;
}

/** Square company logo; falls back to initials when there is no logo file. */
export function CompanyLogo({ name, src, size }: CompanyLogoProps) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <Row
      center
      radius={size > 40 ? "l" : "m"}
      border="neutral-alpha-weak"
      background="neutral-alpha-weak"
      overflow="hidden"
      style={{ width: size, height: size, minWidth: size }}
      aria-hidden
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Text
          variant={size > 40 ? "label-strong-m" : "label-strong-xs"}
          onBackground="brand-strong"
        >
          {initials}
        </Text>
      )}
    </Row>
  );
}
