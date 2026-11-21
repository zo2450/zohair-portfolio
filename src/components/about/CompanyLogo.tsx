import Image from "next/image";
import { Icon, Row, Text } from "@once-ui-system/core";
import type { IconName } from "@/resources/icons";

interface CompanyLogoProps {
  name: string;
  src?: string;
  size: number;
  /** Brand icon from the icon library (used when there is no logo image) */
  icon?: IconName;
  /** Short wordmark text (e.g. "IBM") when there is no image or icon */
  text?: string;
  /** Tile background for icon / text logos */
  color?: string;
}

/** Square company logo: image, brand icon, wordmark, or initials (in that order). */
export function CompanyLogo({ name, src, size, icon, text, color }: CompanyLogoProps) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  const branded = Boolean(icon || text) && !src;

  return (
    <Row
      center
      radius={size > 40 ? "l" : "m"}
      border="neutral-alpha-weak"
      background={branded ? undefined : "neutral-alpha-weak"}
      overflow="hidden"
      style={{ width: size, height: size, minWidth: size, background: branded ? color : undefined }}
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
      ) : icon ? (
        <Icon name={icon} size={size > 40 ? "l" : "s"} style={{ color: "#fff" }} />
      ) : text ? (
        <Text
          variant={size > 40 ? "label-strong-m" : "label-strong-xs"}
          style={{ color: "#fff", letterSpacing: "0.04em" }}
        >
          {text}
        </Text>
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
