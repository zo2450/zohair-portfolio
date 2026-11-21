import { Column, Grid, Text } from "@once-ui-system/core";
import { home } from "@/resources";
import { CountUp } from "./CountUp";

/** Row of headline numbers under the hero. */
export function MetricsStrip() {
  if (!home.metrics?.length) return null;

  return (
    <Grid as="ul" columns="4" s={{ columns: "2" }} fillWidth gap="12" paddingX="l" margin="0">
      {home.metrics.map((metric) => (
        <Column
          as="li"
          key={metric.label}
          gap="4"
          padding="20"
          radius="l"
          border="neutral-alpha-weak"
          background="neutral-alpha-weak"
          style={{ listStyle: "none", backdropFilter: "blur(var(--static-space-4))" }}
        >
          <Text variant="display-strong-xs" onBackground="neutral-strong">
            <CountUp value={metric.value} />
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {metric.label}
          </Text>
        </Column>
      ))}
    </Grid>
  );
}
