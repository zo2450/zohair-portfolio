import { Column, Row, IconButton, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { KonamiEgg } from "./KonamiEgg";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth padding="8" horizontal="center">
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        {/* Once UI attribution removed at the owner's request; the owner is obtaining a Once UI Pro
            license, which the template requires for removing the credit (CC BY-NC 4.0 otherwise). */}
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
        </Text>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <KonamiEgg />
      <Row height="80" hide s={{ hide: false }} />
    </Column>
  );
};
